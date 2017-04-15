const express = require("express");
const app = express();

const fs = require('fs');

const path = require('path');

const bodyParser = require('body-parser');

const url = require('url');

const shopify = require('shopify-buy');

const client = shopify.buildClient({
	accessToken: '30197388c16741334138de5dd1de3f1a',
	domain: 'my-leisure.myshopify.com',
	appId: '6'
});

const nodemailer = require('nodemailer');

///// SET BODY PARSER CONFIG
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//// SET VIEW ENGINE PUG/JADE
app.set('view engine', 'pug');

//// Allows use of /snippets and absolute paths in jade includes
app.locals.basedir = path.join(__dirname, 'views');


/////// MONGODB AND MONGOOSE THINGS
var MongoClient = require('mongodb');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect("mongodb://localhost:27017/ozledgrowlights");
var db = mongoose.connection;


// /////// LOAD ALL MODELS
// var nav = require('./models/nav');
// var description = require('./models/description');
// var colours = require('./models/colours');
// var finishes = require('./models/finishes');
// var product = require('./models/products');

////// FUNCTIONS AND GLOBAL VARIABLES
function search(prop, value, array) {
  for (var i=0; i < array.length; i++) {
	if (array[i][prop] === value) {
	  return array[i];
	};
  };
};


////// SET PROJECT PUBLIC FOLDERS
app.use('/styles', express.static(__dirname + '/styles'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/fonts', express.static(__dirname + "/fonts"));


////888################################ ROUTES #######################################333\\\\
app.get('/(|home|index)', function(req, res) {
	res.render('pages/home')

});

app.get('/products/:product', function(req, res) {

	res.render('pages/products/'+req.params.product)
	
});

//// APP LISTENER FOR CLIENTS
app.listen(1337);
