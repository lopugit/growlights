// import something here
const jsmart = require('circular-json')

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  // something to do
  Vue.prototype.$jsmart = jsmart
  Vue.mixin({
    data: function(){
      return {
        jsmart: jsmart
      }
    }
  })
}
