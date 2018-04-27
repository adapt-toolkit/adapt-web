const Download = require('./Download');

module.exports = {
    addDownloadRecord: (req, res) => {
        const userAgent = req.headers['user-agent'];
        const ip = req.connection.remoteAddress;

        Download.create({
            userAgent: userAgent,
            ip: ip
        }, (err, createdDownload) => {
            if ( err ) {
                console.log('ERR:');
                console.log(err);
            }

            if ( createdDownload ) {
                console.log('RECORD CREATED!');
                console.log(createdDownload);
                res.status(200).send();
            }
        })
    }
}