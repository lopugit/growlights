import Vue from 'vue'
import Vuex from 'vuex'
import CPS from 'vuex-persistedstate'
import app from './app'
import alopu from './alopu'

Vue.use(Vuex)

window.CLEARVUEXLOCALSTORAGE = function(){
	localStorage.removeItem('vuex')
}

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

export default Store
