var mongoose = require('mongoose');
var db = mongoose.createConnection("mongodb://localhost:27017/ozledgrowlights")
var Schema = mongoose.Schema;
var write = true

var productModelSchema = new Schema({
    model: String,
    type: String,
    altTypeNames: [String],
    models: { type: [String], default: [] },
    products: { type: [{}], default: [] },
    promotionalImages: { type: {}, default: {} }
})

productModelSchema.virtual('normalType').get(function() {
    return this.type.toLowerCase().replace(' ', '')
})
productModelSchema.virtual('normalAltTypeNames').get(function() {
    var names = []
    for (let name of this.altTypeNames) {
        names.push(name.toLowerCase().replace(' ', ''))
    }
    return names
})

var productModel = db.model('productModel', productModelSchema)


var products = [
    [
        new productModel({
            model: "Black",
            type: 'Grow Light',
            altTypeNames: ['Grow Light', 'grow lights', 'led grow lights', 'ledlights', 'plantlights'],
            promotionalImages: {
                productPageSlider: [
                    { src: '/img/products/slider/slide_0019_black-ccd.jpg' },
                    { src: '/img/products/slider/slide_0020_black-yellow-red.jpg' },
                    { src: '/img/products/slider/slide_0003_black-1200-4.jpg' },
                    { src: '/img/products/slider/slide_0001_black-1600-2.jpg' },
                    { src: '/img/products/slider/slide_0000_black-1600-4.jpg' },
                ]
            }
        }),
        new productModel({
            model: "Green",
            type: 'Grow Light',
            altTypeNames: ['Grow Light', 'grow lights', 'led grow lights', 'ledlights', 'plantlights'],
            promotionalImages: {
                productPageSlider: [
                    { src: '/img/products/slider/slide_0010_green-192-1.jpg' },
                    { src: '/img/products/slider/slide_0011_green-144-7.jpg' },
                    { src: '/img/products/slider/slide_0012_green-96-5.jpg' },
                    { src: '/img/products/slider/slide_0013_green-48-1.jpg' },
                ]
            }
        }),
        new productModel({
            model: "Pro",
            type: 'Grow Light',
            altTypeNames: ['Grow Light', 'grow lights', 'led grow lights', 'ledlights', 'plantlights'],
            promotionalImages: {
                productPageSlider: [
                    { src: '/img/products/slider/slide_0015_pro-320-epistar-5.jpg' },
                    { src: '/img/products/slider/slide_0018_pro-128-cree-4.jpg' },
                    { src: '/img/products/slider/slide_0017_pro-160-epistar-2.jpg' },
                    { src: '/img/products/slider/slide_0016_pro-256-cree-4.jpg' },
                    { src: '/img/products/slider/slide_0014_pro-320-epistar-9.jpg' },
                ]
            }
        }),
    ],
    [
        new productModel({
            model: "Mars Tents",
            type: 'Grow Tent',
            altTypeNames: ['Grow Tent', 'grow tents', 'tents', 'tent'],
            promotionalImages: {
                productPageSlider: [
                    { src: '/img/products/slider/slide_0019_black-ccd.jpg' },
                    { src: '/img/products/slider/slide_0020_black-yellow-red.jpg' },
                    { src: '/img/products/slider/slide_0003_black-1200-4.jpg' },
                    { src: '/img/products/slider/slide_0001_black-1600-2.jpg' },
                    { src: '/img/products/slider/slide_0000_black-1600-4.jpg' },
                ]
            }
        })
    ],
    [
        new productModel({
            model: "LED Glasses",
            type: 'Accessory',
            altTypeNames: ['Accessory', 'accessories', 'goodies'],
            promotionalImages: {
                productPageSlider: [
                    { src: 'https://cdn.shopify.com/s/files/1/0736/5273/products/yo_yo.jpg?v=1503584751' },
                    { src: 'https://cdn.shopify.com/s/files/1/0736/5273/products/led_grow_light_glass3_1.jpg?v=1503583912' },
                    { src: 'https://cdn.shopify.com/s/files/1/0736/5273/products/led_grow_light_glass_2_1.jpg?v=1503583928' },
                    { src: 'https://cdn.shopify.com/s/files/1/0736/5273/products/3.jpg?v=1503584751' },
                    { src: '/img/products/slider/slide_0000_black-1600-4.jpg' }
                ]
            }
        }),
        new productModel({
            model: "Yo Yo Carabiner Hangers",
            type: 'Accessory',
            altTypeNames: ['Accessory', 'accessories', 'goodies'],
            promotionalImages: {
                productPageSlider: [
                    { src: 'https://cdn.shopify.com/s/files/1/0736/5273/products/yo_yo.jpg?v=1503584751' },
                    { src: 'https://cdn.shopify.com/s/files/1/0736/5273/products/led_grow_light_glass3_1.jpg?v=1503583912' },
                    { src: 'https://cdn.shopify.com/s/files/1/0736/5273/products/led_grow_light_glass_2_1.jpg?v=1503583928' },
                    { src: 'https://cdn.shopify.com/s/files/1/0736/5273/products/3.jpg?v=1503584751' }
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