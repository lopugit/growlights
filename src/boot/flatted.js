// window
let flatted = require('flatted')
export default ({ app, router, Vue }) => {
	// window.something = something
	Vue.prototype.$flatted = flatted
  Vue.mixin({
    data: function(){
      return {
        flatted: flatted
      }
    }
  })

}
