
window.env = process.env.env
console.log('env', window.env)

export default ({ app, router, Vue }) => {
  Vue.prototype.$env = window.env
}
