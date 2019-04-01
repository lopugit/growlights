import circularJSON from 'circular-json'
import firebase from 'firebase'
import '@firebase/firestore'
var fs = initFirestore()
var s = require('smarts')()
export const setSchema = (state, payload) => {
	if(payload && payload.id){
		state.schemas[payload.id] = payload
	}
}

export const feedback = (state, payload) => {
	/** 
	 * @param @var payload is a feedback object
	 * @param @var payload.message
	 * @param @var payload.success
	 * @param @var payload.type is the feedback type
	 */
	state.feedback.push(payload.feedback)
}

export const removefeedback = (state, payload) => {
	/**
	 * @param @var payload is the index of the feedback list item to be removed
	 */
	if(typeof payload == 'number'){
		state.feedback.splice(payload, 1)
	}
	
}

export const dialog = (state, payload) => {
	/** 
	 * @param @var payload is a dialog object
	 * @param @var payload.message
	 * @param @var payload.success
	 * @param @var payload.type is the dialog type
	 */
	state.dialog.push(payload.dialog)
}

export const removedialog = (state, payload) => {
	/**
	 * @param @var payload is the index of the dialog list item to be removed
	 */
	if(typeof payload == 'number'){
		state.dialog.splice(payload, 1)
	}
	
}

export const registerable = (state, payload) => {
	if(typeof payload == 'boolean' || payload == 'haventchecked'){
		state.registerable = payload
	}
}

export const entity = (state, payload) => {
	if(payload.entity){
		if(payload.merge){
			Object.assign(state.entity, payload.entity)
		} else {
			state.entity = payload.entity
		}
	}
}

export const userAgent = (state, payload) => {
	state.userAgent = payload
}

export const updateEntityUserAgent = (state, payload) => {
	var id = s.gosmart(state, 'entity.firestore.id', s.getsmart(state, 'entity.ids.id-firestore', undefined))
	if(id){
		s.setsmart(state, 'entity.loggedIn.'+payload, true)
		var things = fs.collection('things')
		let ref = things.doc(id)
		ref.set(state.entity)
		.then(()=>{
			
		})
		.catch(err=>{
			console.error('something went wrong updating the loggedIn userAgent: ', err)
		})
	} else {
		// s.setsmart(state, 'entity.loggedIn.'+payload, false)
	}
}

export const env = (state, payload) => {
	state.env = payload
}

export const clientId = (state, payload) => {
	state.clientId = payload
}
/** HELPER FUNCTIONS */
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
		// fs.SetOptions = {merge: true}
		return fs

	}

