var compression = require('compression')
//var sitemap = require('express-sitemap')()
var express = require("express")
var app = express()
//sitemap.generate(app)
//sitemap.XMLtoFile(['/sitemap.xml'])
app.use(compression())
fs = require('fs')
path = require('path')
bodyParser = require('body-parser')
url = require('url')
shopify = require('shopify-buy')
nodemailer = require('nodemailer')
pug = require('pug')
var http = require('http').Server(app)
var io = require('socket.io')(http)
var session = require('express-session')
bcrypt = require('bcryptjs')
moment = require('moment')
forms = require('mongoose-forms')
var Form = forms.Form
Bridge = forms.Bridge
RedisStore = require('connect-redis')(session)
emailConf = require('./conf/email')

//Set App Local Variables
app.locals.deploy = "live"
    ///// SET BODY PARSER CONFIG
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
        extended: false
    }))
    /// SET SESSION CONFIG
app.use(
        session({
            name: "ozled.sid",
            secret: "4378vbh43o87gvb34wovb34o87gb4rybv3go43efgfg4gfg4fgboue78234ergfoh",
            resave: false,
            saveUninitialized: false,
            store: new RedisStore({
                host: 'localhost',
                port: 6379,
                ttl: 260
            })
        })
    )
    //// SET VIEW ENGINE PUG/JADE
app.set('view engine', 'pug')
    //// Allows use of /snippets and absolute paths in jade includes
app.locals.basedir = path.join(__dirname, 'views')
    /////// MONGODB AND MONGOOSE THINGS
var MongoClient = require('mongodb')
mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
var db = mongoose.createConnection("mongodb://localhost:27017/ozledgrowlights")
var nodes = mongoose.createConnection("mongodb://localhost:27017/nodes")
    ////////// LOAD MODELS
var mainModels = require('./models')
var adminModels = require('./models/admin')
var likes = mainModels.likes
var user = adminModels.user
var productModelsModel = require('./models/CMS/productModels')
var productsModel = require('./models/CMS/products')
var growLightsModel = require('./models/CMS/growLights.js')
var products = require('./models/CMS/growLights.js')
require('./scripts/importGrowLightsFromShopify.js')({ model: growLightsModel, type: 'Grow Light' })

var growLightModels = new Promise((resolve, reject) => {
    growLightsModel.then(model => {
            var productType = 'Grow Light'
            model.find({
                    product_type: 'Grow Light'
                }).sort({ 'wattage': 1 }).exec()
                .then((products, err) => {
                    if (!err) {
                        var modelsList = {
                                commerce: [],
                                custom: {}
                            }
                            // var key = 0
                        var models = {
                            commerce: [],
                            custom: {}
                        }
                        for (product in products) {
                            if (modelsList.commerce.indexOf(products[product].model) < 0) {
                                if (products[product].vendor !== 'ozled') {
                                    modelsList.commerce.push(products[product].model)
                                } else if (products[product].vendor == 'ozled') {
                                    models.custom[products[product].model] = products[product]
                                }

                                // modelsList.push([products[product].model, key])
                                // key += 1
                            }

                        }
                        productModelsModel.find({ type: productType }).then((modelsFromMongo, err) => {
                            if (!err) {
                                if (modelsFromMongo) {
                                    for (index in modelsFromMongo) {
                                        var model = modelsFromMongo[index].model
                                        if (modelsFromMongo.hasOwnProperty(index)) {
                                            models.commerce[index] = []
                                            for (product in products) {
                                                if (products.hasOwnProperty(product)) {
                                                    if (products[product].model == modelsFromMongo[index].model) {
                                                        modelsFromMongo[index].products.push(products[product])
                                                    }
                                                }
                                            }
                                            models.commerce[index] = modelsFromMongo[index]

                                        }
                                    }
                                    resolve(models)
                                }
                            }
                        })
                    } else {
                        console.error(err)
                        resolve([])
                    }
                })
        })
        .catch(() => {
            console.error("there was an error .thening the growLights model")
            resolve([])
        })
})

var growTentsModel = require('./models/CMS/growTents.js')
require('./scripts/importGrowTentsFromShopify.js')({ model: growTentsModel, type: 'Grow Tent' })

