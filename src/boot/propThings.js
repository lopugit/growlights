

export default ({app, router, Vue}) => {
  Vue.mixin({
    data: function(){
      return {
        schemarize: this.dupe(
          this.merge(
            this.dupe(this.getsmart(this.$options, 'schema', {})),
            this.dupe(this.getsmart(this.props, 'schema', {})),
          )
        ),
        things: this.merge(
          this.merge(
            this.dupe(this.getsmart(this.$options, 'schema', {})),
            this.dupe(this.getsmart(this.props, 'schema', {})),
          ),
          this.dupe(this.props) || {}
        ),
        backup: this.merge(
          this.merge(
            this.dupe(this.getsmart(this.$options, 'schema', {})),
            this.dupe(this.getsmart(this.props, 'schema', {})),
          ),
          this.dupe(this.props) || {}
        ),
      }
    },
    watch: {
      'props': {
        handler: function(n,o){
          if(!this.equal(n,o)){
            this.setsmart(this, 'things', { ...this.things, ...this.dupe(this.props) })
            this.setsmart(this, 'backup', { ...this.things, ...this.dupe(this.props) })
            this.setsmart(this, 'schema', { ...this.schemarize, ...this.dupe(this.props.schema) })
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
