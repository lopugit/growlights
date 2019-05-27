<template lang='pug'>
  q-toolbar.fixed-top.q-nav-toolbar.navbar(
    color="primary"
    :overlay="true"
    )
    q-btn(
      icon="menu"
      @click="setsmart($store, 'state.app.leftSidebar', !getsmart($store, 'state.app.leftSidebar', false))"
      size="1rem"
      ).shadow-0.text-primary
    div.q-ml-auto
    template(
      v-if="getsmart($store, 'state.app.navigation.general', []) instanceof Array"
      v-for="nav in getsmart($store, 'state.app.navigation.general', [])"
    )
      q-btn.nav-button.shadow-0.q-mr-xsmd(
        color="white"
        text-color="primary"
        @click="$router.push(nav.link)"
      ) {{ nav.name }}
    div.q-mr-auto
    q-btn(
      color="primary"
      @click="setsmart($store, 'state.app.leftSidebar', true)"
      v-if="$store.state.app.entity == $store.state.app.entityDefault"
    ).shadow-0.q-mr-xsmd {{ !getsmart($store, 'state.app.showLoginOptions', false) ? 'members' : gosmart($store, 'state.app.entity.registered.any', false) ? 'register' : 'login' }}
    q-btn(
      icon="shopping_basket"
      @click="setsmart($store, 'state.app.cartSidebar', !getsmart($store, 'state.app.cartSidebar', false))"
      size="1rem"
      ).basket-button.shadow-0.text-primary
      q-chip(
        v-if="gosmart($store, 'state.app.entity.alopu.carts.0.products', [])"
        color="red"
        text-color="white"
      ).q-circle.cart-chip.q-justify-center.q-align-center {{ gosmart($store, 'getters.cartCount', ()=>{})() }}

</template>

<script>
export default {
  name: 'navbar-comp',
  data () {
    return {
      // objects: null,
      uuid: this._uid
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
