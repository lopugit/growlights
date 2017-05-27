var express = require("express")
var app = express()
		fs = require('fs')
		path = require('path')
		bodyParser = require('body-parser')
		url = require('url')
		shopify = require('shopify-buy')
		nodemailer = require('nodemailer')
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
app.use(bodyParser.urlencoded({extended: false}))
/// SET SESSION CONFIG
app.use(
	session({
		name: "myleisure.sid",
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
var User = adminModels.user
////// FUNCTIONS AND GLOBAL VARIABLES
function search(prop, value, array) {
  for (var i=0; i < array.length; i++) {
	if (array[i][prop] === value) {
	  return array[i]
	}
  }
}
/// SET PERSISTENT LOGIN MIDDLEWARE AND FUNCTIONS
app.use(function(req, res, next) {
	if (req.session && req.session.user) {
		User.findOne({ username: req.session.user.username }, function(err, user) {
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
	if(!req.session.user) {
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
app.get('/(|home|index)', function(req, res) {
	likes.find({place: "front page"}).then(function(mainPageLikes){
		if(!mainPageLikes){
			res.locals.likes = 12
			res.render('pages/home')
		} else {
			res.locals.likes = mainPageLikes[0].likes
			res.render('pages/home')
		}
	})

})
app.get('/products/:product', function(req, res) {

	res.render('pages/products/'+req.params.product)

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

  smtpTrans.sendMail(mailOpts, function (error, response) {

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
		User.findOne({username: req.session.user.username}, function(err, user) {
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

	User.findOne({$or: [
		{username: req.body.username },
		{email: req.body.username}
	]}, function(err, user) {
		if(err){
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
	Blog.find({'editors': req.session.user.username}, function(err, blogs) {
		res.locals.blogCount = blogs.length
		res.locals.blogs = blogs
		return true
	}).exec().then(function(){
		product.then(function(productModel){
			productModel.find({}, function(err, products) {
				res.locals.products = products
				res.locals.productCount = products.length
				res.render('CMS/dashboard')
			})
		})
	})
})
app.post('/dashboard', reqLog, function(req, res) {
	Blog.findById(req.body.blogId, function(err, blog){
		res.locals.blog = blog
	}).then(function(){
		res.locals.form = Form(res.locals.blog)
	}).then(function(){
		var blogForm = Bridge(res.locals.blog, res.locals.form).getForm()
		res.status(200).send(res.locals)

	})
})
app.get('/admin', reqLog, function(req, res) {

	res.redirect('/Dashboard')

})
app.get('/register*', function(req, res) {

	if(req.session && req.session.user) {
		User.findOne({ username : req.session.user.username}, function(err, user) {
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
		var newUser = new User({
			firstName: req.body.firstName.toLowerCase(),
			lastName: req.body.lastName.toLowerCase(),
			username: req.body.username,
			password: hash,
			email: req.body.email.toLowerCase(),
			luckyNumber: req.body.luck
		})
		newUser.save(function(err){
			if(err){
				var error = 'Something bad happened :O' + err
				if(err.code === 11000){
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
