import Vue from 'vue'
import Vuex from 'vuex'
import CPS from 'vuex-persistedstate'
import app from './app'
import _throttle from 'lodash/throttle';
import _debounce from 'lodash/throttle';
import merge from 'deepmerge'
let smarts = require('smarts')({})
let stateSmarts = require('smarts')({
  vue: {
    store: true
  }
}).methods
Vue.use(Vuex)
window.clear = function(){ localStorage.removeItem('vuex');console.log('done') ; smarts.setsmart(window, '$store.state.app', {})}

// window.clear()

// let stateVersion = smarts.gosmart(window, '$store.state.app.version', undefined)
// let cachedVersion = localStorage.getItem('vuexVersion')

// window.addEventListener('storage', event => {
//   let key = 'vuex'
//   if(event.key == key){
//     cachedVersion = localStorage.getItem(key+'Version')
//     stateVersion = smarts.gosmart(window, '$store.state.app.version', undefined)
//     // if the stateVersion does not equal the cachedVersion, we are out of sync
//     if(stateVersion < cachedVersion && !(typeof cachedVersion == 'undefined' || cachedVersion == null) || !cachedVersion){
//       // // turn write lock on
//       // localStorage.setItem(key+'writeLock', true)
//       window.$store.state.app.version = cachedVersion
//       stateVersion = cachedVersion
//       let cachedState
//       try {
//         cachedState = smarts.parse(event.newValue || "[]")
//       } catch(err){
//         cachedState = JSON.parse(event.newValue || "{}")
//       }
//       // window.$store.replaceState(merge(window.$store.state, cachedState))
//       if(cachedState && window.$store.state){
//         window.$store.replaceState(merge(window.$store.state, cachedState, {
//           arrayMerge: function (store, saved) { return saved },
//           clone: false,
//         }));
//       }

//     }
//   }
//   // turn write lock off
//   localStorage.removeItem(key+'writeLock')
// });

const Store = new Vuex.Store({
	modules: {
		app,
	},
	plugins: [
		CPS({
      paths: ['app'],
      // setState: _throttle((key,state,storage)=>{
      //   let stateVersion = state.app.version
      //   // if our localVersion doesn't equal the state version we need to commit changes to localStorage
      //   if(!storage.getItem(key+'writeLock') && cachedVersion < stateVersion && !(typeof stateVersion == 'undefined' || stateVersion == null) || !cachedVersion){

      //     // turn write lock on
      //     storage.setItem(key+'writeLock', true)

      //     storage.setItem(key, smarts.stringify(state))
      //     storage.setItem(key+'Version', stateVersion)
      //     cachedVersion = stateVersion

      //     setTimeout(()=>{
      //       storage.removeItem(key+'writeLock')
      //     }, 500)
      //     // turn write lock off
      //   }
      // }, 250),
      setState: _throttle((key,state,storage)=>{
        storage.setItem(key, smarts.stringify(state))
      }, 500),
      getState: (key, storage) => {
        // debug
        // let store = storage.getItem(key) || "[]"
        // let ret = smarts.parse(store)
        // return ret
        let ret
        try {
          ret = smarts.parse(storage.getItem(key) || "[]")
        } catch(err){
          console.error('error parsing persisted state: ', err)
          ret = JSON.parse(storage.getItem(key) || "{}")
        }
        // storage.removeItem(key+'writeLock')
        return ret;
      },
		})
	]
})
// localStorage.removeItem('vuex')
window.$Store = Store
window.$store = Store
export default Store
