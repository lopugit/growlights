var mongoose = require('mongoose');
var db = mongoose.createConnection("mongodb://localhost:27017/ozledgrowlights")
var Schema = mongoose.Schema;
var write = true

var productSchema = new Schema({
    type: String,
    models: { type: [{}], default: [] },
    vendors: { type: [{}], default: [] }
})


var product = db.model('product', productSchema)
var products = [
    new product({
        type: 'Grow Light'
    }),
    new product({
        type: 'Grow Tent'
    }),
    new product({
        type: 'Accessory'
    })
]
if (write)
    product.remove({}).then(function() {
        products.forEach((product, index1) => {
            product.save()
        })
    })

module.exports = product