// /src/plugins/firestore.js
// import something here
import firebase from 'firebase'
import '@firebase/firestore'
var fs = initFirestore()

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
	var firebaseApp
	if(!firebase.apps.length){
		firebaseApp = firebase.initializeApp(config)
	} else {
		firebaseApp = firebase.app()
	}
	Vue.$fs = fs
}

function initFirestore(){
	const config = {
		apiKey: "AIzaSyATXH6vwwHRsd3amszUgFW3DEplHr7dIgQ",
		authDomain: "alopu-cms.firebaseapp.com",
		databaseURL: "https://alopu-cms.firebaseio.com",
		projectId: "alopu-cms",
		storageBucket: "alopu-cms.appspot.com",
		messagingSenderId: "278663639558"
	}
	const settings = {
		// timestampsInSnapshots: true
	}

	if(!firebase.apps.length){
		firebase.initializeApp(config)
	} else {
		// F = firebase.app()
	}
	var fs = firebase.firestore() // firestore
	fs.settings(settings)
	fs.SetOptions = {merge: true}
	return fs

}