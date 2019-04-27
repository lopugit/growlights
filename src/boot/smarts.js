import smarts from 'smarts'


export default ({app, router, Vue}) => {
  window.smarts = smarts({
    vue: {
      reactiveSetter: true
    }
  }).methods
	// var s = {}
	// s.install = function(){
	// 	Object.defineProperty(Vue.prototype, '$s', {
	// 		get () { return smarts() }
	// 	})
  // }
  Vue.mixin({
    data(){
      return {
        things: {}
      }
    }
  })
	Vue.mixin(
    smarts({
      vue: {
        reactiveSetter: true
      }
    })
  );
	Vue.prototype.$s = smarts({
    vue: {
      reactiveSetter: true
    }
  }).methods
  Vue.prototype.$native = {
  }
  Vue.prototype.$native.setTimeout = (fn, timeout) => setTimeout(fn, timeout)
  // Object.assign(Vue.prototype.$native, window)
}
