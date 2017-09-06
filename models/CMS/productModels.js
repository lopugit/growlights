var mongoose = require('mongoose');
var db = mongoose.createConnection("mongodb://localhost:27017/ozledgrowlights")
var Schema = mongoose.Schema;
var write = true

var productModelSchema = new Schema({
    model: String,
    type: String,
    models: { type: [String], default: [] },
    products: { type: [{}], default: [] },
    promotionalImages: { type: {}, default: {} }
})


var productModel = db.model('productModel', productModelSchema)
var products = [
    [
        new productModel({
            model: "Black",
            type: 'Grow Light',
            promotionalImages: {
                productPageSlider: [
                    { src: '/img/products/products/slide/slide_0019_black-ccd.jpg' },
                    { src: '/img/products/products/slide/slide_0020_black-yellow-red.jpg' },
                    { src: '/img/products/products/slide/slide_0003_black-1200-4.jpg' },
                    { src: '/img/products/products/slide/slide_0001_black-1600-2.jpg' },
                    { src: '/img/products/products/slide/slide_0000_black-1600-4.jpg' },
                ]
            }
        }),
        new productModel({
            model: "Green",
            type: 'Grow Light',
            promotionalImages: {
                productPageSlider: [
                    { src: '/img/products/products/slide/slide_0010_green-192-1.jpg' },
                    { src: '/img/products/products/slide/slide_0011_green-144-7.jpg' },
                    { src: '/img/products/products/slide/slide_0012_green-96-5.jpg' },
                    { src: '/img/products/products/slide/slide_0013_green-48-1.jpg' },
                ]
            }
        }),
        new productModel({
            model: "Pro",
            type: 'Grow Light',
            promotionalImages: {
                productPageSlider: [
                    { src: '/img/products/products/slide/slide_0015_pro-320-epistar-5.jpg' },
                    { src: '/img/products/products/slide/slide_0018_pro-128-cree-4.jpg' },
                    { src: '/img/products/products/slide/slide_0017_pro-160-epistar-2.jpg' },
                    { src: '/img/products/products/slide/slide_0016_pro-256-cree-4.jpg' },
                    { src: '/img/products/products/slide/slide_0014_pro-320-epistar-9.jpg' },
                ]
            }
        }),
    ],
    [
        new productModel({
            model: "Mars Grow Tent",
            type: 'Grow Tent',
            promotionalImages: {
                productPageSlider: [
                    { src: '/img/products/products/slide/slide_0019_black-ccd.jpg' },
                    { src: '/img/products/products/slide/slide_0020_black-yellow-red.jpg' },
                    { src: '/img/products/products/slide/slide_0003_black-1200-4.jpg' },
                    { src: '/img/products/products/slide/slide_0001_black-1600-2.jpg' },
                    { src: '/img/products/products/slide/slide_0000_black-1600-4.jpg' },
                ]
            }
        })
    ],
    [
        new productModel({
            model: "LED Glasses",
            type: 'Accessory',
            promotionalImages: {
                productPageSlider: [
                    { src: '/img/products/products/slide/slide_0019_black-ccd.jpg' },
                    { src: '/img/products/products/slide/slide_0020_black-yellow-red.jpg' },
                    { src: '/img/products/products/slide/slide_0003_black-1200-4.jpg' },
                    { src: '/img/products/products/slide/slide_0001_black-1600-2.jpg' },
                    { src: '/img/products/products/slide/slide_0000_black-1600-4.jpg' },
                ]
            }
        }),
        new productModel({
            model: "Yo Yo Hanger",
            type: 'Accessory',
            promotionalImages: {
                productPageSlider: [
                    { src: '/img/products/products/slide/slide_0019_black-ccd.jpg' },
                    { src: '/img/products/products/slide/slide_0020_black-yellow-red.jpg' },
                    { src: '/img/products/products/slide/slide_0003_black-1200-4.jpg' },
                    { src: '/img/products/products/slide/slide_0001_black-1600-2.jpg' },
                    { src: '/img/products/products/slide/slide_0000_black-1600-4.jpg' },
                ]
            }
        }),
    ]
]

if (write)
    productModel.remove({}).then(function() {
        products.forEach((product, index1) => {
            product.forEach((model, index2) => {
                product.forEach((model2, index3) => {
                    model.models.push(model2.model)
                })
                model.save()
            })
        })
    })

module.exports = productModel