var MongoClient = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.createConnection("mongodb://localhost:27017/ozledgrowlights")
var shopify = require('shopify-buy');
// var _ = require('underscore')
var client = shopify.buildClient({
    accessToken: '2316d72d137b62d7f172bd87762b9fe3',
    domain: 'ozledgrowlights.myshopify.com',
    appId: '6'
});

module.exports = function(vars) {
    var model = vars.model
    var type = vars.type
    model.then(productModel => {

        console.log("removing products");
        productModel.remove({
                product_type: type
            }, err => {
                if (err) {
                    console.log("there was an error removing all products from our database: ")
                    console.log(err)
                    reject(err)
                } else {
                    client
                        .fetchAllProducts()
                        .then((products) => {
                            console.log("looping through all products")
                            products.forEach((product, index) => {
                                // console.log(product.attrs.variants); console.log("this is the product");
                                // console.log(product); console.log(index)
                                if (product.attrs.product_type == type) {
                                    var json = product
                                        .attrs
                                        .body_html
                                        .split('|||')[1]
                                    product.attrs.body_html = product
                                        .attrs
                                        .body_html
                                        .split('|||')[0]
                                    if (json) {
                                        json = json.replace(/(<.{0,1}span>|<meta.*">|<.{0,1}p>|\r?\n|\r|\s)/g, '')
                                            // console.log(json)
                                        json = JSON.parse(json)
                                        var productData = json
                                        if ((product.attrs.vendor == "Mars Hydro") && (product.attrs.product_type == "Grow Light")) {
                                            productData.spectrum = [

                                                    {

                                                        wavelength: 440,

                                                        colour: "blue",

                                                        percent: 0.125,

                                                        modes: [

                                                            {

                                                                title: "veg",

                                                                percent: 0.1

                                                            }, {

                                                                title: "bloom",

                                                                percent: 0.025

                                                            }

                                                        ]

                                                    }, {

                                                        wavelength: 460,

                                                        colour: "blue",

                                                        percent: 0.125,

                                                        modes: [

                                                            {

                                                                title: "veg",

                                                                percent: 0.1

                                                            }, {

                                                                title: "bloom",

                                                                percent: 0.025

                                                            }

                                                        ]

                                                    }, {
                                                        wavelength: 630,

                                                        colour: "red",

                                                        percent: 0.325,

                                                        modes: [{

                                                            title: "veg",

                                                            percent: 0.125

                                                        }, {

                                                            title: "bloom",

                                                            percent: 0.2

                                                        }]
                                                    }, {

                                                        wavelength: 660,

                                                        colour: "red",

                                                        percent: 0.325,

                                                        modes: [{

                                                            title: "veg",

                                                            percent: 0.125

                                                        }, {

                                                            title: "bloom",

                                                            percent: 0.2

                                                        }]

                                                    }, {

                                                        wavelength: 730,

                                                        colour: "infra red",

                                                        percent: 0.01,

                                                        modes: [

                                                            {

                                                                title: "veg",

                                                                percent: 0.01

                                                            }, {

                                                                title: "bloom",

                                                                percent: 0.01

                                                            }

                                                        ]

                                                    }, {

                                                        wavelength: "3000k",

                                                        colour: "white",

                                                        percent: 0.09,

                                                        modes: [

                                                            {

                                                                title: "veg",

                                                                percent: 0.09

                                                            }, {

                                                                title: "bloom",

                                                                percent: 0.09

                                                            }

                                                        ]

                                                    }

                                                ]
                                                // console.log(json)
                                            productData.model = product.attrs.title.split(' ')[0]
                                        }
                                        delete product.attrs.variants[0].title
                                        jsonConcat(product.attrs, product.attrs.variants[0])
                                        jsonConcat(productData, product.attrs)
                                        var newProduct = new productModel(productData)
                                            // console.log("this is the productData"); console.log(productData)
                                            // console.log(json) newProduct
                                    } else {
                                        newProduct = new productModel(product.attrs)
                                    }
                                    newProduct.save(err => {
                                        if (err) {
                                            console.log("there was an error saving the model to the database: ")
                                            console.log(err)
                                            console.log(err.errors.spectrum.reason)
                                        } else {
                                            console.log("saved the model succesfully")
                                        }
                                    })
                                }
                                if (products.length == index - 1) {
                                    resolve()
                                }
                            })
                        })
                }
            })
            .catch(err => {
                console.error(err)
                console.error("the connection did not work, most likely due to no internet connection");
                reject(err)
            })
    }).catch(err => {
        console.log("there was some error waiting on the product model: ")
        console.log(err)
    })
}

function jsonConcat(o1, o2) {
    for (var key in o2) {
        o1[key] = o2[key];
    }
}