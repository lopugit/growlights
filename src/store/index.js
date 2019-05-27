import Vue from 'vue'
import Vuex from 'vuex'
import CPS from 'vuex-persistedstate'
import app from './app'
import _throttle from 'lodash/throttle';
let smarts = require('smarts')()
Vue.use(Vuex)
window.clear = function(){localStorage.removeItem('vuex');console.log('done')}

// window.clear()

const Store = new Vuex.Store({
	modules: {
		app,
	},
	plugins: [
		CPS({
      paths: ['app'],
      setState: _throttle((key, state, storage) => {
        storage.setItem(key, smarts.stringify(state));
      }, 500),
      getState: (key, storage) => {
        // debug
        // let store = storage.getItem(key) || "[]"
        // let ret = smarts.parse(store)
        // return ret
        return smarts.parse(storage.getItem(key) || "[]");
      },
		})
	]
})
// localStorage.removeItem('vuex')
window.$Store = Store
window.$store = Store
export default Store
