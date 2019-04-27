import Vue from 'vue'
import Vuex from 'vuex'
import CPS from 'vuex-persistedstate'
import app from './app'
import alopu from './alopu'

Vue.use(Vuex)
window.clear = function(){localStorage.removeItem('vuex');console.log('done')}
// window.clear()



const Store = new Vuex.Store({
	modules: {
		app,
		alopu
	},
	plugins: [
		CPS({
			paths: ['app', 'alopu']
		})
	]
})
// localStorage.removeItem('vuex')
window.$Store = Store
window.$store = Store
export default Store
