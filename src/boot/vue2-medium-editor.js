// import something here
import editor from 'vue2-medium-editor'
// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  // something to do
  Vue.component('medium-editor', editor)
}
