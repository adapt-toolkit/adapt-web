const Sequelize = require('sequelize');
const { reserve } = require('../models/index');

module.exports = {
  addReserve: (req, res) => {
    const reserveBody = req.body;

    reserve.findAll({
      where: {
        collectible_id: reserveBody.collectible_id,
        email: reserveBody.email,
        confirmed: true
      }
    }).then(reserveInstance => {
      const reservesPlain = JSON.parse(JSON.stringify(reserveInstance));

      if (reservesPlain.length === 0) {
        reserve.count({
          where: {
            collectible_id: reserveBody.collectible_id,
            confirmed: false
          }
        }).then(reserveCount => {
          if (reserveBody.reserve_total > reserveCount) {
            reserve.create({
              collectible_id: reserveBody.collectible_id,
              email: reserveBody.email,
              eth_address: reserveBody.eth_address,
              confirmed: false,
            })
            .then(createdReserveInstance => {
              if (createdReserveInstance) {
                const plainReserve = createdReserveInstance.get({
                  plain: true
                });
                res.status(200).send(plainReserve);
              }
            })
            .catch(err => {
              console.log('ERR');
              console.log(err);
              res.status(500).send();
            })
          } else {
            res.status(423).send();
          }
        });
      } else {
        res.status(422).send();
      }
    })
    .catch(err => {
      console.log('ERR!');
      console.log(err);
      res.status(500).send();
    })
  }
}