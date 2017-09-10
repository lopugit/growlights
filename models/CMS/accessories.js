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

module.exports = new Promise((resolve, reject) => {

    client.fetchProduct('9931098321')
        .then(function(product, err) {
            var objects = {};
            delete product.attrs.variants[0].title
            jsonConcat(product.attrs, product.attrs.variants[0])
            delete product.attrs.variants
            delete product.attrs.options
            delete product.attrs.option_values
            var schema = generateSchema.mongoose(product.attrs);
            var productSchema = new Schema(schema);
            productSchema.add({
                model: {
                    type: String
                },
                type: {
                    type: String
                },
                vendor: {
                    type: String
                },
                shopifyProductId: {
                    type: Number
                },
                shopifyVariantId: {
                    type: Number
                }

            })
            objects.productSchema = productSchema
            return objects;
        })
        .then(function(objects) {
            var productModel = db.model("accessory", objects.productSchema, "products");
            objects.product = productModel;
            resolve(objects.product);
        })
        .catch(function() {
            console.error("the connection did not work, most likely due to no internet connection");
            return Db
                .then((DB, err) => {
                    return DB.collection('products').findOne({
                            product_type: 'Accessory'
                        }).then(function(product, err) {
                            var schema = generateSchema.mongoose(product)
                            var model = db.model("products", schema)
                            resolve(model)
                        })
                        .catch(err => {
                            console.error("findOne'ing any accessories")
                            console.error(err)
                            reject(err)
                        })

                    // objects.productSchema = generateSchema.mongoose(allProducts[0])
                    // objects.productSchema = allProducts[0]
                })
                .catch(err => {
                    console.error("there was an error connecting to the Db via mongoDB npm")
                    console.error(err)
                    reject(err)
                })
        });
})

function jsonConcat(o1, o2) {
    for (var key in o2) {
        o1[key] = o2[key];
    }
}