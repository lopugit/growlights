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

    client
        .fetchProduct('9931093777')
        .then((product, err) => {
            var objects = {};
            delete product.attrs.variants[0].title
            jsonConcat(product.attrs, product.attrs.variants[0])
            delete product.attrs.variants
            delete product.attrs.option_values
            delete product.attrs.options
            delete product.attrs.position
            delete product.attrs.handle
                // console.log("this is product.attrs")
                // console.log(product.attrs)
            var json = product
                .attrs
                .body_html
                .split('|||')[1]
            product.attrs.body_html = product
                .attrs
                .body_html
                .split('|||')[0]
            json = json.replace(/(<.{0,1}span>|<meta.*">|<.{0,1}p>|\r?\n|\r|\s)/g, '')
                // console.log("this is json")
                // console.log(json)
            json = JSON.parse(json)
            jsonConcat(product.attrs, json)
            delete product.attrs.id
            delete product.attrs.product_id
            var schema = generateSchema.mongoose(product.attrs);
            var productSchema = new Schema(schema);
            productSchema.add({
                    model: String,
                    unit: {
                        type: String,
                        default: "cm"
                    },
                    shopifyProductId: {
                        type: Number
                    },
                    shopifyVariantId: {
                        type: Number
                    },
                    minPxWidth: {
                        type: Number,
                        default: 300
                    }
                })
                // console.log("this is productSchema")
                // console.log(productSchema)
            var methods = {
                priceFormatted: function() { return "$" + this.price },
                materialOutFormatted: function() {
                    return this.materialOut.replace(/-/g, ' ')
                }
            }
            jsonConcat(productSchema.methods, methods)
            var productModel = db.model("Grow Tent", productSchema, "products");
            resolve(productModel)
        })
        .catch(err => {
            // console.log(objects.product);
            console.error("the connection did not work, most likely due to no internet connection");
            console.error(err)
            return Db.then((DB, err) => {
                return DB
                    .collection('products')
                    .findOne({
                        product_type: 'Grow Tent'
                    })
                    .then((product, err) => {
                        var schema = generateSchema.mongoose(product)
                        var model = db.model("products", schema)
                        resolve(model)
                    })
                    .catch(err => {
                        console.log("there was an error finding one Grow Tent")
                        console.log(err)
                        reject(err)
                    })
                    // objects.productSchema = generateSchema.mongoose(allProducts[0])
                    // objects.productSchema = allProducts[0]
            })
        });
})

function jsonConcat(o1, o2) {
    for (var key in o2) {
        o1[key] = o2[key];
    }
}