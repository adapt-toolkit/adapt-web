const Sequelize = require('sequelize');
const {image, reserve} = require('../models/index');

image.hasMany(reserve, {foreignKey: 'image_id', sourceKey: 'id'});

module.exports = {
    addImage: (req, res) => {
        const imageBody = req.body;

        const fileName = imageBody.name.split(".");

        image.create({
            name: fileName[0], //filename or hash
            description: imageBody.description,
            eth: imageBody.eth,
            amount: imageBody.amount,
            ext: fileName[1] //extension
        })
            .then(createdImageInstance => {
                console.log('CREATED IMAGE INSTANCE!');
                console.log(createdImageInstance);
                console.log(createdImageInstance.get({plain: true}));
                res.status(200).send(createdImageInstance.get({plain: true}));
            })
            .catch(err => {
                console.log('ERR');
                console.log(err);
                res.status(500).send();
            })
    },

    showImages: (req, res) => {
        image.findAll({
            // Need to test out inner count
            // attributes: {
            //     include: [[Sequelize.fn("COUNT", Sequelize.col("reserve.id")), "reserveCount"]]
            // },
            include: [{
                model: reserve,
                attributes: ['id']
            }]
        })
            .then(imageInstances => {
                const imagesPlain = JSON.parse(JSON.stringify(imageInstances));

                for ( let i = 0; i < imagesPlain.length; i++ ) {
                    if ( imagesPlain[i].reserves ) {
                        imagesPlain[i].currentReserves = imagesPlain[i].reserves.length;
                        delete imagesPlain[i].reserves;
                    }
                }
                res.status(200).send(imagesPlain);
            })
            .catch(err => {
                console.log('ERR!');
                console.log(err);
                res.status(500).send();
            })
    }
}