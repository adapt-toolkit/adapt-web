const { category } = require('../models/index');

module.exports = {
    addCategory: (req, res) => {
        const categoryBody = req.body;

        category.create({
            category_name: categoryBody.category_name,
            title: categoryBody.title,
            description: categoryBody.description
        })
            .then( createdCategoryInstance => {
                if ( createdCategoryInstance ) {
                    res.status(200).send(JSON.parse(JSON.stringify(createdCategoryInstance)));
                }
            })
            .catch(err => {
                if ( err ) {
                    console.log('ERR');
                    console.log(err);
                    res.status(500).send();
                }
            })
    },

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