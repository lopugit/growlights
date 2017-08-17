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
        console.log("this is the type of grow tent")
        console.log(type)
        productModel.remove({
                product_type: type
            }, err => {
                if (err) {
                    console.log("there was an error removing all products from our database: ")
                    console.log(err)
                } else {
                    console.log("looping through all products")
                    client
                        .fetchAllProducts()
                        .then((products) => {
                            products.forEach((product, index) => {
                                if (product.attrs.product_type == type) {
                                    var json = product
                                        .attrs
                                        .body_html
                                        .split('|||')[1]
                                    product.attrs.body_html = product
                                        .attrs
                                        .body_html
                                        .split('|||')[0]
                                    delete product.attrs.variants[0].title
                                    if (json) {
                                        json = json.replace(/(<.{0,1}span>|<meta.*">|<.{0,1}p>|\r?\n|\r|\s)/g, '')
                                            // console.log(json)
                                        json = JSON.parse(json)
                                        var productData = json
                                            // console.log("we are in growTents.js though")
                                            // console.log(product.attrs.vendor)
                                            // console.log(product.attrs.product_type)
                                        if ((product.attrs.vendor == "Mars Hydro") && (product.attrs.product_type == "Grow Tent")) {
                                            productData.title = product.attrs.title.split(' ').slice(0, 2)
                                            productData.title = productData.title[0] + " " + productData.title[1]
                                            productData.model = product.attrs.title.split(' ')[2]
                                            delete product.attrs.title
                                        }
                                        jsonConcat(product.attrs, product.attrs.variants[0])
                                        jsonConcat(productData, product.attrs)
                                        var newProduct = new productModel(productData)
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
                                                // console.log(newProduct)
                                        }
                                    })
                                }
                            })
                        })
                }
            })
            .catch(err => {
                console.error(err)
                console.error("the connection did not work, most likely due to no internet connection");
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