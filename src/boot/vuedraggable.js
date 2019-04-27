// import something here
import draggable from 'vuedraggable'
// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  // something to do
  Vue.component('draggable', draggable)
}
