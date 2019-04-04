import smarts from 'smarts'

window.smarts = smarts()

export default ({app, router, Vue}) => {
	// var s = {}
	// s.install = function(){
	// 	Object.defineProperty(Vue.prototype, '$s', {
	// 		get () { return smarts() }
	// 	})
	// }
	// Vue.use(s);
	Vue.prototype.$s = smarts()
}