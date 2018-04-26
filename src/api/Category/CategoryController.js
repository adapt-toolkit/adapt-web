const Category = require('./CategoryModel');

module.exports = {
    addCategory: (req, res) => {
        const category = req.body;

        Category.create({
            category_name: category.category_name,
            title: category.title,
            index: category.index,
            description: category.description
        }, (err, createdCategory) => {
            if ( err ) {
                console.log('ERR');
                console.log(err);
                res.status(500).send();
            }

            if ( createdCategory ) {
                res.status(200).send(createdCategory);
            }
        });
    },

    showCategories: (req, res) => {
        Category
            .find({})
            .populate({
                path: 'reserves',
                match: {confirmed: true}
            })
            .lean()
            .exec((err, categories) => {
                if ( err ) {
                    console.log('ERR');
                    console.log(err);
                    res.status(500).send();
                }

                if ( categories ) {
                    res.status(200).send(categories);
                }
            })
    }
}