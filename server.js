const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const mongoose = require('mongoose');

const ImageController = require('./src/api/Image/ImageController');
const ReserveController = require('./src/api/Reserve/ReserveController');

const config = require('./webpack.config.js');
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use('/', express.static(process.cwd() + '/'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/adapt');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Successfully connected to MongoDB');
});

app.post('/api/add-image', ImageController.addImage);
app.get('/api/show-images', ImageController.showImages);
app.post('/api/create-reserve', ReserveController.addReserve);
app.post('/api/confirm-reserve', ReserveController.confirmReserve);
app.get('/api/all-reserves', ReserveController.showAllReserves);

app.get('/*', (req, res) => {
    res.render('index');
});

app.listen(process.env.PORT, function () {
    console.log('Example app listening on port 3000!')
});