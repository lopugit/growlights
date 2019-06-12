import lodash from 'lodash'

window.lodash = lodash
window.$lodash = lodash

export default ({app, router, Vue}) => {
	Vue.prototype.$l = lodash
}
