// /src/plugins/firestore.js
// import something here
import firebase from 'firebase'

const config = {
	apiKey: "AIzaSyATXH6vwwHRsd3amszUgFW3DEplHr7dIgQ",
	authDomain: "alopu-cms.firebaseapp.com",
	databaseURL: "https://alopu-cms.firebaseio.com",
	projectId: "alopu-cms",
	storageBucket: "alopu-cms.appspot.com",
	messagingSenderId: "278663639558"
}
if(!firebase.apps.length){
	firebase.initializeApp(config)
} else {
	// F = firebase.app()
}

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
	var firebaseApp
	if(!firebase.apps.length){
		firebaseApp = firebase.initializeApp(config)
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
