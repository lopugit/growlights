// window
let vue = require('vue')
export default ({ app, router, Vue }) => {
	window.$vue = vue.default
	// Vue.prototype.$vue = vue
  // Vue.use(template)
}
