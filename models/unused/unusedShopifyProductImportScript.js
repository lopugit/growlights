var MongoClient = require('mongodb');

// mongodb = MongoClient.connect('mongodb://localhost/ozledgrowlights');

var mongoose = require('mongoose');

var fs = require('fs');
var path = require('path');

var generateSchema = require('generate-schema');

var Schema = mongoose.Schema;


var shopify = require('shopify-buy');

var client = shopify.buildClient({
  accessToken: '30197388c16741334138de5dd1de3f1a',
  domain: 'my-leisure.myshopify.com',
  appId: '6'
});




var write = true;

//Only uncomment if you want to export hell
// module.exports = function (callback) {

module.exports = client.fetchProduct('8461073805').then(function(products) {
  var objects = {};

  objects.schema = generateSchema.mongoose(products.attrs.variants[0]);
  objects.products = products;

  return objects;

})
.then(function(objects){


  var productSchema = new Schema(objects.schema);

  // productSchema.add({
  //   images: {type: [], default: null},
  //   thumbnail: {type: String, default: "thumb.jpg"},
  //   name: {type: String, default: "lettini"},
  //   colour: {type: String, default: null},
  //   finish: {type: String, default: null},
  //   frame: {type: String, default: null},
  //   id: {type: String, default: objects.products.attrs.product_id},
  //   variantId: {type: String, default: null}
  // });

  var product = db.model("product", productSchema);


  product.remove({});
  objects.product = product;
  // callback(product)
  return objects;

}).then(function(objects){

  if(write)
    return objects.product.remove({name: "lettini"}).then(function(){

      return objects
    });

	else
		return objects

}).then(function(objects){

  var products = objects.products;
  var product = objects.product;

  for (var i = 0; i < products.variants.length ; i++) {

    if ( products.variants[i].attrs.variant.sku === sku) {
      var tempProduct = products.variants[i].attrs.variant;
      var newProduct = new product(tempProduct);
      newProduct.save();
    };
  };

  return objects

}).then(function(objects) {
  return objects.product;
}).catch(function(objects) {
	return objects.product;
});