var growTentModels = new Promise((resolve, reject) => {
    growTentsModel.then(model => {
            var productType = 'Grow Tent'
            model.find({
                    product_type: productType
                }).sort({ 'width': 1 }).exec()
                .then((products, err) => {
                    if (!err) {
                        var modelsList = []
                            // var key = 0
                        for (product in products) {
                            if (modelsList.indexOf(products[product].model) < 0) {
                                modelsList.push(products[product].model)
                                    // modelsList.push([products[product].model, key])
                                    // key += 1
                            }

                        }
                        var models = []
                        for (model in modelsList) {
                            models[model] = []
                            productModelsModel.find({ type: productType }).then((modelsFromMongo, err) => {
                                if (!err) {
                                    if (modelsFromMongo) {
                                        for (index in modelsFromMongo) {
                                            var model = modelsFromMongo[index].model
                                            if (modelsFromMongo.hasOwnProperty(index)) {
                                                models[index] = []
                                                for (product in products) {
                                                    if (products.hasOwnProperty(product)) {
                                                        if (products[product].model == modelsFromMongo[index].model) {
                                                            modelsFromMongo[index].products.push(products[product])
                                                        }
                                                    }
                                                }
                                                models[index] = modelsFromMongo[index]

                                            }
                                        }
                                        resolve(models)
                                    }
                                }
                            })
                        }
                    } else {
                        console.error(err)
                        resolve([])
                    }
                })
        })
        .catch(() => {
            resolve([])
        })
})

var accessoriesModel = require('./models/CMS/accessories.js')
require('./scripts/importAccessoriesFromShopify.js')({ model: accessoriesModel, type: 'Accessory' })
var accessories = new Promise((resolve, reject) => {
        accessoriesModel.then(model => {
                var productType = 'Accessory'
                model.find({ product_type: productType }).then((accessories, err) => {
                        if (!err) {
                            var models = []
                            productModelsModel.find({ type: productType }).then((modelsFromMongo, err) => {
                                if (!err) {
                                    if (modelsFromMongo) {
                                        for (index in modelsFromMongo) {
                                            var model = modelsFromMongo[index].model
                                            if (modelsFromMongo.hasOwnProperty(index)) {
                                                models[index] = []
                                                modelsFromMongo[index].products = accessories
                                                models[index] = modelsFromMongo[index]

                                            }
                                        }
                                        resolve(models)
                                    } else {
                                        reject("somethign went wrong saving accessory models and shit")
                                    }
                                } else {
                                    reject("somethign went wrong saving accessory models and shit")
                                }
                            })
                        }
                    })
                    .catch(() => {
                        reject("something went wrong")
                    })
            })
            .catch(() => {
                reject("something went wrong")
            })
    })
    //// FUNCTIONS AND GLOBAL VARIABLES
var allProducts = new Promise((resolve, reject) => {
    productsModel.find({}).then((products1, err1) => {
            productsModel.find({}).then((productsList, err) => {

                if (!err) {
                    if (productsList) {
                        for (prodCount in productsList) {
                            if (productsList.hasOwnProperty(prodCount)) {

                                if (productsList[prodCount].type == 'Grow Light') {
                                    var subCount = prodCount
                                    growLightModels.then((Models) => {
                                        Models.commerce.forEach((glModelObj, glModel) => {
                                            if (Models.commerce.hasOwnProperty(glModel)) {
                                                productsList[subCount].models[glModel] = Models.commerce[glModel]
                                                Models.commerce[glModel].products.forEach((glObj, gl) => {
                                                    if (Models.commerce[glModel].products.hasOwnProperty(gl)) {
                                                        productsList[subCount].products.push(Models.commerce[glModel].products[gl])
                                                    }
                                                })
                                            }
                                        })
                                    })
                                } else if (productsList[prodCount].type == 'Grow Tent') {
                                    var subCount2 = prodCount
                                    growTentModels.then((models) => {
                                        models.forEach((modelObj, model) => {
                                            if (models.hasOwnProperty(model)) {
                                                productsList[subCount2].models.push(models[model])
                                                models[model].products.forEach((productObj, tentCount) => {
                                                    if (models[model].products.hasOwnProperty(tentCount)) {
                                                        productsList[subCount2].products.push(models[model].products[tentCount])
                                                    }
                                                })
                                            }
                                        })
                                    })
                                } else if (productsList[prodCount].type == 'Accessory') {
                                    var subCount3 = prodCount
                                    accessories.then((Accessories) => {
                                        productsList[subCount3].models = Accessories
                                        Accessories.forEach((acc, accessoryModel) => {
                                            if (Accessories.hasOwnProperty(accessoryModel)) {
                                                Accessories[accessoryModel].products.forEach((accObj, accessoryProduct) => {
                                                    if (Accessories[accessoryModel].products.hasOwnProperty(accessoryProduct)) {
                                                        productsList[subCount3].products.push(Accessories[accessoryModel].products[accessoryProduct])
                                                    }
                                                })
                                            }
                                        })
                                    })
                                } else {
                                    console.error("nuff")
                                }

                            }
                        }
                        resolve(productsList)
                    }
                }
            })
        })
        .catch(() => {
            reject("something went wrong making all products object")
        })
})

