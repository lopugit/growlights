var MongoClient = require('mongodb');

// mongodb = MongoClient.connect('mongodb://localhost/ozledgrowlights');

var mongoose = require('mongoose');

// mongoose.connect("mongodb://localhost/ozledgrowlights");
//
// var db = mongoose.connection;


var Schema = mongoose.Schema;

var navItemSchema = new Schema({
  name: String,
  type: {type: String, default: "url"},
  url: {type: String, default: null},
  dropdowns: {type: [], default: null}
});

var navSchema = new Schema({
  id: {type: String, default: null},
  name: ({type: String, default: null}),
  indexes: {type: [], default: null},
  socials: {type: [], default: null},
  quickLinks: {type: [], default: null}
});

var navSocialSchema = new Schema({
  name: {type: String, default: "social media"},
  twitter: {
    name: {type: String, default: null},
    url: {type: String, default: null},
    connection: {type: String, default: null},
    icon: {type: String, default: null}

  },
  facebook: {
    name: {type: String, default: null},
    url: {type: String, default: null},
    connection: {type: String, default: null},
    icon: {type: String, default: null}

  },
  instagram: {
    name: {type: String, default: null},
    url: {type: String, default: null},
    connection: {type: String, default: null},
    icon: {type: String, default: null}

  },
  youtube: {
    name: {type: String, default: null},
    url: {type: String, default: null},
    connection: {type: String, default: null},
    icon: {type: String, default: null}

  },
  pintrest: {
    name: {type: String, default: null},
    url: {type: String, default: null},
    connection: {type: String, default: null},
    icon: {type: String, default: null}

  },
  linkedin: {
    name: {type: String, default: null},
    url: {type: String, default: null},
    connection: {type: String, default: null},
    icon: {type: String, default: null}
  },
  phone: {
    name: {type: String, default: null},
    connection: {type: String, default: null},
    icon: {type: String, default: null},
  },
  email: {
    name: {type: String, default: null},
    connection: {type: String, default: null},
    icon: {type: String, default: null}
  }
});


var nav = mongoose.model("nav", navSchema);
var navItem = mongoose.model("navItem", navItemSchema);
var socials = mongoose.model("socials", navSocialSchema);


var Socials = new socials({
  instagram: {
    name: "instagram",
    connect: "myleisurelettinis",
    url: "instagram.com/",
    icon: "fa-instagram"
  },
  facebook: {
    name: "facebook",
    connect: "myleisure",
    url: "facebook.com/",
    icon: "fa-facebook-official"
  },
  linkedin: {
    name: "linkedin",
    connect: "",
    url: "",
    icon: "fa-social-linkedin"
  },
  youtube: {
    name: "youtube",
    connect: "myleisure",
    url: "youtube.com/",
    icon: "fa-youtube"
  },
  pintrest: {
    name: "pintrest",
    connect: "",
    url: "pintrest.com/",
    icon: "fa-pinterest-box"
  },
  phone: {
    name: "phone",
    connect: "0406 421 708",
    url: "0406 421 708"
  },
  email: {
    name: "email",
    connect: "marietta@myleisure.com.au",
    url: "marietta@myleisure.com.au"
  }
});


var home = new navItem({
  name: "home",
  url: "/Home"
});

var aboutus = new navItem({
  name: "about us",
  url: "/AboutUs"
});

// Lettinis
var shopNow = new navItem({
  name: "shop now",
  url: "/Shop"
});

var customizeYourOwn = new navItem({
  name: "customize your own",
  url: "/Customize"
});

var coloursAndFrames = new navItem({
  name: "colours and frames",
  url: "/Design"
});

      var allAccessories = new navItem({
        name: "all accessories",
        url: "/Accessories"
      });

      var cushions = new navItem({
        name: "cushions",
        url: "/Accessories#Cushions"
      });

      var cupHolders = new navItem({
        name: "cup holders",
        url: "/Accessories#CupHolders"
      });

    var accessoriesDropdownItems = [
      allAccessories,
      cushions,
      cupHolders
    ];

var accessories = new navItem({
  name: "accessories",
  url: "/Accessories",
  type: "dropdown",
  dropdowns: accessoriesDropdownItems
});

var blog = new navItem({
  name: "blog",
  url: "/Blog"
});

var design = new navItem({
  name: "design",
  url: "/Design"
});

var contactUs = new navItem({
  name: "contact us",
  type: "button",
  url: "/ContactUs"
});

var lettiniDropdownItems = [
  shopNow,
  customizeYourOwn,
  coloursAndFrames
];

var lettinis = new navItem({
  name: "lettinis",
  url: "/Lettinis",
  type: "dropdown",
  dropdowns: lettiniDropdownItems
});

///// TOOLS
var hotelsAndResorts = new navItem({
  name: "hotels & resorts",
  url: "/Hotels"
});
var commercialLink = new navItem({
  name: "commercial"
});
var customBrandPrinting = new navItem({
  name: "custom brand printing",
  url: "/Printing"
});
var stockists = new navItem({
  name: "stockists",
  url: "/Stockists"
});
var commercialChoice = new navItem({
  name: "Commercial Choices",
  url: "/Possibilities"
});

var quickLinks = [
  commercialLink,
  customBrandPrinting,
  stockists,
  hotelsAndResorts
];
var commercialLinks = [
  stockists,
  hotelsAndResorts,
  customBrandPrinting,
  commercialChoice
];

var commercialDropdown = new navItem({
  name: "commercial",
  url: "/commercial",
  type: "dropdown",
  dropdowns: commercialLinks
});

var NavItems = [
  home,
  aboutus,
  lettinis,
  accessories,
  blog,
  commercialDropdown,
  contactUs
];


var mainNav = new nav({
  id: "main nav",
  name: "main nav",
  indexes: NavItems,
  socials: Socials,
  quickLinks: quickLinks
});



var write = false;

if(write)
  console.log("writing navs");
  nav.remove({id: "main nav"}, function(err){

    if(err)
      console.log(err)

    else
      mainNav.save();

  });

module.exports = nav;

// if(db)
//   db.close();
