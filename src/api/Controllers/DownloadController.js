const {download} = require('../models/index');

module.exports = {
    addDownloadRecord: (req, res) => {
        const userAgent = req.headers['user-agent'];
        const ip = req.connection.remoteAddress;

        download.create({
            userAgent: userAgent,
            ip: ip
        }).then(createdDownloadInstance => {
            console.log('CREATED DOWNLOAD INSTANCE!');
            console.log(createdDownloadInstance);
            console.log(JSON.parse(JSON.stringify(createdDownloadInstance)));

            if ( createdDownloadInstance ) {
                res.status(200).send();
            }
        })
            .catch(err => {
                console.log('ERR:');
                console.log(err);
            })
    }
}