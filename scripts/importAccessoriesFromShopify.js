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

        client
            .fetchAllProducts()
            .then((products) => {
                var productIds = []
                products.forEach((ProductIter, index) => {
                    var productIter1 = ProductIter
                    productIds.push(productIter1.attrs.product_id)
                })
                productModel.remove({
                        shopifyId: { $nin: productIds },
                        type: type
                    }).then((res, err) => {
                        if (err) {
                            console.error("there was an error deleting all documents that are of type: " + type + " and do not have an id in our list of shopify id's")
                        } else {}
                    })
                    .catch(err => {
                        console.error("there was an error deleting all documents that are of type: " + type + " and do not have an id in our list of shopify id's")
                        console.error(err)
                    })
                products.forEach((productIter, index) => {
                    var product = productIter
                    productModel.findOne({
                            shopifyProductId: product.id
                        }).then((ReturnedProduct, err) => {
                            if (!err) {
                                var returnedProduct = ReturnedProduct

                                if (product.attrs.product_type == type) {
                                    var json = product
                                        .attrs
                                        .body_html
                                        .split('|||')[1]
                                    product.attrs.body_html = product
                                        .attrs
                                        .body_html
                                        .split('|||')[0]
                                    var productData = {}
                                        // productData.model = 'Accessory'
                                    if (json) {
                                        json = json.replace(/(<.{0,1}span>|<meta.*">|<.{0,1}p>|\r?\n|\r|\s)/g, '')
                                        json = JSON.parse(json)
                                        var productData = json
                                        delete product.attrs.variants[0].title
                                        jsonConcat(product.attrs, product.attrs.variants[0])
                                        productData.shopifyVariantId = product.attrs.id
                                        productData.shopifyProductId = product.attrs.product_id
                                        delete product.attrs.id
                                        delete product.attrs.product_id
                                        jsonConcat(productData, product.attrs)
                                        productData.model = productData.title
                                        var newProduct = new productModel(productData)
                                    } else {
                                        delete product.attrs.variants[0].title
                                        jsonConcat(product.attrs, product.attrs.variants[0])
                                        productData.shopifyVariantId = product.attrs.id
                                        productData.shopifyProductId = product.attrs.product_id
                                        delete product.attrs.id
                                        delete product.attrs.product_id
                                        jsonConcat(productData, product.attrs)
                                        productData.model = productData.title
                                        var newProduct = new productModel(productData)
                                    }
                                    // if (!JSONequal(product, newProduct)) {
                                    productModel.remove({
                                            shopifyProductId: newProduct.shopifyProductId
                                        }).then((res, err) => {
                                            if (err) {
                                                console.error("there was an error removing all products from our database: ")
                                                    // console.error(err)
                                                console.error("and res")

                                            } else if (res) {
                                                newProduct.save(err => {
                                                    if (err) {
                                                        console.error("there was an error saving the model to the database: ")
																												console.error(err)
																												return
                                                    } else {}
                                                })
                                            }
                                        })
                                        .catch(err => {
                                            console.error("there was an error removing product from database with id: " + product.product_id)
																						console.error(err)
																						return
                                        })
                                        // } else {
                                        // }
                                }
                                if (products.length == index - 1) {
                                    return
                                }


                            } else {
                                console.error("there was an error finding a product with id: " + product.id)
																console.error(err)
																return
                            }

                        })
                        .catch(err => {
                            console.error("there was na error finding a product with id: " + product.id)
														console.error(err)
														return
                        })
                })
            })
            .catch(err => {
                console.error("there was an error when fetching all products from your shopify store")
								console.error(err)
								return
            })


    }).catch(err => {
        console.error("there was some error waiting on the product model: ")
				console.error(err)
				return
    })
}

function JSONequal(o1, o2) {
    var same
    for (var key in o2) {
        if (typeof(o2[key]) == 'string') {}

        if (typeof(o2[key]) == 'string' || 'number' || 'boolean') {
            if (o1[key] == o2[key]) {
                same = true
            } else {
                same = false
            }

        }
        if (!same) {
            return false

        }
    }
}

function jsonConcat(o1, o2) {
    for (var key in o2) {
        o1[key] = o2[key];
    }
}