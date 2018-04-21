const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

const ImageController = require('./src/api/Image/ImageController');
const ReserveController = require('./src/api/Reserve/ReserveController');

const config = require('./webpack.config.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use('/', express.static(process.cwd() + '/'));
app.set('view engine', 'ejs');

// const url = 'mongodb://localhost:27017';
mongoose.connect('mongodb://localhost:27017/adapt');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Successfully connected to MongoDB');
});

// const dbName = 'myproject';
// let db;

// Use connect method to connect to the server
// MongoClient.connect(url, function(err, client) {
//     console.log("Connected successfully to MongoDB server");
//     db = client.db(dbName);
// });

// const insertTodo = (req, res, db) => {
//     db.collection('todo').insertOne({
//         name: 'some-todo'
//     }, (err, response) => {
//         if ( err ) {
//             console.log('ERROR:');
//             console.log(err);
//             res.status(500).send();
//         }
//
//         if ( response ) {
//             res.status(200).send();
//         }
//     });
// };
//
// const getTodos = (req, res, db) => {
//     db.collection('todo').find().toArray((err, todos) => {
//         if (err) {
//             console.log('ERROR!');
//             console.log(err);
//             res.status(500).send();
//         }
//
//         if ( todos ) {
//             console.log('TODOS:');
//             console.log(todos);
//             res.status(200).send(todos);
//         }
//     })
// }

app.post('/api/add-image', ImageController.addImage);
app.get('/api/show-images', ImageController.showImages);
app.post('/api/create-reserve', ReserveController.addReserve);
app.post('/api/confirm-reserve', ReserveController.confirmReserve);
app.get('/api/all-reserves', ReserveController.showAllReserves);

app.get('/*', (req, res) => {
    res.render('index');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});