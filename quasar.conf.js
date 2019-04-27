// Configuration for your app
var path = require('path')
var fs = require('fs')
// var utils = require('utils')

module.exports = function (ctx) {
	var apiDomain = 'bld'
	if(process.env.api == 'dev'){
		apiDomain = 'src'
	} else if (process.env.api == 'build'){
		apiDomain = 'bld'
	} else if (process.env.api == 'prod'){
		apiDomain = 'com'
	}
	let apiUrl = `"https://api.alopu.${apiDomain}"`
	apiDomain = `"${apiDomain}"`
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: [
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
			'firebaseui',
			'firestore',
			'env',
			'smarts',
			'ua-parser',
			'webpackDev',
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
      gzip: true,
      analyze: true,
      // extractCSS: false,
      env: {
				apiUrl,
				apiDomain,
			},
      extendWebpack (cfg) {
        cfg.resolve.alias['@'] = path.join(__dirname, 'src')
        cfg.module.rules.push(
          {
            test: /\.(cur|ani)$/,
            loader: 'file-loader',
            options: {
                name:  path.join(__dirname, 'src', 'statics/cursors/[name].[hash:7].[ext]'),
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
      pwa: true
    },

    pwa: {
      cacheExt: 'js,html,css,ttf,eot,otf,woff,woff2,json,svg,gif,jpg,jpeg,png,wav,ogg,webm,flac,aac,mp4,mp3',
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {}, // only for NON InjectManifest
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
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
      }
    }
  }
}
