const nodemailer = require('nodemailer');

const Reserve = require('./ReserveModel');
const Image = require('../Image/ImageModel');

const sendMail = (id, email) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: '',
            pass: ''
        }
    });

    let mailOptions = {
        from: '"ADAPT Support" <adapt@support.com>',
        to: email,
        subject: 'Confirm image test',
        html: '<b>Hello, click on the link to confirm your email address </b> <a href="http://localhost:3000/confirm/' + id + '">Link</a>'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
}

module.exports = {
    addReserve: (req, res) => {
        const reserve = req.body;

        Reserve.find({
            email: reserve.email,
            image: reserve.image,
            confirmed: true
        }, (err, foundReserve) => {

            if ( foundReserve.length === 0 ) {
                Reserve.create({
                    email: reserve.email,
                    image: reserve.image,
                    confirmed: false
                }, (err, createdReserve) => {
                    if ( err ) {
                        console.log('ERR');
                        console.log(err);
                        res.status(500).send();
                    }

                    if ( createdReserve ) {
                        Image.findByIdAndUpdate(reserve.image, {
                                $push: {'reserves': createdReserve._id}
                            },
                            { "new": true, "upsert": true },
                            (err, updatedImage) => {
                                if ( err ) {
                                    console.log('ERR');
                                    console.log(err);
                                    res.status(500).send();
                                }

                                if (updatedImage) {
                                    sendMail(createdReserve._id, reserve.email);
                                    res.status(200).send(createdReserve);
                                }
                            })
                    }
                })
            } else {
                res.status(422).send();
            }
        });
    },

    confirmReserve: (req, res) => {
        const { id } = req.body;

        Reserve.findOneAndUpdate({_id: id}, {confirmed: true}, function(err, updatedReserve) {
            if ( err ) {
                console.log('ERR');
                console.log(err);
                res.status(500).send();
            }

            if ( !err ) {
                res.status(200).send();
            }
        })
    },

    showAllReserves: (req, res) => {
        Reserve.find({}, (err, reserves) => {
            res.status(200).send();
        })
    }
}