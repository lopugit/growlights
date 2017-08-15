var express = require("express")
var app = express()
fs = require('fs')
path = require('path')
bodyParser = require('body-parser')
url = require('url')
shopify = require('shopify-buy')
nodemailer = require('nodemailer')
pug = require('pug')
client = shopify.buildClient({
    accessToken: '30197388c16741334138de5dd1de3f1a',
    domain: 'my-leisure.myshopify.com',
    appId: '6'
})
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
app.locals.deploy = "local"
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
var product = require('./models/CMS/shopifyDupe.js')
var models = new Promise((resolve, reject) => {
    product.then(model => {
            console.log('here2');
            // console.log(res.locals)
            model.find({
                    type: 'Grow Light'
                }).exec()
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
                            for (product in products) {
                                if (products[product].model == modelsList[model]) {
                                    models[model].push(products[product])
                                }
                            }
                        }
                        resolve(models)
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


var importShopifyProducts = require('./scripts/importShopifyProducts')(product)
    // }
    ////// FUNCTIONS AND GLOBAL VARIABLES
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
                console.log('here1');
                return
            } else {
                console.log('here1');
                res.locals.likes = mainPageLikes[0].likes
                return
            }
        })
        .then(function() {
            console.log("doing this")
            console.log(models)
            return models.then(Models => {
                    console.log("these are the Models")
                    console.log(Models)
                    res.locals.models = Models
                    return
                }).catch(function() {
                    res.locals.models = []
                    return
                })
                // return product.then(model => {
                //     console.log('here2');
                //     // console.log(res.locals)
                //     return model.find({
                //             type: 'Grow Light'
                //         }).exec()
                //         .then((products, err) => {
                //             if (!err) {
                //                 var modelsList = []
                //                 for (product in products) {
                //                     if (modelsList.indexOf(products[product].model) < 0) {
                //                         modelsList.push(products[product].model)
                //                     }
                //                 }
                //                 var models = []
                //                 for (model in modelsList) {
                //                     models[model] = []
                //                     for (product in products) {
                //                         if (products[product].model == modelsList[model]) {
                //                             models[model].push(products[product])
                //                         }
                //                     }
                //                 }
                //                 res.locals.models = models
                //                 console.log("this is models")
                //                 console.log(models)
                //                 console.log("this is modelsList")
                //                 console.log(modelsList)
                //                 return
                //             }
                //             /*
                //             SHOW TOMMY THE REFACTORING
                //             */
                //             // if (!err) {
                //             //     var models = []
                //             //     var key = 0
                //             //     var subCount = 0
                //             //     for (var i = 0; i < products.length; i++) {

            //             //         var currentModel = products[i].model
            //             //         if (i == 0) {
            //             //             models[key] = []
            //             //             models[key].push(products[i])
            //             //         } else if (models[key][subCount].model == currentModel) {
            //             //             models[key].push(products[i])
            //             //         } else {
            //             //             for (j in models) {
            //             //                 if (models[j][0] == products[i].model) {
            //             //                     key = j
            //             //                     models[key].push(products[i])
            //             //                     currentModel = products[i].model
            //             //                     return
            //             //                 } else {
            //             //                     key += 1
            //             //                     models[key] = []
            //             //                     models[key].push(products[i])
            //             //                     currentModel = products[i].model
            //             //                 }
            //             //             }
            //             //         }
            //             //         if (i == (products.length - 1)) {
            //             //             res.locals.models = models
            //             //             return
            //             //         }
            //             //     }
            //             //     // console.log(models);
            //             //     // res.render('pages/home')
            //             // } 
            //             else {
            //                 console.error(err)
            //                 return
            //             }
            //         })
            // })

        })
        .then(function() {
            var customLocals = res.locals
            customLocals.basedir = path.join(__dirname, 'views')
                // console.log(pug.renderFile('views/pages/home.pug', customLocals))

            res.render('pages/home')
        })

})
app.get('/pages/:page', function(req, res) {
    res.render('pages/' + req.params.page)
})
app.get('/products/:product', function(req, res) {

    res.render('pages/products/' + req.params.product)

})
app.get('/products/:product/:variant', function(req, res) {

    res.locals.variant = req.params.variant
    res.render('pages/products/' + req.params.product)
        // res.render('pages/products/'+req.params.product)

})
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

    console.log(req.body.name)

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
                console.log("app(.)get /login req.session.user")
                console.log(req.session.user)
                res.locals.user = req.session.user
                res.redirect('/home')
            }
        })
    } else {
        res.render('admin/login')
    }
})
app.post('/login', function(req, res) {

    // console.log(req.session)
    console.log("app.post('/login req.session')")
    console.log(req.session)

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
        product.then(function(productModel) {
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

//// APP LISTENER FOR CLIENTS
var port = 1337
app.listen(port, () => console.log("listening on port %s", port))