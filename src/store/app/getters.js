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
    let address = smarts.getsmart(rootState, 'alopu.entity.alopu.carts.0.addresses.'+args.which, {})
    let a = address
    ret = `${a['company'] ? `${a['company']}, ` : ``}${a['first name']} ${a['last name']}, ${a.line1}, ${a.city}, ${a.state}, ${a.postcode}, ${a['country/region']}`
  }
  return ret
}
