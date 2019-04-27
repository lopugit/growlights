import Vue from 'vue'
import Vuex from 'vuex'
import CPS from 'vuex-persistedstate'
import app from './app'

Vue.use(Vuex)
window.clear = function(){localStorage.removeItem('vuex');console.log('done')}
// window.clear()



const Store = new Vuex.Store({
	modules: {
		app,
	},
	plugins: [
		CPS({
			paths: ['app']
		})
	]
})
// localStorage.removeItem('vuex')
window.$Store = Store
window.$store = Store
export default Store
