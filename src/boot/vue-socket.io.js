// import something here
import socketio from 'socket.io-client'
import VueSocketIo from 'vue-socket.io'
var parser = require('alopu-socket.io-parser')
// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  var SocketInstance = socketio((window.env.apiUrl), {
    parser
  })
  // something to do
  Vue.use(VueSocketIo, SocketInstance)
}
