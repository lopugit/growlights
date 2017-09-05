var mongoose = require('mongoose');
var db = mongoose.createConnection("mongodb://localhost:27017/ozledgrowlights")
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