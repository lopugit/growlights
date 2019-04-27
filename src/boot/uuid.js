// window
var uuuid = require('uuid')
export default ({ app, router, Vue }) => {
	window.uuuid = uuuid
	Vue.prototype.uuuid = uuuid
  Vue.use({
    data(){
      return {
        testtt: 'wtf'
      }
    }
  })
}
