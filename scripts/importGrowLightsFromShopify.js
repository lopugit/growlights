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
                // console.log("looping through all products")
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
                        } else {
                            // console.log("successfully removed all products which do not have id in our list of shopify id's and have the correct type")
                        }
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
                                if (json) {
                                    json = json.replace(/(<.{0,1}span>|<meta.*">|<.{0,1}p>|\r?\n|\r|\s)/g, '')
                                        // console.log(json)
                                    json = JSON.parse(json)
                                    var productData = json
                                    delete product.attrs.variants[0].title
                                    jsonConcat(product.attrs, product.attrs.variants[0])
                                    jsonConcat(productData, product.attrs)
                                    var consts = {
                                        wattage: 0.01921,
                                        wattagePsqm: 1.9
                                    }
                                    if ((product.attrs.vendor == "Mars Hydro") && (product.attrs.product_type == "Grow Light")) {
                                        productData.spectrum = [{
                                                temperature: 3000,
                                                colour: "white",
                                                lensAngle: 120,
                                                percent: 0.07,
                                                ppfd: 2.25,
                                                lumens: 2.58,
                                                lux: 50,
                                                wattage: consts.wattage,
                                                wattagePsqm: consts.wattagePsqm,
                                                efficiency: .5,
                                                lightOpacity: 0.6,
                                                modes: [{
                                                    title: "veg",
                                                    percent: 0.07
                                                }, {
                                                    title: "bloom",
                                                    percent: 0.07
                                                }]
                                            }, {
                                                wavelength: 440,
                                                colour: "blue",
                                                lensAngle: 140,
                                                percent: 0.135,
                                                ppfd: 2.25,
                                                lumens: 2.58,
                                                lux: 50,
                                                wattage: consts.wattage,
                                                wattagePsqm: consts.wattagePsqm,
                                                efficiency: .5,
                                                lightOpacity: 0.6,
                                                modes: [{
                                                    title: "veg",
                                                    percent: 0.1
                                                }, {
                                                    title: "bloom",
                                                    percent: 0.035
                                                }]
                                            }, {
                                                wavelength: 460,
                                                colour: "blue",
                                                lensAngle: 140,
                                                percent: 0.135,
                                                ppfd: 2.25,
                                                lumens: 2.58,
                                                lux: 50,
                                                wattage: consts.wattage,
                                                wattagePsqm: consts.wattagePsqm,
                                                efficiency: .5,
                                                lightOpacity: 0.6,
                                                modes: [{
                                                    title: "veg",
                                                    percent: 0.1
                                                }, {
                                                    title: "bloom",
                                                    percent: 0.035
                                                }]
                                            }, {
                                                wavelength: 630,
                                                colour: "red",
                                                lensAngle: 120,
                                                percent: 0.325,
                                                ppfd: 2.25,
                                                lumens: 2.58,
                                                lux: 50,
                                                wattage: consts.wattage,
                                                wattagePsqm: consts.wattagePsqm,
                                                efficiency: .5,
                                                lightOpacity: 0.6,
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
                                                lensAngle: 120,
                                                percent: 0.325,
                                                ppfd: 2.25,
                                                lumens: 2.58,
                                                lux: 50,
                                                wattage: consts.wattage,
                                                wattagePsqm: consts.wattagePsqm,
                                                efficiency: .5,
                                                lightOpacity: 0.6,
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
                                                lensAngle: 120,
                                                percent: 0.01,
                                                ppfd: 2.25,
                                                lumens: 2.58,
                                                lux: 50,
                                                wattage: consts.wattage,
                                                wattagePsqm: consts.wattagePsqm,
                                                efficiency: .5,
                                                lightOpacity: 0.6,
                                                modes: [{
                                                    title: "veg",
                                                    percent: 0.01
                                                }, {
                                                    title: "bloom",
                                                    percent: 0.01
                                                }]
                                            }]
                                            // console.log(json)
                                        productData.model = product.attrs.title.split(' ')[0]
                                        productData.shopifyProductId = product.attrs.product_id
                                        productData.shopifyVariantId = product.attrs.id
                                        delete product.attrs.id
                                        delete product.attrs.product_id
                                    } else if ((product.attrs.vendor == "ozled") && (product.attrs.product_type == "Grow Light")) {
                                        // console.log("we saved the rainbow one")
                                        productData.model = product.attrs.title.split(' ')[0]
                                        if (productData.model == 'Rainbow') {
                                            productData.spectrum = [
                                                { wavelength: "Purple", percent: .1428, lumens: 2.58, lux: 2.58, lensAngle: 30, ppfd: 1.6, wattage: consts.wattage, wattagePsqm: consts.wattagePsqm, efficiency: .5 },
                                                { wavelength: "Blue", percent: .1428, lumens: 2.58, lux: 2.58, lensAngle: 30, ppfd: 1.6, wattage: consts.wattage, wattagePsqm: consts.wattagePsqm, efficiency: .5 },
                                                { wavelength: "Cyan", percent: .1428, lumens: 2.58, lux: 2.58, lensAngle: 30, ppfd: 1.6, wattage: consts.wattage, wattagePsqm: consts.wattagePsqm, efficiency: .5 },
                                                { wavelength: "Green", percent: .1428, lumens: 2.58, lux: 2.58, lensAngle: 30, ppfd: 1.6, wattage: consts.wattage, wattagePsqm: consts.wattagePsqm, efficiency: .5 },
                                                { wavelength: "Yellow", percent: .1428, lumens: 2.58, lux: 2.58, lensAngle: 30, ppfd: 1.6, wattage: consts.wattage, wattagePsqm: consts.wattagePsqm, efficiency: .5 },
                                                { wavelength: "Orange", percent: .1428, lumens: 2.58, lux: 2.58, lensAngle: 30, ppfd: 1.6, wattage: consts.wattage, wattagePsqm: consts.wattagePsqm, efficiency: .5 },
                                                { wavelength: "Red", percent: .1428, lumens: 2.58, lux: 2.58, lensAngle: 30, ppfd: 1.6, wattage: consts.wattage, wattagePsqm: consts.wattagePsqm, efficiency: .5 }
                                            ]
                                            jsonConcat(productData, {
                                                minPxWidth: 280,
                                                backBoost: true,
                                                centerOutWavelengths: true,
                                                position: {
                                                    type: 'center'
                                                },
                                                modes: []
                                            })
                                            if (productData.renderRules) productData.renderRules.labels = false


                                        } else if (productData.model == 'MarsBar') {
                                            productData.spectrum = [{
                                                wavelength: 440,
                                                colour: "blue",
                                                lensAngle: 140,
                                                percent: 0.8,
                                                ppfd: 1.6,
                                                lumens: 2.58,
                                                lux: 2.58,
                                                wattage: consts.wattage,
                                                wattagePsqm: consts.wattagePsqm,
                                                efficiency: .5
                                            }, {
                                                wavelength: 660,
                                                colour: "blue",
                                                lensAngle: 140,
                                                percent: 0.2,
                                                ppfd: 1.6,
                                                lumens: 2.58,
                                                lux: 2.58,
                                                wattage: consts.wattage,
                                                wattagePsqm: consts.wattagePsqm,
                                                efficiency: .5
                                            }]
                                            jsonConcat(productData, {
                                                backBoost: true,
                                                modes: []
                                            })
                                        } else {
                                            productData.spectrum = [{
                                                    temperature: 3000,
                                                    colour: "white",
                                                    lensAngle: 120,
                                                    percent: 0.07,
                                                    ppfd: 1.6,
                                                    lumens: 2.58,
                                                    lux: 2.58,
                                                    wattage: consts.wattage,
                                                    wattagePsqm: consts.wattagePsqm,
                                                    efficiency: .5,
                                                    modes: [{
                                                        title: "veg",
                                                        percent: 0.07
                                                    }, {
                                                        title: "bloom",
                                                        percent: 0.07
                                                    }]
                                                }, {
                                                    wavelength: 440,
                                                    colour: "blue",
                                                    lensAngle: 140,
                                                    percent: 0.135,
                                                    ppfd: 1.6,
                                                    lumens: 2.58,
                                                    lux: 2.58,
                                                    wattage: consts.wattage,
                                                    wattagePsqm: consts.wattagePsqm,
                                                    efficiency: .5,
                                                    modes: [{
                                                        title: "veg",
                                                        percent: 0.1
                                                    }, {
                                                        title: "bloom",
                                                        percent: 0.035
                                                    }]
                                                }, {
                                                    wavelength: 460,
                                                    colour: "blue",
                                                    lensAngle: 140,
                                                    percent: 0.135,
                                                    ppfd: 1.6,
                                                    lumens: 2.58,
                                                    lux: 2.58,
                                                    wattage: consts.wattage,
                                                    wattagePsqm: consts.wattagePsqm,
                                                    efficiency: .5,
                                                    modes: [{
                                                        title: "veg",
                                                        percent: 0.1
                                                    }, {
                                                        title: "bloom",
                                                        percent: 0.035
                                                    }]
                                                }, {
                                                    wavelength: 630,
                                                    colour: "red",
                                                    lensAngle: 120,
                                                    percent: 0.325,
                                                    ppfd: 1.6,
                                                    lumens: 2.58,
                                                    lux: 2.58,
                                                    wattage: consts.wattage,
                                                    wattagePsqm: consts.wattagePsqm,
                                                    efficiency: .5,
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
                                                    lensAngle: 120,
                                                    percent: 0.325,
                                                    ppfd: 1.6,
                                                    lumens: 2.58,
                                                    lux: 2.58,
                                                    wattage: consts.wattage,
                                                    wattagePsqm: consts.wattagePsqm,
                                                    efficiency: .5,
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
                                                    lensAngle: 120,
                                                    percent: 0.01,
                                                    ppfd: 1.6,
                                                    lumens: 2.58,
                                                    lux: 2.58,
                                                    wattage: consts.wattage,
                                                    wattagePsqm: consts.wattagePsqm,
                                                    efficiency: .5,
                                                    modes: [{
                                                        title: "veg",
                                                        percent: 0.01
                                                    }, {
                                                        title: "bloom",
                                                        percent: 0.01
                                                    }]
                                                }]
                                                // console.log(json)
                                            if (productData.renderRules) { productData.renderRules.labels = false }
                                        }
                                        productData.shopifyProductId = product.attrs.product_id
                                        productData.shopifyVariantId = product.attrs.id
                                        delete product.attrs.id
                                        delete product.attrs.product_id
                                    } else {
                                        productData.spectrum = [{
                                                temperature: 3000,
                                                colour: "white",
                                                lensAngle: 120,
                                                percent: 0.07,
                                                ppfd: 1.6,
                                                lumens: 2.58,
                                                lux: 2.58,
                                                wattage: consts.wattage,
                                                wattagePsqm: consts.wattagePsqm,
                                                efficiency: .5,
                                                modes: [{
                                                    title: "veg",
                                                    percent: 0.07
                                                }, {
                                                    title: "bloom",
                                                    percent: 0.07
                                                }]
                                            }, {
                                                wavelength: 440,
                                                colour: "blue",
                                                lensAngle: 140,
                                                percent: 0.135,
                                                ppfd: 1.6,
                                                lumens: 2.58,
                                                lux: 2.58,
                                                wattage: consts.wattage,
                                                wattagePsqm: consts.wattagePsqm,
                                                efficiency: .5,
                                                modes: [{
                                                    title: "veg",
                                                    percent: 0.1
                                                }, {
                                                    title: "bloom",
                                                    percent: 0.035
                                                }]
                                            }, {
                                                wavelength: 460,
                                                colour: "blue",
                                                lensAngle: 140,
                                                percent: 0.135,
                                                ppfd: 1.6,
                                                lumens: 2.58,
                                                lux: 2.58,
                                                wattage: consts.wattage,
                                                wattagePsqm: consts.wattagePsqm,
                                                efficiency: .5,
                                                modes: [{
                                                    title: "veg",
                                                    percent: 0.1
                                                }, {
                                                    title: "bloom",
                                                    percent: 0.035
                                                }]
                                            }, {
                                                wavelength: 630,
                                                colour: "red",
                                                lensAngle: 120,
                                                percent: 0.325,
                                                ppfd: 1.6,
                                                lumens: 2.58,
                                                lux: 2.58,
                                                wattage: consts.wattage,
                                                wattagePsqm: consts.wattagePsqm,
                                                efficiency: .5,
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
                                                lensAngle: 120,
                                                percent: 0.325,
                                                ppfd: 1.6,
                                                lumens: 2.58,
                                                lux: 2.58,
                                                wattage: consts.wattage,
                                                wattagePsqm: consts.wattagePsqm,
                                                efficiency: .5,
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
                                                lensAngle: 120,
                                                percent: 0.01,
                                                ppfd: 1.6,
                                                lumens: 2.58,
                                                lux: 2.58,
                                                wattage: consts.wattage,
                                                wattagePsqm: consts.wattagePsqm,
                                                efficiency: .5,
                                                modes: [{
                                                    title: "veg",
                                                    percent: 0.01
                                                }, {
                                                    title: "bloom",
                                                    percent: 0.01
                                                }]
                                            }]
                                            // console.log(json)
                                        if (productData.renderRules) { productData.renderRules.labels = false }
                                    }
                                    var newProduct = new productModel(productData)
                                } else {
                                    newProduct = new productModel(product.attrs)
                                }
                                // if (!JSONequal(product, newProduct)) {
                                productModel.remove({
                                        shopifyProductId: newProduct.shopifyProductId
                                    }).then((res, err) => {
                                        if (err) {
                                            console.log("there was an error removing the product with id: " + product.product_id)
                                                // console.log(err)
                                            console.log("and res")
                                                // console.log(res)

                                        } else if (res) {
                                            // console.log("this is the product we're saving")
                                            // console.log(newProduct)
                                            newProduct.save(err => {
                                                if (err) {
                                                    console.error("there was an error saving the model to the database: ")
                                                    console.error(err.errors.spectrum.reason)
																										console.error(err)
																										return
                                                } else {
                                                    // console.log("saved the model Grow Light succesfully")
                                                }
                                            })
                                        }
                                    })
                                    .catch(err => {
                                        console.error("there was an error removing product from database with id: " + product.product_id)
																				console.error(err)
																				return
                                    })
                            }
                        } else {
                            console.error("there was an error finding a product with id: " + product.id)
														console.error(err)
														return
                        }
                    })

                    .catch(err => {
                        console.error("there was an error finding a product with id: " + product.id)
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
    console.log("what")
    var same
    console.log(o2)
    for (var key in o2) {
        console.log(key)
        if (typeof(o2[key]) == 'string') {
            console.log("the property was a string")
        }

        if (typeof(o2[key]) == 'string' || 'number' || 'boolean') {
            if (o1[key] == o2[key]) {
                console.log("the properties were equal")
                same = true
            } else {
                same = false
            }

        }
        if (!same) {
            return false

        }
    }
    // while(checking)
}

function jsonConcat(o1, o2) {
    for (var key in o2) {
        o1[key] = o2[key];
    }
}