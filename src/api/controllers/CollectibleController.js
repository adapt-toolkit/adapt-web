const Sequelize = require('sequelize');
const {collectible, reserve} = require('../models/index');

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
        const collectiblesPlain = JSON.parse(JSON.stringify(collectibleInstances));

        for ( let i = 0; i < collectiblesPlain.length; i++ ) {
            if ( collectiblesPlain[i].reserves ) {
                collectiblesPlain[i].currentReserves = collectiblesPlain[i].reserves.length;
                delete collectiblesPlain[i].reserves;
            }
        }
        res.status(200).send(collectiblesPlain);
    })
    .catch(err => {
        console.log('ERR!');
        console.log(err);
        res.status(500).send();
    })
  }
}