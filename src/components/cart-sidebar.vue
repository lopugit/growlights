<template lang='pug'>
//- .sidebar
q-list.sidebar
  q-item(
    ).q-user-item.full-width
    q-item-section(
      avatar
      @click="$store.commit('thing', {path: 'cartSidebar', val: !$store.state.app.cartSidebar})"
      ).q-item-label-profile-picture
      img.q-circle-img(
        :src=`$store.getters.cover()`
        )
    q-item-section(
    )
      q-item-label(
        :style={
          'text-transform': 'capitalize'
        }
      ) {{ $store.getters.username() }}
      q-item-label(
        size=".5rem"
        ).q-mt-xxxsm.text-grey.text-xsm {{ $store.getters.ego(0) }}
    q-item-section(
      )
      q-btn(
        icon="close"
        @click="$store.commit('thing', {path: 'cartSidebar', val: !$store.state.app.cartSidebar})"
      ).shadow-0
  q-list.no-border.main-list.q-pa-sm.q-pt-xxxxsm.q-mt-auto.q-mb-sm.q-pr-xxxxsm.full-width
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
      uuid: this._uid,
      fbParams: {
        scope: 'email,public_profile',
        return_scopes: true
      },
      googleParams: {
        client_id: '278663639558-du8pit378au8cvkm22s1vv02be65dmru.apps.googleusercontent.com'
      }
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
        return this.$store.state.app.entity
      },
      set(val){
        this.$store.commit('entity', {entity: val})
      }
    },
    showLoginOptions: {
      get(){
        if(this.$store.getters.loggedIn){
          return false
        } else {
          return this.$store.state.app.showLoginOptions
        }
      },
      set(val){
        this.$store.commit('showLoginOptions', val)
      }
    },
  },
  components: {
    cart: require('src/components/cart').default
  },
  watch: {
    '$store.state.app.showLoginOptions'(){
      this.showLoginOptions = this.$store.state.app.showLoginOptions
    },
    // '$store.state.entity': function(){
    //   this.entity = this.$store.state.entity
    // },
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
  max-height: 100vh
  // display: flex
  // align-items: flex-start
  // justify-content: flex-start
  // padding: 0
  // margin: 0
  .q-user-item
    align-items: center
    min-height: auto
  .main-list
    min-height: 100%
    max-height: 100%
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
