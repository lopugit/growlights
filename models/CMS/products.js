var mongoose = require('mongoose');
var db = mongoose.createConnection("mongodb://localhost:27017/ozledgrowlights")
var Schema = mongoose.Schema;
var write = true

var product2Schema = new Schema({
    type: { type: String },
    altTypeNames: { type: [String] },
    normalAltTypeNames: { type: [String] },
    vendors: { type: [{}], default: [] },
    models: { type: [{}], default: [] },
    products: { type: [{}], default: [] },
    test: { type: String, default: 'product' }
})


var product2 = db.model('product2', product2Schema)
var products2 = [
    new product2({
        type: 'Grow Light',
        altTypeNames: ['Grow Light', 'grow lights', 'led grow lights', 'ledlights', 'plantlights'],
    }),
    new product2({
        type: 'Grow Tent',
        altTypeNames: ['Grow Tent', 'grow tents', 'tents', 'tent'],
    }),
    new product2({
        type: 'Accessory',
        altTypeNames: ['Accessory', 'accessories', 'goodies'],
    })
]

if (write)
    product2.remove({}).then(function() {
        products2.forEach((product, index1) => {
            // console.log('do we save any?')
            // console.log(product)
            for (var name = 0; name < product.altTypeNames.length; name++) {
                product.normalAltTypeNames.push(product.altTypeNames[name].toLowerCase().replace(/ /g, ''))
            }
            product.save().then((err, err2) => {
                // console.log("err")
                // console.log(err)
                // console.log("err2")
                // console.log(err2)
            })
        })
    })

module.exports = product2