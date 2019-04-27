import smarts from 'smarts'


export default ({app, router, Vue}) => {
  window.smarts = smarts({
    vue: {
      reactiveSetter: true,
      vm: Vue
    }
  }).methods
	// var s = {}
	// s.install = function(){
	// 	Object.defineProperty(Vue.prototype, '$s', {
	// 		get () { return smarts() }
	// 	})
	// }
	Vue.mixin(
    smarts({
      vue: {
        reactiveSetter: true
      }
    })
  );
	Vue.prototype.$s = smarts({
    vue: {
      reactiveSetter: true,
      vm: Vue
    }
  }).methods
}
