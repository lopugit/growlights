// window
let lopu3 = require('lopu3')
export default ({ app, router, Vue }) => {
	window.lopu3 = lopu3
	Vue.prototype.$lopu3 = lopu3

}
