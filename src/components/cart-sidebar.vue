<template lang='pug'>
//- .sidebar
.sidebar
	q-item(
		).q-user-item.full-width
		q-item-section(
			avatar
			@click="$store.commit('graph/thing', {path: 'cartSidebar', val: !$store.state.graph.cartSidebar})"
			).q-item-label-profile-picture
			img.q-circle-img.q-max-height-60.q-max-width-60(
				:src=`$store.getters['graph/cover']()`
				)
		q-item-section(
		)
			q-item-label(
			) {{ $store.getters['graph/username']() }}
			q-item-label(
				size=".5rem"
				).q-mt-xxxsm.text-grey.text-xsm {{ $store.getters['graph/ego'](0) }}
		q-item-section.q-ml-auto.w-auto(
			:side='true'
			)
			q-btn.w-auto(
				icon="close"
				@click="$store.commit('graph/thing', { path: 'cartSidebar', val: !$store.state.graph.cartSidebar})"
			).shadow-0.q-pa-no
	q-list.no-border.main-list.q-pa-sm.q-pt-xxxxsm.q-mt-auto.q-mb-sm.q-pr-xxxxsm.q-pl-no.full-width
		cart(
			:theme=`{
				simple: true
			}`
		)

</template>

<script>
export default {
  name: 'cart-sidebar',
  data () {
    return {
      // objects: null,
      uid: this._uid,
    }
  },
  sockets: {
    connect: function(){
      // console.log("socket connect vue side")
    },
    // giveObjects(data){
    //   // console.log(data)
    //   if(this.uuid == data.id){
    //     this.objects = data.objects
    //   }
    // }
  },
  created () {
    // if(this.count !== 0){
    //   this.getObjects({
    //     count: this.count,
    //     sort: 'alphabetical',
    //     sortDirection: 'ascending',
    //     id: this.uuid
    //   })
    // } else {
    //   this.objects = null
    // }
  },
  methods: {
    // getObjects(opts){
    //   this.$socket.emit('getObjects', opts)
    // }
  },
  computed: {
    entity: {
      get(){
        return this.$store.state.graph.entity
      },
      set(val){
        this.$store.commit('graph/entity', {entity: val})
      }
    },
  },
  components: {
    cart: require('src/components/cart').default
  },
  watch: {
  },
  route: {
    canActivate(){
      return true
    }
  }}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import 'src/styles/vars'
.sidebar
  // width: 100%
  // max-width: 100%
  // overflow: hidden
  display: flex
  align-items: flex-start
  flex-direction: column
  max-height: 100%
  height: 100vh
  // display: flex
  // align-items: flex-start
  // justify-content: flex-start
  // padding: 0
  // margin: 0
  .q-user-item
    align-items: center
    min-height: auto
  .main-list
    // min-height: 100%
    // max-height: 100%
    overflow: hidden
    display: flex
    align-items: flex-start
    flex-direction: column
    flex-shrink: 1
    flex-grow: 10000
  .cart
    max-height: auto
    overflow: auto
  // background: $grey


</style>
