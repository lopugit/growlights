<template lang='pug'>
  q-toolbar.fixed-top.q-nav-toolbar.navbar(
    color="primary"
    :overlay="true"
    )
    q-btn(
      icon="menu"
      flat
      @click="setsmart($store, 'state.graph.leftSidebar', !getsmart($store, 'state.graph.leftSidebar', false))"
      size="1rem"
      ).text-primary
    div.q-ml-auto
    template(
      v-if="getsmart($store, 'state.graph.navigation.general', []) instanceof Array"
      v-for="nav in getsmart($store, 'state.graph.navigation.general', [])"
    )
      q-btn(
        flat
        color="white"
        text-color="primary"
        @click="$router.push(nav.link)"
      ).nav-button.q-mr-xsmd {{ nav.name }}
    div.q-mr-auto
    // q-btn(
    //   color="primary"
    //   @click="setsmart($store, 'state.graph.leftSidebar', true)"
    //   v-if="$store.state.graph.entity == $store.state.graph.entityDefault"
    // ).q-mr-xsmd {{ !getsmart($store, 'state.graph.showLoginOptions', false) ? 'members' : gosmart($store, 'state.graph.entity.registered.any', false) ? 'register' : 'login' }}
    q-btn(
      icon="shopping_basket"
      flat
      @click="setsmart($store, 'state.graph.cartSidebar', !getsmart($store, 'state.graph.cartSidebar', false))"
      size="20px"
      ).basket-button.text-primary
      q-chip(
        dense
        size="8px"
        v-if="gosmart($store, 'state.graph.entity.alopu.carts.0.products', [])"
        color="red"
        text-color="white"
      ) {{ gosmart($store, 'getters.graph/cartCount', ()=>{})() }}

</template>

<script>
export default {
  name: 'navbar-comp',
  data () {
    return {
      // objects: null,
      uid: this._uid
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
  props: {
  },
  components: {
  },
  watch: {
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
<style lang="sass">
@import 'src/styles/vars'
.navbar
  width: 100%
  max-width: 100%
  flex-wrap: nowrap
  overflow: hidden
  background: rgba($white, 1) !important
  // z-index: 10000
  @media(max-width: $breakpoint-sm)
    padding: 0 0px
  img
    width: 60px
    height: auto
    right: 0
    margin-right: 0px
    margin-left: auto

  .nav-button
    padding-left: 1%
    padding-right: 1%
    margin-left: .8%
    margin-right: .8%
    white-space: nowrap
    @media (max-width: $breakpoint-sm)
      display: none
  .cart-chip
    min-height: 0px !important
    min-width: 0px !important
    width: 17px
    height: 17px
    padding: 0px !important
    margin-top: 15px
    margin-right: 12px !important
    border: 1px solid white
    font-size: 8px
    right: 0
    position: absolute
    .q-chip__content
      // margin-bottom: 1px
  .q-btn
    font-family: Montserrat
    font-weight: 700
    letter-spacing: 1px
    font-size: 14px
    position: relative
</style>
