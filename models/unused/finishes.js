var MongoClient = require('mongodb');

// mongodb = MongoClient.connect('mongodb://localhost/ozledgrowlights');

var mongoose = require('mongoose');

var fs = require('fs');
var path = require('path');



// mongoose.connect("mongodb://localhost/ozledgrowlights");
//
// var db = mongoose.connection;

var Schema = mongoose.Schema;

var finishesDbSchema = new Schema({
  id: {type: String, default: "finishes"},
  name: {type: String, default: "finishes"},
  finishes: {type: [], default: null}
});

var finishSchema = new Schema({
  id: {type: String, default: null},
  name: {type: String, default: null},
  finish: {type: String, default: null},
  finishFamily: {type: String, default: null},
  tags: {type: [], default: ["all"]},
  image: {type: String, default: null},
  url: {type: String, default: null}
});

// var descriptionsDb = db.model("descriptions", descriptionsDbSchema);
var finish = db.model("finish", finishSchema);

var finishes = db.model("finishes", finishesDbSchema);


var white = new finish({
  finish: "white",
  image: "/img/finishes/white.png",
  url: "/img/finishes/white.png",
  tags: ["all", "in stock"]
});

var silver = new finish({
  finish: "silver",
  image: "/img/finishes/silver.png",
  url: "/img/finishes/silver.png",
  tags: ["all", "in stock"]
});

var bronze = new finish({
  finish: "bronze",
  image: "/img/finishes/bronze.png",
  url: "/img/finishes/bronze.png",
  tags: ["all", "in stock"]
});

var graphite = new finish({
  finish: "graphite",
  image: "/img/finishes/graphite.png",
  url: "/img/finishes/graphite.png",
  tags: ["all"]
});

var wooden = new finish({
  finish: "wooden",
  image: "/img/finishes/wooden.png",
  url: "/img/finishes/wooden.png",
  tags: ["all"]
});


var newFinishesDb = new finishes({
  id: "finishes",
  name: "finishes",
  finishes: [
    silver,
    bronze,
    white,
    graphite,
    wooden
  ]
});


var finishesDir = "./img/finishes";

var write = false;

if(write)

  finishes.remove({}, function(err, finishes) {

    if(err)
    console.log(err)

    else
      newFinishesDb.save();
  });


module.exports = finishes;
//
// if(mongoose.connection)
//   mongoose.connection.close();
