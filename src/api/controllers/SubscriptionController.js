const Sequelize = require('sequelize');
const { subscription } = require('../models/index');

module.exports = {
  addSubscription: (req, res) => {
    const subscriptionBody = req.body;

    subscription.findAll({
      where: {
        email: subscriptionBody.email
      }
    }).then(subscriptionInstance => {
      const subscriptionsPlain = JSON.parse(JSON.stringify(subscriptionInstance));

      if (subscriptionsPlain.length === 0) {
        subscription.create({
          email: subscriptionBody.email,
          confirmed: false,
        })
        .then(createdSubscriptionInstance => {
          if (createdSubscriptionInstance) {
            const plainSubscription = createdSubscriptionInstance.get({
              plain: true
            });
            res.status(200).send(plainSubscription);
          }
        })
        .catch(err => {
          console.log('ERR');
          console.log(err);
          res.status(500).send();
        })
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