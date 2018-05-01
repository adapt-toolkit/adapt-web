const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const mongoose = require('mongoose');
const compression = require('compression');

const ImageController = require('./src/api/controllers/ImageController');
const ReserveController = require('./src/api/controllers/ReserveController');
const CategoryController = require('./src/api/controllers/CategoryController');
const DownloadController = require('./src/api/controllers/DownloadController');

const config = require('./webpack.config.js');

if ( process.env.NODE_ENV === 'development' ) {
    const compiler = webpack(config);

    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath
    }));

    app.use(webpackHotMiddleware(compiler));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(compression());
app.use(express.static('./dist'));
app.use('/', express.static(process.cwd() + '/static/'));
app.set('view engine', 'ejs');

// app.post('/api/add-image', ImageController.addImage); // Insecure
// app.post('/api/add-category', CategoryController.addCategory);

// app.get('/api/all-reserves', ReserveController.showAllReserves);
app.post('/api/show-images', ImageController.showImages);
app.get('/api/show-categories', CategoryController.showCategories);
app.post('/api/create-reserve', ReserveController.addReserve);
app.post('/api/confirm-reserve', ReserveController.confirmReserve);
app.post('/api/add-download-record', DownloadController.addDownloadRecord);

app.get('/*', (req, res) => {
    res.render('index', {
        protocol: process.env.PROTOCOL,
        host: process.env.HOST,
        port: process.env.PORT
    });
});

app.listen(process.env.PORT, function () {
    console.log('App listening on port '+process.env.PORT)
});