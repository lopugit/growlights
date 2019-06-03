// /src/plugins/firestore.js
// import something here
import firebase from 'firebase'
import '@firebase/firestore'
let smarts = require('smarts')()
console.log(smarts.getsmart(window, 'env.level', 'dev'))

if(!smarts.getsmart(firebase, 'apps.length', 0) && smarts.getsmart(window, 'env.firebaseConf', undefined)){
  firebase.initializeApp(smarts.getsmart(window, 'env.firebaseConf', undefined))
} else {
  // F = firebase.app()
}
var fs = firebase.firestore() // firestore
const settings = {
  // timestampsInSnapshots: true
}

fs.settings(settings)
fs.SetOptions = {merge: true}

window.$fs = fs

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
	// var firebaseApp
	// if(!smarts.getsmart(firebase, 'apps.length', 0) && smarts.getsmart(window, 'env.firebaseConf', undefined)){
	// 	firebaseApp = firebase.initializeApp(smarts.getsmart(window, 'env.firebaseConf', undefined))
	// } else {
	// 	firebaseApp = firebase.app()
  // }
  Vue.prototype.$fs = fs
}


