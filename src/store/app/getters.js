/*
export const someGetter = (state) => {
}
*/
const smarts = require('smarts')()

export const getUsername = (state) => {
	return smarts.getsmart(state, 'entity.username', undefined)
}

export const latestCached = (state) => {
	if(smarts.getsmart(state, 'cached.length', false)){
			let ret = state.cached[state.cached.length-1]
			if(ret && ret.constructor == Array){
					return ret
			} else {
					return []
			}
	} else {
			smarts.gosmart(state, 'cached', [])
			state.cached.push([])
			return state.cached[smarts.getsmart(state, 'cached.length', 1)-1]
	}
}

export const addressBeautified = (state, getters, rootState, rootGetters) => (args) => {
  let ret = ''
  if(args.which){
    let address = smarts.getsmart(rootState, 'app.entity.alopu.carts.0.addresses.'+args.which, {})
    let a = address
    ret = `${a['company'] ? `${a['company']}, ` : ``}${a['first name']} ${a['last name']}, ${a.line1}, ${a.city}, ${a.state}, ${a.postcode}, ${a['country']}`
  }
  return ret
}

export const cartCount = (state, getters, rootState, rootGetters) => (args) => {
  let list = smarts.gosmart(rootState, 'app.entity.alopu.carts.0.products', [])
  let count = 0
  for(var product of list){
    count += smarts.gosmart(product, 'count', 0)
  }
  return count
}

/*
export const someGetter = (state) => {
}
*/
const s = require('smarts')()

export const entity = (state) => {
	return state.entity
}

export const userAgentNormalised = (state) => {
	return state.userAgent
	// return state.userAgent.replace(/(\~)|(\*)|(\/)|(\[)|(\])/g, '')
}
//
export const username = (state, getters) => (which) => {
	var ret = 'Welcome'
	var loggedIn = s.getsmart(state, 'entity.loggedIn', {})
	if(loggedIn && loggedIn[getters.userAgentNormalised]){
		if(s.getsmart(state, 'entity.alopu.username', false)){
			ret = s.getsmart(state, 'entity.alopu.username', ret)
		}
		else if(s.getsmart(state, 'entity.google.w3.ofa', false) && ((which == 'google') || !which)) {
			ret = s.getsmart(state, 'entity.google.w3.ofa', ret)
		}
		else if(s.getsmart(state, 'entity.facebook.name', false) && ((which == 'facebook') || !which)) {
			ret = s.getsmart(state, 'entity.facebook.name', ret).split(' ')[0]
		}
	}
	return ret
}

export const ego = (state, getters) => (i) => {
	var ret = 'Green Thumb'
	var loggedIn = s.getsmart(state, 'entity.loggedIn', {})
	if(loggedIn && loggedIn[getters.userAgentNormalised]){
		if(entity.egos){

		}
	}
	return ret
}

export const cover = (state, getters) => (which) => {
	// var ret = 'statics/biologist-100-100.png'
	var ret = 'statics/circle.growlights.com.au.png'
	var loggedIn = s.getsmart(state, 'entity.loggedIn', {})
	if(loggedIn && loggedIn[getters.userAgentNormalised]){
		if(s.getsmart(state, 'entity.profilePicture', false)){

		}
		else if(s.getsmart(state, 'entity.google.w3.Paa', false) && ((which == 'google') || !which)) {
			ret = s.getsmart(state, 'entity.google.w3.Paa', ret)
		}
		else if(s.getsmart(state, 'entity.facebook.picture.data.url', false) && ((which == 'facebook') || !which)) {
			ret = s.getsmart(state, 'entity.facebook.picture.data.url', ret)
		}
	}

	return ret
}

export const loggedIn = (state, getters) => {
	var loggedIn = s.getsmart(state.entity, 'loggedIn', false)
	var loggedInHere = loggedIn[getters.userAgentNormalised]
	return loggedInHere || false
}

// export const showLogInOptions = (state, getters) => {

// }
