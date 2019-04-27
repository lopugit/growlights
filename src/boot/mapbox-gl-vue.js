// import something here
import VueMapbox from 'mapbox-gl-vue'
// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  // something to do
  Vue.component('mapbox', VueMapbox)
}
