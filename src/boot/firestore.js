// /src/plugins/firestore.js
// import something here
import firebase from 'firebase'
import '@firebase/firestore'
var fs = initFirestore()

window.$fs = fs

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
	var firebaseApp
	if(!firebase.apps.length){
		firebaseApp = firebase.initializeApp(config)
	} else {
		firebaseApp = firebase.app()
  }
  Vue.prototype.$fs = fs
}

function initFirestore(){
  let smarts = require('smarts')()
  const config = smarts.getsmart(window, 'env.level', 'dev') == 'prod' ? {
    apiKey: "AIzaSyCEk1mYB5aXFjYZUzwhyTF-blYDrIDqTRk",
    authDomain: "lopu-f3969.firebaseapp.com",
    databaseURL: "https://lopu-f3969.firebaseio.com",
    projectId: "lopu-f3969",
    storageBucket: "lopu-f3969.appspot.com",
    messagingSenderId: "278663639558"
  } : smarts.getsmart(window, 'env.level', 'dev') == 'dev' ? {
    apiKey: "AIzaSyABsQrdpY9lNkyBW0me5xHmbCxSUPIjGgU",
    authDomain: "lopudev-b405a.firebaseapp.com",
    databaseURL: "https://lopudev-b405a.firebaseio.com",
    projectId: "lopudev-b405a",
    storageBucket: "lopudev-b405a.appspot.com",
    messagingSenderId: "278663639558"
  } : {
    apiKey: "AIzaSyABsQrdpY9lNkyBW0me5xHmbCxSUPIjGgU",
    authDomain: "lopudev-b405a.firebaseapp.com",
    databaseURL: "https://lopudev-b405a.firebaseio.com",
    projectId: "lopudev-b405a",
    storageBucket: "lopudev-b405a.appspot.com",
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
