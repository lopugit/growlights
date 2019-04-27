// import something here
import socketio from 'socket.io-client'
import VueSocketIo from 'vue-socket.io'
var parser = require('alopu-socket.io-parser')
var SocketInstance = socketio(('https://api.alopu.'+process.env.apiDomain), {
  parser
})
// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  // something to do
  Vue.use(VueSocketIo, SocketInstance)
}
