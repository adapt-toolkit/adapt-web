const Sequelize = require('sequelize');
const {collectible, reserve} = require('../models/index');
const callUniqxApi = require('../utils/callUniqxApi');
const getFileName = require('../utils/getFileName');

collectible.hasMany(reserve, {foreignKey: 'collectible_id', sourceKey: 'id'});

const hashs = [
    "bec5fd0abbac1d8bcea4068e0dd79c78ca8f2f557b0ea05d7001e9ed7dc6a2bd",
    "6b369abe01429feead60a1bff18f78f967256c9b1985eeccbbffc463802947d7",
    "af4068c7f6b0f27206983e0a0ac652c9fea1511cda7b6e672e28b097a4714407",
    "b5385a456e27c0da3be9629190ab7844f374a0abe6cebfa0198b769b9077ac9d",
    "23c2f9b6f13d44d0c9b15b4303644b71c0d65c2ec90898c66d446a70687ede1f"
];

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
                const requests = collectiblesPlain.map((item, index) => {
                    item.json_file = hashs[index % 4]; // todo: remove (for test)

                    return item.json_file ? callUniqxApi('/orders/bymarket', {
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

                console.time('timing request');
                return Promise.all([
                    // callUniqxApi('/orders/bymarket'),
                    Promise.all(requests),
                    callUniqxApi('/orders/count'),
                ]).then(([dataMarket, dataCount]) => {
                    dataMarket = dataMarket.filter(item => !!item);
                    console.timeEnd('timing request');

                    collectiblesPlain = collectiblesPlain.map((item, index) => {
                        if (item.reserves) {
                            delete item.reserves;
                        }

                        item.json_file = hashs[index % 4]; // todo: remove (for test)
                        const uri = getFileName(item.json_file);
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