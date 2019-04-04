import axios from 'axios'

window.axios = axios

export default ({ Vue }) => {
  Vue.prototype.$axios = axios
}
