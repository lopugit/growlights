

export default ({app, router, Vue}) => {
  Vue.mixin({
    data: function(){
      return {
        things: this.dupe(this.props),
      }
    },
    // beforeMount: function(){
    //   this.setsmart(this, 'things', this.dupe(this.props))
    // },
    watch: {
      'props': {
        handler: function(n,o){
          if(!this.equal(n,o)){
            this.setsmart(this, 'things', { ...this.things, ...this.dupe(this.props) })
          }
        },
        deep: true
      },
    },
    props: {
      props: {}
    }
  })
}
