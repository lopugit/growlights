let env = process.env
process.envy = process.env
window.env = env

export default ({ app, router, Vue }) => {
	Vue.prototype.$env = env
}
