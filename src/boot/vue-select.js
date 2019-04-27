// import something here
import vSelect from 'vue-select'
// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  // something to do
  Vue.component('v-select', vSelect)
}
