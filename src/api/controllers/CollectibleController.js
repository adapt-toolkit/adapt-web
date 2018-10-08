const Sequelize = require('sequelize');
const {collectible, reserve} = require('../models/index');
const callUniqxApi = require('../utils/callUniqxApi');
const getFileName = require('../utils/getFileName');

collectible.hasMany(reserve, {foreignKey: 'collectible_id', sourceKey: 'id'});

module.exports = {
  showCollectibles: (req, res) => {
    const { category_id } = req.query;

        // CAUTION: category_id SQL injection vulnerability?
        // Check Sequelize
        collectible.findAll({
            where: {
                category_id: category_id,
            },
            order: Sequelize.col('sort_order'),
            // Need to test out inner count
            // attributes: {
            //     include: [[Sequelize.fn("COUNT", Sequelize.col("reserve.id")), "reserveCount"]]
            // },
            include: [{
                model: reserve,
                attributes: ['id']
            }]
        })
            .then(collectibleInstances => {
                let collectiblesPlain = JSON.parse(JSON.stringify(collectibleInstances));
                const requests = collectiblesPlain.map((item, index) => {

                    return item.json_file ? callUniqxApi('/orders/by_market', {
                        uri: getFileName(item.json_file),
                        status: 'LISTED',
                        skip: 0,
                        limit: 1
                    }).then(([data]) => data)
                        .catch(e => {
                        console.log('error: ', e);
                        return null;
                    }) : Promise.resolve(null);
                });

                return Promise.all([
                    // callUniqxApi('/orders/by_market'),
                    Promise.all(requests),
                    callUniqxApi('/orders/count'),
                ]).then(([dataMarket, dataCount]) => {
                    dataMarket = dataMarket.filter(item => !!item);

                    collectiblesPlain = collectiblesPlain.map((item, index) => {
                        if (item.reserves) {
                            delete item.reserves;
                        }

                        const uri = item.json_file && getFileName(item.json_file);
                        const count = dataCount.find(item => item.uri === uri);
                        const record = dataMarket.find(item => item.token.uri === uri);

                        if (!count || !record) {
                            item.uniqxSync = false;
                            return item;
                        }

                        item.uniqxSync = true;
                        item.currentReserves = count.RESERVED || 0;
                        item.amount = count.TOTAL || 0;
                        item.recordId = record.token.id;

                        return item;
                    });

                    res.status(200).send(collectiblesPlain);
                });
            })
            .catch(err => {
                console.log('ERR!');
                console.log(err);
                res.status(500).send();
            });
    }
};