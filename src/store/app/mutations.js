import circularJSON from 'circular-json'
let smarts = require('smarts')()
export const interactionStarted = (state, payload) => {
	state.interactionStarted = payload
}

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

export const leftSidebar = (state, val) => {
	if(typeof val == 'boolean'){
		state.leftSidebar = val
	}
}

export const entity = (state, val) => {
	state.entity = val
}

export const pageHistory = (state, val) => {
	state.pageHistory = val
}

export const thing = (state, args) => {
	if(args.path && args.val){
		smarts.setsmart(state, args.path, args.val)
	}
}