function search(prop, value, array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][prop] === value) {
            return array[i]
        }
    }
}
/// SET PERSISTENT LOGIN MIDDLEWARE AND FUNCTIONS
app.use(function(req, res, next) {
    if (req.session && req.session.user) {
        user.findOne({
            username: req.session.user.username
        }, function(err, user) {
            if (user) {
                // req.user = user
                req.session.user = user
                delete req.session.user.password
                res.locals.user = req.session.user
            }
            next()
        })
    } else {
        next()
    }
})

app.use((req, res, next) => {
    res.locals.uuidv4 = require('uuid/v4')
    next()
})

function reqLog(req, res, next) {
    if (!req.session.user) {
        res.redirect('/login')
    } else {
        next()
    }
}
////// SET PROJECT PUBLIC FOLDERS
app.use('/styles', express.static(__dirname + '/styles'))
app.use('/js', express.static(__dirname + '/js'))
app.use('/img', express.static(__dirname + '/img'))
app.use('/fonts', express.static(__dirname + "/fonts"))
    ////888################################ ROUTES #######################################333\\\\
app.use('/public', express.static(__dirname + "/public"))
    ////888################################ ROUTES #######################################333\\\\
app.get('/(|home|index)', function(req, res) {
        likes.find({
                place: "front page"
            }).exec()
            .then((mainPageLikes, err) => {
                if (!mainPageLikes) {
                    res.locals.likes = 12
                    return
                } else {
                    res.locals.likes = mainPageLikes[0].likes
                    return
                }
            })
            .then(function() {
                return accessories.then(sessories => {
                    res.locals.accessories = sessories[0]
                    res.locals.accessories.noCarousel = true
                    return
                })
            })
            .then(function() {
                return growLightModels.then(models => {
                    res.locals.growLightModels = models
                    return
                }).catch(function() {
                    res.locals.growLightModels = []
                    return
                })

            })
            .then(function() {
                return growTentModels.then(models => {
                    res.locals.growTentModels = models
                    return
                }).catch(err => {
                    console.error("there was an error getting the grow tent models")
                    console.error(err)
                    return
                })
            })
            .then(function() {
                res.render('pages/home')
            })

    })
    // app.get('/pages/:page', function(req, res) {
    //     res.render('pages/' + req.params.page)
    // })
