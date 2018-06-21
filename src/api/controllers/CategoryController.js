const { category } = require('../models/index');

module.exports = {
    showCategories: (req, res) => {
        category
            .findAll({})
            .then(categoryInstances => {
                const categoriesPlain = JSON.parse(JSON.stringify(categoryInstances));

                res.status(200).send(categoriesPlain);
            })
            .catch(err => {
                console.log('ERR!');
                console.log(err);
            })
    }
}