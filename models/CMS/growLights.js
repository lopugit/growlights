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
        .fetchProduct('9929912721')
        .then(function(product, err) {
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
            var schema = generateSchema.mongoose(product.attrs);
            var productSchema = new Schema(schema);
            // console.log("this is productSchema")
            // console.log(productSchema)
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
                vendor: {
                    type: String
                },
                spectrum: {
                    type: [{}]
                },
                lumens: {
                    type: Number
                },
                par: {
                    type: Number
                },
                switchable: {
                    type: Boolean,
                    default: true
                },
                emissionInset: {
                    type: Number,
                    default: 14
                },
                wattage: {
                    type: Number
                },
                showLables: {
                    type: Boolean,
                    default: true
                },
                lensAngle: {
                    type: Number,
                    default: 120
                },
                spectrumSpread: {
                    type: String,
                    default: 'both'
                },
                lightType: {
                    type: String,
                    default: "LED"
                },
                showInfoButton: {
                    type: Boolean,
                    default: true
                },
                customLightHeight: {
                    type: Number,
                    default: undefined
                },
                customLightCoverage: {
                    type: Number,
                    default: undefined
                }
            })
            var methods = {
                wattageFormatted: function() {
                    return this.wattage + "W"
                },
                priceFormatted: function() {
                    return "$" + this.price
                },
                lightHeight: function() {
                    // Returns the base hang height of the light for rendering in 2d or 3d with
                    // css/html
                    if (this.customLightHeight) {
                        return this.customLightHeight
                    } else {
                        return (((Math.sqrt(this.wattage))) * 15)
                    }
                },
                diodeCoverage: function(height) {
                    if (this.customLightSpread) {
                        return this.customLightSpread / 2
                    } else {
                        // returns half of the width that each source of light, be it a diode or COB
                        // covers, according to the lensAngle of the light unit diodes
                        return (Math.tan(this.r2d2(this.lensAngle) / 2) * height)
                    }
                },
                coverageWidth: function(height) {
                    return (((this.diodeCoverage(this.lightHeight())) * 2) + this.width)
                },
                r2d2: function(d) {
                    return d * (180 / Math.PI)
                }

            }
            jsonConcat(productSchema.methods, methods)
            var productModel = db.model("Grow Light", productSchema, "products");
            resolve(productModel)
        })
        .catch(function(err) {
            // console.log(objects.product);
            console.error("the connection did not work, most likely due to no internet connection");
            console.error(err)

            Db.then((DB, err) => {
                DB
                    .collection('products')
                    .findOne({
                        product_type: 'Grow Light'
                    })
                    .then(function(product, err) {
                        var schema = generateSchema.mongoose(product)
                        var model = db.model("products", schema)
                        resolve(model)
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