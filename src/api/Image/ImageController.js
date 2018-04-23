const Image = require('./ImageModel');

module.exports = {
    addImage: (req, res) => {
        const image = req.body;

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