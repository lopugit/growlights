var MongoClient = require('mongodb').MongoClient
var mongoose = require('mongoose')
var db = mongoose.createConnection("mongodb://localhost:27017/ozledgrowlights")
var Db = MongoClient.connect('mongodb://localhost:27017/ozledgrowlights')
var fs = require('fs')
var path = require('path')
var generateSchema = require('generate-schema')
var Schema = mongoose.Schema
var shopify = require('shopify-buy')
var client = shopify.buildClient({
    accessToken: '2316d72d137b62d7f172bd87762b9fe3',
    domain: 'ozledgrowlights.myshopify.com',
    appId: '6'
})

module.exports = function(vars) {

    return client.fetchProduct('9931098321')
        .then(function(product, err) {
            var objects = {};
            // console.log(product)
            var schema = generateSchema.mongoose(product.attrs);
            var productSchema = new Schema(schema);
            productSchema.add({
                model: {
                    type: String
                },
                width: {
                    type: Number
                },
                height: {
                    type: Number
                },
                depth: {
                    type: Number
                },
                type: {
                    type: String
                },
                vendor: {
                    type: String
                },
                spectrum: {
                    type: [Object]
                },
                lumens: {
                    type: Number
                },
                par: {
                    type: Number
                }
            })
            objects.productSchema = productSchema
            return objects;
        })
        .then(function(objects) {
            var productModel = db.model("growTent", objects.productSchema, "products");
            objects.product = productModel;
            return objects.product;
        })
        .catch(function() {
            // console.log(objects.product);
            console.error("the connection did not work, most likely due to no internet connection");
            return Db.then((DB, err) => {
                return DB.collection('products').findOne({}).then(function(product, err) {
                        var schema = generateSchema.mongoose(product)
                        var model = db.model("products", schema)
                        return model
                    })
                    // objects.productSchema = generateSchema.mongoose(allProducts[0])
                    // objects.productSchema = allProducts[0]
            })
        });
}