// window
let growAi = require('grow.ai')
export default ({ app, router, Vue }) => {
	window.growAi = growAi
	Vue.prototype.$growAi = growAi

}
