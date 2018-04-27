const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const mongoose = require('mongoose');
const compression = require('compression');

const ImageController = require('./src/api/Image/ImageController');
const ReserveController = require('./src/api/Reserve/ReserveController');
const CategoryController = require('./src/api/Category/CategoryController');

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

mongoose.connect('mongodb://localhost:27017/adapt');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Successfully connected to MongoDB');
});

// app.post('/api/add-image', ImageController.addImage); // Insecure
// app.post('/api/add-category', CategoryController.addCategory);

// app.get('/api/all-reserves', ReserveController.showAllReserves);
app.post('/api/show-images', ImageController.showImages);
app.get('/api/show-categories', CategoryController.showCategories);
app.post('/api/create-reserve', ReserveController.addReserve);
app.post('/api/confirm-reserve', ReserveController.confirmReserve);

app.get('/*', (req, res) => {
    res.render('index');
});

app.listen(process.env.PORT, function () {
    console.log('App listening on port '+process.env.PORT)
});