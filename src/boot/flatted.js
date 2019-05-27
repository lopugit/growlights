// window
let flatted = require('flatted')
export default ({ app, router, Vue }) => {
	// window.something = something
	Vue.prototype.$flatted = flatted
	Vue.prototype.$f = flatted
  Vue.mixin({
    data: function(){
      return {
        flatted: flatted,
        $flatted: flatted,
        $f: flatted,
      }
    }
  })

}
