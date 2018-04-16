var mongoose = require('mongoose');
dbconf = require('secrets')
dbconf = dbconf.mongodb
let uri = "mongodb://" + (dbconf.auth ? dbconf.username + ":" + dbconf.password + "@" : '') + dbconf.server + ":" + dbconf.port + "/" + dbconf.db + (dbconf.auth ? "?authSource="+dbconf.authDb+"" : '')
let options = { useMongoClient: true }
let db = mongoose.createConnection(uri, options)

var Schema = mongoose.Schema;
var write = true

var likesSchema = new Schema({
    place: { type: String, default: null },
    likes: { type: Number, default: 0 }
})


var likes = db.model('likes', likesSchema)
var frontPageLikes = new likes({
    place: "front page",
    likes: 12
})

if (write)
    likes.remove({}).then(function() {
        frontPageLikes.save()
    })

module.exports = likes