
export default ({ app, router, Vue }) => {
	Vue.prototype.$env = process.env.env
	window.env = process.env.env
}
