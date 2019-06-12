// /src/plugins/firestore.js
// import something here
import firebase from 'firebase'
import firebaseui from 'firebaseui'
let smarts = require('smarts')()

// if(!smarts.getsmart(firebase, 'apps.length', 0) && smarts.getsmart(window, 'env.firebaseConf', undefined)){
// 	firebase.initializeApp(smarts.getsmart(window, 'env.firebaseConf', undefined))
// } else {
// 	// F = firebase.app()
// }

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
	var firebaseApp
	if(!smarts.getsmart(firebase, 'apps.length', 0) && smarts.getsmart(window, 'env.firebaseConf', undefined)){
		firebaseApp = firebase.initializeApp(smarts.getsmart(window, 'env.firebaseConf', undefined))
	} else {
		firebaseApp = firebase.app()
	}
	var ui = new firebaseui.auth.AuthUI(firebase.auth());
  Vue.prototype.$ui = ui

	var uiConfig = {
		callbacks: {
			signInSuccessWithAuthResult: function(authResult, redirectUrl) {
				// User successfully signed in.
				// Return type determines whether we continue the redirect automatically
				// or whether we leave that to developer to handle.
				return true;
			},
			uiShown: function() {
				// The widget is rendered.
				// Hide the loader.
				// document.getElementById('loader').style.display = 'none';
			}
		},
		// Will use popup for IDP Providers sign-in flow instead of the default, redirect.
		signInFlow: 'popup',
		// signInSuccessUrl: '<url-to-redirect-to-on-success>',
		signInOptions: [
			// Leave the lines as is for the providers you want to offer your users.
			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			firebase.auth.FacebookAuthProvider.PROVIDER_ID,
			// firebase.auth.TwitterAuthProvider.PROVIDER_ID,
			// firebase.auth.GithubAuthProvider.PROVIDER_ID,
			firebase.auth.EmailAuthProvider.PROVIDER_ID,
			firebase.auth.PhoneAuthProvider.PROVIDER_ID
		],
		// Terms of service url.
		// tosUrl: '<your-tos-url>'
	};
	// ui.start('#firebaseui-auth-container', uiConfig);
}