app.get('/(|products/)(|growlight|growlights|ledgrowlight|ledgrowlights)(|/:model|/:model/:product)', (req, res) => {
    console.log(req.params)
    if (!req.params.model) {
        growLightModels.then(models => {
            res.locals.growLightModels = models
            res.render('snippets/grow.ai/growlights')
        })
    } else {
        allProducts.then(allprods => {
            // console.log(allprods)
            for (productType in allprods) {
                if (allprods.hasOwnProperty(productType)) {
                    // console.log(allprods)
                    var prodType = allprods[productType].type.toLowerCase().replace(' ', '')
                    if (prodType == 'growlight' || prodType + "s" == 'growlight' || prodType == 'growlight' + "s" || prodType.slice(prodType.length - 2) + "ies" == 'growlight' || prodType == 'growlight'.slice('growlight'.length - 2) + "ies" || prodType.slice(prodType.length - 5) + "y" == 'growlight' || prodType == 'growlight'.slice('growlight'.length - 5) + "y") {
                        var models = allprods[productType].models
                        for (model in models) {
                            if (models.hasOwnProperty(model)) {
                                if (models[model].products && models[model].products[0] && models[model].products[0].model.toLowerCase().replace(' ', '') == req.params.model.toLowerCase()) {
                                    res.locals.model = models[model]
                                    if (req.params.product) {
                                        for (product in models[model].products) {
                                            if (models[model].products.hasOwnProperty(product)) {
                                                console.log(models[model].products[product].title)
                                                if (models[model].products[product].title && models[model].products[product].title.toLowerCase().replace(' ', '').indexOf(req.params.product) > -1) {
                                                    res.locals.productId = models[model].products[product]._id
                                                }
                                            }
                                        }
                                    }
                                    res.render('snippets/products/modelPage')
                                    return
                                }
                            }
                        }
                    }
                }
            }
        })
    }
})
app.get('/(|products/)(|growtents|tents|growtent|tent|growroom|growrooms|room|rooms)(|/:model)', (req, res) => {
    console.log(req.params)
    growTentModels.then(tentModels => {
        res.locals.growTentModels = tentModels
        growLightModels.then(glModels => {
            res.locals.growLightModels = glModels
            if (!req.params.model) {
                res.render('snippets/grow.ai/growtents')
            } else {
                console.log("we get to here right?")
                tentModels.forEach((model, index1) => {
                    console.log(model)
                    model.products.forEach((product, index2) => {
                        console.log(product)
                        if (product.title && product.title.toLowerCase().replace(' ', '').indexOf(req.params.model) > -1) {
                            res.locals.productId = product._id
                        }
                    })
                })
                res.render('snippets/grow.ai/growtents')
            }
        })
    })


})
app.get('/(|products/)(|extras|goodies|accessories|addons)(|/:model)', (req, res) => {
        accessories.then(sessories => {
            console.log(sessories)
            res.locals.product = sessories[0]
            res.locals.product.noCarousel = true
            if (!req.params.model) {
                res.render('snippets/products/productPage')
            } else {
                sessories[0].products.forEach((product, index2) => {
                    console.log(product.title)
                    console.log(req.params.model)
                    if (product.title && product.title.toLowerCase().replace(' ', '').indexOf(req.params.model) > -1) {
                        res.locals.productId = product._id
                    }
                })
                res.render('snippets/products/productPage')
            }
        })
    })
    // app.get('/products(|/:productType|/:productType/:model)', function(req, res) {
    //         console.log(req.params)
    //         if (req.params.productType) {
    //             // products.then(model=>{
    //             //     model.find({product_type: req.params.productType})
    //             // })
    //             console.log(req.params.productType)
    //             productsModel.findOne({ normalAltTypeNames: { $in: [req.params.productType] } }).exec().then((product, err) => {
    //                 if (!err && product) {
    //                     products.find({ type: product.type }).exec().then((products, err) => {
    //                         if (!err && products) {
    //                             productModelsModel.find({ type: product.type }).exec().then((models, err) => {
    //                                     if (!err & models) {
    //                                         res.locals.models = models
    //                                         res.locals.products = products
    //                                         res.render('snippets/products/productPage')
    //                                     }
    //                                 })
    //                                 // if (req.params.model) {

//                             // } else {
//                             // }
//                         }
//                     })
//                 }
//             })
//         }
//         // allProducts.then(allprods => {
//         //     // console.log(allprods)
//         //     for (productType in allprods) {
//         //         if (allprods.hasOwnProperty(productType)) {
//         //             // console.log(allprods)
//         //             var prodType = allprods[productType].type.toLowerCase().replace(' ', '')
//         //             if (prodType == req.params.productType || prodType + "s" == req.params.productType || prodType == req.params.productType + "s" || prodType.slice(prodType.length - 2) + "ies" == req.params.productType || prodType == req.params.productType.slice(req.params.productType.length - 2) + "ies" || prodType.slice(prodType.length - 5) + "y" == req.params.productType || prodType == req.params.productType.slice(req.params.productType.length - 5) + "y") {
//         //                 var models = allprods[productType].models
//         //                 for (model in models) {
//         //                     if (models.hasOwnProperty(model)) {
//         //                         if (models[model].products && models[model].products[0].model.toLowerCase().replace(' ', '') == req.params.model.toLowerCase()) {
//         //                             res.locals.model = models[model]
//         //                             res.render('snippets/products/modelPage')
//         //                             return
//         //                         }
//         //                     }
//         //                 }
//         //             }
//         //         }
//         //     }
//         // })
//     })
// app.get('/products/:product/:variant', function(req, res) {

//     res.locals.variant = req.params.variant
//     res.render('pages/products/' + req.params.product)
//         // res.render('pages/products/'+req.params.product)

// })
app.get('/contact*', function(req, res) {
        var page = url.parse(req.url).pathname
        res.render('pages/contact')
    })
    /////////// CONTACT US FORM HANDLER
