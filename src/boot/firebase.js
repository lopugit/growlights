// /src/plugins/firestore.js
// import something here
import firebase from 'firebase'
let smarts = require('smarts')()

var firebaseApp
let fbApps = smarts.getsmart(firebase, 'apps.length', 0)
let conf = smarts.getsmart(window, 'env.firebaseConf', undefined)
if(!fbApps && conf){
  firebaseApp = firebase.initializeApp(conf)
} else {
  firebaseApp = firebase.app()
}
firebase.auth().useDeviceLanguage()

window.$fb = firebase

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
	// window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
	// 	'size': 'invisible',
	// 	'callback': function(response) {
	// 		// reCAPTCHA solved, allow signInWithPhoneNumber.
	// 		onSignInSubmit();
	// 	}
	// })
  Vue.prototype.$fb = firebase
}
