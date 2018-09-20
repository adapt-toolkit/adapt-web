const Sequelize = require('sequelize');
const superagent = require('superagent');
const {collectible, reserve} = require('../models/index');

collectible.hasMany(reserve, {foreignKey: 'collectible_id', sourceKey: 'id'});

const query = {
    market: 'CUSTOM_ADAPT',
    status: 'LISTED'
};

const url = `${process.env.UNIQX_API_PREFIX}/orders`;
const callApi = (url, query) => superagent.get(url)
    .query(query)
    .then((resp) => resp.statusCode !== 200 ? Promise.reject(resp.statusCode) : resp.body);

module.exports = {
    showCollectibles: (req, res) => {
        const {category_id} = req.query;

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

                return Promise.all([
                    callApi(`${url}/bymarket`, query),
                    callApi(`${url}/count`, {market: 'CUSTOM_ADAPT'})
                ]).then(([dataMarket, dataCount]) => {
                    collectiblesPlain = collectiblesPlain.map((item) => {
                        if (item.reserves) {
                            item.currentReserves = item.reserves.length;
                            delete item.reserves;
                        }

                        if (!item.json_file) {
                            return item;
                        }

                        const hash = item.json_file.substring(0, item.json_file.indexOf('.'));
                        const count = dataCount.find(item => item.uri === hash);
                        const record = dataMarket.find(item => item.token.uri === hash);

                        if (!count || !record) {
                            return item;
                        }

                        item.currentReserves = count.LISTED;
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