app.post('/contact*', function(req, res) {

    var mailOpts, smtpTrans

    //Setup Nodemailer transport, I chose gmail. Create an routerlication-specific password to avoid problems.
    smtpTrans = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                // xoauth2: xoauth2.createXOAuth2Generator({
                user: emailConf.email,
                pass: emailConf.password
                    // })
            }
        })
        //Mail options
    mailOpts = {
        from: req.body.name + ' &lt' + req.body.email + '&gt', //grab form data from the request body object
        to: 'info@ozledgrowlights.com.au',
        subject: 'Website contact form',
        text: "Name: " + req.body.name + "\n Phone: " + req.body.phone + "\n Email: " + req.body.email + "\n" + req.body.message
    }


    smtpTrans.sendMail(mailOpts, function(error, response) {

        if (error) {
            res.sendStatus(500)
        } else {
            res.sendStatus(200)
        }

    })

})

//// LOGIN AND REGISTRATION AND DASHBOARD
app.get('/login*', function(req, res) {
    if (req.session && req.session.user) {
        user.findOne({
            username: req.session.user.username
        }, function(err, user) {
            if (!user) {
                req.session.destroy()
                res.render('snippets/admin/login')
            } else {
                res.locals.user = req.session.user
                res.redirect('/home')
            }
        })
    } else {
        res.render('admin/login')
    }
})
app.post('/login', function(req, res) {


    user.findOne({
        $or: [{
                username: req.body.username
            },
            {
                email: req.body.username
            }
        ]
    }, function(err, user) {
        if (err) {
            res.send(err)
        } else if (!user) {
            res.render('admin/login', {
                error: "You are not in our system, please <a href='/register'>register</a> to login"
            })
        } else if (bcrypt.compareSync(req.body.password, user.password)) {
            req.session.user = user
            delete req.session.user.password
            res.locals.user = req.user
            res.redirect("/home")
        } else {
            res.locals.error = "Your password was incorrect"
            res.render('admin/login')
        }
    })
})
app.get('/dashboard', reqLog, function(req, res) {
    Blog.find({
        'editors': req.session.user.username
    }, function(err, blogs) {
        res.locals.blogCount = blogs.length
        res.locals.blogs = blogs
        return true
    }).exec().then(function() {
        products.then(function(productModel) {
            productModel.find({}, function(err, products) {
                res.locals.products = products
                res.locals.productCount = products.length
                res.render('CMS/dashboard')
            })
        })
    })
})
app.post('/dashboard', reqLog, function(req, res) {
    Blog.findById(req.body.blogId, function(err, blog) {
        res.locals.blog = blog
    }).then(function() {
        res.locals.form = Form(res.locals.blog)
    }).then(function() {
        var blogForm = Bridge(res.locals.blog, res.locals.form).getForm()
        res.status(200).send(res.locals)

    })
})
app.get('/admin', reqLog, function(req, res) {

    res.redirect('/Dashboard')

})
app.get('/register*', function(req, res) {

    if (req.session && req.session.user) {
        user.findOne({
            username: req.session.user.username
        }, function(err, user) {
            if (!user) {
                req.session.destroy()
                res.render('admin/register')
            } else {
                res.locals.user = req.session.user
                res.redirect('/Dashboard')
            }
        })
    } else {
        res.render('admin/register')
    }

})
app.post('/register', function(req, res) {
    if (req.body.password === req.body.confirmPassword) {
        var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12))
        var newUser = new user({
            firstName: req.body.firstName.toLowerCase(),
            lastName: req.body.lastName.toLowerCase(),
            username: req.body.username,
            password: hash,
            email: req.body.email.toLowerCase(),
            luckyNumber: req.body.luck
        })
        newUser.save(function(err) {
            if (err) {
                var error = 'Something bad happened :O' + err
                if (err.code === 11000) {
                    res.locals.error = 'The email or username you specified is already in use, please try another'
                }
                res.render('admin/register')
            } else {
                req.session.user = newUser
                delete req.session.user.password
                res.locals.user = req.session.user
                res.redirect('/home')
            }
        })
    } else {
        res.locals.error = 'Your passwords did not match'
        res.render('admin/register')
    }
})
app.get('/logout', function(req, res) {
    req.session.destroy()
    res.redirect('/')
})

app.get('/|404', function(req, res) {
        growLightModels.then(models => {
            res.locals.growLight = models.custom['Rainbow']
            res.render('snippets/err404')
        })
    })
    //// APP LISTENER FOR CLIENTS
var port = 1337

app.listen(port,
    console.error("listening on port %s", port)
)
