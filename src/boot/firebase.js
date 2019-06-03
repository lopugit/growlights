// /src/plugins/firestore.js
// import something here
import firebase from 'firebase'
let smarts = require('smarts')()

window.$fb = firebase

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
	var firebaseApp
	if(!smarts.getsmart(firebase, 'apps.length', 0) && smarts.getsmart(window, 'env.firebaseConf', undefined)){
		firebaseApp = firebase.initializeApp(smarts.getsmart(window, 'env.firebaseConf', undefined))
	} else {
		firebaseApp = firebase.app()
	}
	firebase.auth().useDeviceLanguage()
	// window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
	// 	'size': 'invisible',
	// 	'callback': function(response) {
	// 		// reCAPTCHA solved, allow signInWithPhoneNumber.
	// 		onSignInSubmit();
	// 	}
	// })
  Vue.$fb = firebase
}
