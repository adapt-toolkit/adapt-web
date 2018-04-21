const nodemailer = require('nodemailer');

const Reserve = require('./ReserveModel');
const Image = require('../Image/ImageModel');

const sendMail = (id, email) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'jmimbubu@gmail.com', // generated ethereal user
            pass: 'telepuz23navus' // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"ADAPT Support" <foo@example.com>', // sender address
        to: email, // list of receivers
        subject: 'Confirm image test', // Subject line
        html: '<b>Hello, click on the link to confirm your email address </b> <a href="http://localhost:3000/confirm/' + id + '">Link</a>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
}

module.exports = {
    addReserve: (req, res) => {
        const reserve = req.body;

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
                console.log('UPDATED RESERVE!');
                console.log(updatedReserve);
                res.status(200).send();
            }
        })
    },

    showAllReserves: (req, res) => {
        Reserve.find({}, (err, reserves) => {
            console.log('RESERVES!');
            console.log(reserves);
            res.status(200).send();
        })
    }
}