// window
// let vuelidate = require('vuelidate')
import Vuelidate from 'vuelidate'
export default ({ app, router, Vue }) => {
	// window.something = something
	Vue.prototype.$vuelidate = Vuelidate
  Vue.use(Vuelidate)
}
