// import something here

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  const eventHub = new Vue()
  // something to do
  Vue.mixin({
    data: function(){
      return {
        eventHub
      }
    }
  })
}
