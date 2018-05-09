const nodemailer = require('nodemailer');

const { reserve } = require('../models/index');

const sendMail = (id, email) => {
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
            user: process.env.SMTP_LOGIN,
            pass: process.env.SMTP_PASSWORD
        }
    });

    let mailOptions = {
        from: '"ADAPT Support" <adapt@adaptk.it>',
        to: email,
        subject: 'Confirm image test',
        html: '<b>Hello, click on the link to confirm your email address </b>' +
        '<a href="' + process.env.PROTOCOL + '://' + process.env.HOST + ':' + process.env.PORT +'/confirm/' + id + '">Link</a>'
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
        const reserveBody = req.body;

        reserve.findAll({ where: {
                collectible_id: reserveBody.collectible_id,
                email: reserveBody.email,
                confirmed: true
            }
        }).then( reserveInstance => {
            const reservesPlain = JSON.parse(JSON.stringify(reserveInstance));

            if ( reservesPlain.length === 0 ) {
                reserve.create({
                    collectible_id: reserveBody.collectible_id,
                    email: reserveBody.email,
                    confirmed: false,
                })
                    .then((createdReserveInstance) => {
                        if ( createdReserveInstance ) {
                            const plainReserve = createdReserveInstance.get({
                                plain: true
                            });
                            sendMail(plainReserve, reserveBody.email);
                            res.status(200).send(plainReserve);
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
            })
    },

    confirmReserve: (req, res) => {
        const { id } = req.body;

        reserve.findOne({id})
            .then(reserveInstance => {

                reserveInstance.update({
                    confirmed: true
                })
                    .then(() => {
                        res.status(200).send();
                    })
                    .catch(err => {
                        console.log('ERR');
                        console.log(err);
                        res.status(500).send();
                    })
            })
            .catch(err => {
                console.log('ERR');
                console.log(err);
                res.status(500).send();
            })
    }
}