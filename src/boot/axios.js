import axios from 'axios'
let smarts = require('smarts')()

function setContentTypeIfUnset(headers, value) {
  if (headers && !headers['Content-Type']) {
    headers['Content-Type'] = value;
  }
}

axios.interceptors.request.use((config)=>{
    function circular(data, headers){
      // return smarts.stringify(data)
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return smarts.stringify(data)
    }
    config.transformRequest = {
      circular
    }
  return config
})

window.axios = axios
window.$axios = axios

export default ({ Vue }) => {
  Vue.prototype.$axios = axios
}
