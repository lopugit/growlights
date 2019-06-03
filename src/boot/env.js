let env = process.env
process.envy = process.env
window.env = env

export default ({ app, router, Vue }) => {
	// Vue.$env = p.env
	// env.install = function(){
	// 	Object.defineProperty(Vue.prototype, '$env', {
	// 		get () { return env }
	// 	})
	// }
	// Vue.use(env);
	Vue.prototype.$env = env
}
