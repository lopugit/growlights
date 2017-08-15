var MongoClient = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.createConnection("mongodb://localhost:27017/ozledgrowlights")
var shopify = require('shopify-buy');
var client = shopify.buildClient({
    accessToken: '2316d72d137b62d7f172bd87762b9fe3',
    domain: 'ozledgrowlights.myshopify.com',
    appId: '6'
});

module.exports = function(model) {
    model.then(productModel => {
        // console.log("product model");
        // console.log(productModel);
        client.fetchAllProducts()
            .then((products) => {
                console.log("removing products");
                productModel.remove({}, err => {
                    if (err) {
                        console.log("there was an error removing all products from our database: ")
                        console.log(err)
                    } else {
                        console.log("looping through all products")
                        products.forEach((product, index) => {

                            // console.log(product.attrs.variants);
                            // console.log("this is the product");
                            // console.log(product);
                            // console.log(index)
                            var json = product.attrs.body_html.split('|||')[1]
                            product.attrs.body_html = product.attrs.body_html.split('|||')[0]
                            var newProduct = new productModel(product.attrs)
                            if (json) {
                                json = json.replace(/(<.{0,1}span>|<meta.*">|<.{0,1}p>|\r?\n|\r|\s)/g, '')
                                    // console.log(json)
                                json = JSON.parse(json)
                                if ((product.attrs.vendor == "Mars Hydro") && (product.attrs.product_type == "Grow Light")) {
                                    json.spectrum = [

                                        {

                                            "wavelength": 440,

                                            "colour": "blue",

                                            "percent": 0.125,

                                            "modes": [

                                                {

                                                    "title": "veg",

                                                    "percent": 0.1

                                                },

                                                {

                                                    "title": "bloom",

                                                    "percent": 0.025

                                                }

                                            ]

                                        },

                                        {

                                            "wavelength": 460,

                                            "colour": "blue",

                                            "percent": 0.125,

                                            "modes": [

                                                {

                                                    "title": "veg",

                                                    "percent": 0.1

                                                },

                                                {

                                                    "title": "bloom",

                                                    "percent": 0.025

                                                }

                                            ]

                                        },

                                        {

                                            "wavelength": 630,

                                            "colour": "red",

                                            "percent": 0.325,

                                            "modes": [

                                                {

                                                    "title": "veg",

                                                    "percent": 0.125

                                                },

                                                {

                                                    "title": "bloom",

                                                    "percent": 0.2

                                                }

                                            ]

                                        },

                                        {

                                            "wavelength": 660,

                                            "colour": "red",

                                            "percent": 0.325,

                                            "modes": [

                                                {

                                                    "title": "veg",

                                                    "percent": 0.125

                                                },

                                                {

                                                    "title": "bloom",

                                                    "percent": 0.2

                                                }

                                            ]

                                        },

                                        {

                                            "wavelength": 730,

                                            "colour": "infra red",

                                            "percent": 0.01,

                                            "modes": [

                                                {

                                                    "title": "veg",

                                                    "percent": 0.01

                                                },

                                                {

                                                    "title": "bloom",

                                                    "percent": 0.01

                                                }

                                            ]

                                        },

                                        {

                                            "wavelength": "3000k",

                                            "colour": "white",

                                            "percent": 0.09,

                                            "modes": [

                                                {

                                                    "title": "veg",

                                                    "percent": 0.09

                                                },

                                                {

                                                    "title": "bloom",

                                                    "percent": 0.09

                                                }

                                            ]

                                        }

                                    ]
                                    console.log(json)
                                }
                                // console.log(json)
                                // newProduct
                            }
                            // console.log(product.attrs.body_html)
                            // for (variant in product.attrs.variants) {
                            //     // console.log("this is the variant");
                            //     // console.log(product.attrs.variants[variant]);
                            //     var newProduct = new productModel(product.attrs.variants[variant])
                            //         // console.log("this is the variant");
                            //         // console.log(variant);
                            //         // console.log(product.attrs.variants[variant]);
                            //     newProduct.model = product.attrs.title
                            //         // console.log("option value");
                            //         // console.log(newProduct.option_values);
                            //         // console.log("new product");
                            //         // console.log(newProduct);
                            //     newProduct.option_values.forEach(option => {
                            //         if (option.name == 'Size') {
                            //             var size = option.value.split('x')
                            //             newProduct.width = size[0]
                            //             newProduct.depth = size[1]
                            //             newProduct.height = size[2]
                            //         }
                            //     })
                            //     newProduct.vendor = product.attrs.vendor
                            //     newProduct.type = product.attrs.product_type
                            //     console.log("saving the new product");
                            //     newProduct.save()
                            // }
                            // console.log(product.attrs.variants);
                            // product.attrs.variants.forEach(variant=>{
                            // 	console.log(variant);
                            // 	var newProduct = new productModel(product)
                            // 	newProduct.model = product.title
                            // 	newProduct.option_values.forEach(option=>{
                            // 		if(option.name == 'Size'){
                            // 			var size = option.value.split('x')
                            // 			newProduct.width = size[0]
                            // 			newProduct.depth = size[1]
                            // 			newProduct.height = size[2]
                            // 		}
                            // 	})
                            // 	newProduct.type = product.attrs.product_type
                            // 	console.log("saving the new product");
                            // 	newProduct.save()
                            // })
                        })
                    }
                })
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