import firebase from 'firebase'
import '@firebase/firestore'
let smarts = require('smarts')()
let s = smarts
var fs = initFirestore()
import circularJSON from 'circular-json'
export const interactionStarted = (state, payload) => {
	state.interactionStarted = payload
}
let uuid = require('uuid/v4')
export const addCachedState = (state, payload) => {
	console.log('caching payload')
	console.log(payload)
	if(state.cached.length >= 8){
			state.cached = state.cached.slice(state.cached.length-8,state.cached.length)
	}
	if(payload && payload.constructor == Array){
			state.cached.push(payload)
	} else {
	}
}

export const isAuthenticated = (state, payload) =>  {
	state.isAuthenticated = payload.isAuthenticated
}

export const entitySet = (state, entity) =>  {
	state.entity = entity
	// update
}

export const navSet = (state, nav) =>  {
	state.nav = nav
	// update
}

export const sandboxThingSet = (state, sandboxThing) => {
	state.ico.sandboxThing = sandboxThing
}

export const entityInventorySet = (state, entityInventory) =>  {
	state.entity.inventory = entityInventory
			// update
}

export const newAuthLog = (state, log) =>  {
	state.authLogs.push(log)
}

export const entityMessageUpdate = (state, newMsg) =>  {
	state.userMessage = newMsg
}

export const SetRealms = (state, realms) =>  {
	state.realms = realms
}

export const SetThingTypes = (state, thingTypes) =>  {
	state.thingTypes = thingTypes
}

export const addPage = (state, page) =>  {
	if (typeof page === 'string') {
			state.pageHistory.push(page)
	}
}

export const resetSandboxThing = (state, iff) => {
	if(iff){
			var schema = circularJSON.parse(circularJSON.stringify(state.ico.sandboxThingSchema))
			state.ico.sandboxThing = schema
	}
}

export const showLoginOptions = (state, val) => {
	if(typeof val == 'boolean'){
		state.showLoginOptions = val
	}
}

export const passwordConfirmation = (state, val) => {
	state.passwordConfirmation = val
}

export const pageHistory = (state, val) => {
	state.pageHistory = val
}

export const thing = (state, args) => {
  // console.log('committed: ', Date.now())
  // window.$store.state.version = uuid()
  // state.version = uuid()
  // if(!localStorage.getItem('vuexWriteLock')){
  //   state.version = Date.now()
  // }
	if(args && args.path && typeof args.val !== undefined){
		smarts.setsmart(state, args.path, args.val)
	}
}
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

export const entity = (state, payload) => {
	if(payload.entity){
		if(payload.merge){
			Object.assign(state.entity, payload.entity)
		} else {
			state.entity = payload.entity
		}
	}
}

export const updateEntityUserAgent = (state, payload) => {
	var id = s.gosmart(state, 'entity.firestore.id', s.getsmart(state, 'entity.ids.id-firestore', undefined))
	if(id){
		s.setsmart(state, 'entity.loggedIn.'+payload, true)
		var things = fs.collection(`${s.getsmart(window, 'env.level', 'dev')}/things/users`)
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
    let smarts = require('smarts')()
    const settings = {
			// timestampsInSnapshots: true
		}
    let env = process.env
		if(!smarts.getsmart(firebase, 'apps.length', 0)){
			firebase.initializeApp(smarts.getsmart(env, 'firebaseConf', undefined))
		} else {
			// F = firebase.app()
		}
		var fs = firebase.firestore() // firestore
		fs.settings(settings)
		// fs.SetOptions = {merge: true}
		return fs

	}

