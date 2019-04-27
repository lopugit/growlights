var UAParser = require('ua-parser-js')

var parser = new UAParser()
window.$uap = parser

export default ({ app, router, Vue }) => {

	Vue.prototype.$uap = parser

}
