const Image = require('./ImageModel');

module.exports = {
    addImage: (req, res) => {
        const image = req.body;

        console.log('ADD IMAGE!');
        console.log(image);

        Image.create({
            id: image.name,
            description: image.description,
            eth: image.eth,
            amount: image.amount
        }, (err, createdImage) => {
            if ( err ) {
                console.log('ERR');
                console.log(err);
                res.status(500).send();
            }

            if ( createdImage ) {
                console.log('CREATED IMAGE!');
                console.log(createdImage);

                res.status(200).send(createdImage);
            }
        });
    },

    showImages: (req, res) => {
        Image
            .find({})
            .populate({
                path: 'reserves',
                match: {confirmed: true}
            })
            .lean()
            .exec((err, images) => {
                if ( err ) {
                    console.log('ERR');
                    console.log(err);
                    res.status(500).send();
                }

                if ( images ) {
                    console.log('IMAGES!!');
                    console.log(images);

                    for ( let i = 0; i < images.length; i++ ) {
                        if ( images[i].reserves ) {
                            images[i].currentReserves = images[i].reserves.length;
                            delete images[i].reserves;
                        }
                    }

                    res.status(200).send(images);
                }
            })
    }
}