// Configuration for your app
var path = require('path')
var fs = require('fs')
var smarts = require('smarts')()

module.exports = function (ctx) {
  var apiDomain = 'src'
  let env = {}
  smarts.setsmart(env, 'level', smarts.getsmart(process, 'env.level', 'dev'))
  smarts.setsmart(env, 'apiProtocol', smarts.getsmart(env, 'level', 'dev') == 'prod' ? 'https://' : 'http://')
  smarts.setsmart(env, 'apiSubdomain', smarts.getsmart(env, 'level', 'dev') == 'prod' ? 'api.' : '')
  smarts.setsmart(env, 'apiDomain', smarts.getsmart(env, 'level', 'dev') == 'prod' ? 'growtime.' : 'localhost')
  smarts.setsmart(env, 'apiTLD', smarts.getsmart(env, 'level', 'dev') == 'prod' ? 'com.au' : ':9999')
  smarts.setsmart(env, 'apiUrl', `${env.apiProtocol}${env.apiSubdomain}${env.apiDomain}${env.apiTLD}`)
  smarts.setsmart(env, 'version', '0.0.1')
  // if env level dev
  if(smarts.getsmart(env, 'level', 'dev') == 'dev'){
    // set facebook config
    smarts.setsmart(env, 'fbAppId', '636153636865826')
    // set google client id
    smarts.setsmart(env, 'googleClientId', '211744308643-jhehqcp4ei6vd7gel2n308i9ooeer9sl.apps.googleusercontent.com')
    // set firebase credentials
  }

  // if env level prod
  else if(smarts.getsmart(env, 'level', 'dev') == 'prod'){
    // set facebook config
    smarts.setsmart(env, 'fbAppId', '1510678942401771')
    // set google client id
    smarts.setsmart(env, 'googleClientId', '299513605828-3q815bnemucsak0r8b202lkji6snkgqn.apps.googleusercontent.com')
    // set firebase credentials
    smarts.setsmart(env, 'firebaseConf', {
      apiKey: "AIzaSyCEk1mYB5aXFjYZUzwhyTF-blYDrIDqTRk",
      authDomain: "lopu-f3969.firebaseapp.com",
      databaseURL: "https://lopu-f3969.firebaseio.com",
      projectId: "lopu-f3969",
      storageBucket: "lopu-f3969.appspot.com",
      messagingSenderId: "299513605828",
      appId: "1:299513605828:web:1f42487525d73e00"
    })
  }

  // smarts.setsmart(env, 'level', `"${smarts.getsmart(env, 'level', 'dev')}"`)
  // smarts.setsmart(env, 'apiProtocol', `"${smarts.getsmart(env, 'apiProtocol', smarts.getsmart(env, 'level', 'dev') == 'prod' ? 'https://' : 'https://')}"`)
  // smarts.setsmart(env, 'apiSubdomain', `"${smarts.getsmart(env, 'apiSubdomain', smarts.getsmart(env, 'level', 'dev') == 'prod' ? 'api' : 'api')}"`)
  // smarts.setsmart(env, 'apiDomain', `"${smarts.getsmart(env, 'apiDomain', smarts.getsmart(env, 'level', 'dev') == 'prod' ? 'growtime' : 'growtime')}"`)
  // smarts.setsmart(env, 'apiTLD', `"${smarts.getsmart(env, 'apiTLD', smarts.getsmart(env, 'level', 'dev') == 'prod' ? 'com.au' : 'src')}"`)

  console.log(env)
  let ret = {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: [
			'env',
      'i18n',
      'axios',
      'circular-json',
      'vue-awesome',
      'vue-img-inputer',
      'vuedraggable',
      'vue-socket.io',
      'vue-select',
      'vue-resource',
      'vue2-medium-editor',
      'vue-uuid',
      'eventHub',
      'globalCss',
			'facebook-login',
			'google-login',
      'firebase',
      'sentience',
      // 'vue',
      // 'firebaseui',
      'permutate',
			'smarts',
			'lodash',
			'firestore',
			'ua-parser',
      'webpackDev',
      'propThings',
      // 'uuid',
			'grow.ai',
      'lopu3',
      'flatted',
      'vuelidate',
    ],
    css: [
      'app.styl'
    ],
    extras: [
      'roboto-font',
      'material-icons' // optional, you are not bound to it
      // 'ionicons-v4',
      // 'mdi-v3',
      // 'fontawesome-v5',
      // 'eva-icons'
    ],
    framework: {
      all: true, // --- includes everything; for dev only!
      // components: [
      //   'QLayout',
      //   'QHeader',
      //   'QDrawer',
      //   'QPageContainer',
      //   'QPage',
      //   'QToolbar',
      //   'QToolbarTitle',
      //   'QBtn',
      //   'QIcon',
      //   'QList',
      //   'QItem',
      //   'QItemSection',
      //   'QItemLabel'
      // ],

      // directives: [
      //   'Ripple'
      // ],

      // // Quasar plugins
      // plugins: [
      //   'Notify'
      // ]

      // iconSet: 'ionicons-v4'
      // lang: 'de' // Quasar language
    },
    supportIE: true,
    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      // vueCompiler: true,
      env: {
      },
      gzip: true,
      analyze: true,
      // extractCSS: false,
      extendWebpack (cfg) {
        cfg.resolve.alias['@'] = path.join(__dirname, 'src')
        cfg.module.rules.push(
          {
            test: /\.(cur|ani)$/,
            loader: 'file-loader',
            options: {
                name:  path.join(__dirname, 'src', 'cursors/[name].[hash:7].[ext]'),
            }
          },
				)
				cfg.module.rules.push({
					test: /\.pug$/,
					loader: 'pug-plain-loader'
				})
        // fs.writeFile('debug.js', __dirname+"\n"+JSON.stringify(cfg), err=>{
        //   if(err){
        //     console.log(err)
        //   }
        // })

      }
    },
    devServer: {
      // https: true,
      port: 1337,
      open: false // opens browser window automatically
    },
    // animations: 'all', // --- includes all animations
    animations: [],
    ssr: {
      pwa: true,
      middlewares: [
        ctx.prod ? 'compression' : '',
        'render' // keep this as last one
      ]
    },
    pwa: {
      // cacheExt: 'js,html,css,ttf,eot,otf,woff,woff2,json,svg,gif,jpg,jpeg,png,wav,ogg,webm,flac,aac,mp4,mp3',
      workboxPluginMode: 'InjectManifest',
      // workboxOptions: {}, // only for NON InjectManifest
      manifest: {
        name: smarts.gosmart(env, 'name', 'Grow Time Australia'),
        short_name: smarts.gosmart(env, 'short_name', 'Grow Time'),
        description: smarts.gosmart(env, 'description', 'The #1 place for plant growing products'),
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#42b983',
        icons: [
          {
            'src': 'icons/GrowTimeWhiteCircle128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'icons/GrowTimeWhiteCircle192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'icons/GrowTimeWhiteCircle256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'icons/GrowTimeWhiteCircle384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'icons/GrowTimeWhiteCircle512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
      // noIosLegacyBuildFlag: true // uncomment only if you know what you are doing
    },
    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack (cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      },
    }
  }

  ret.build.env.env = env

  return ret

}
