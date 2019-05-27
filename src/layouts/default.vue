<template lang="pug">
q-layout(
  view="HHH LpR FFF"
  )
  q-drawer(
    v-model="$store.state.app.leftSidebar"
    side="left"
    :overlay="true"
    ).z-top.q-flex.q-flex-column
    //- :noHideOnRouteChange="true"
    sidebar.q-br-1(
    )
  q-drawer(
    v-model="$store.state.app.cartSidebar"
    side="right"
    :overlay="true"
    ).z-top.q-flex.q-flex-column
    //- :noHideOnRouteChange="true"
    cart-sidebar.q-bl-1(
    )

  q-page-container.q-pt-xxxl
    router-view(
    ).router-view
    // :key="$route.fullPath"
  navbar
  footer-thing
  q-dialog(
    :value=`gosmart($store, 'state.app.showLoginDialog', false)`
    @input=`setsmart($store, 'state.app.showLoginDialog', $event)`
    transition-show="fade"
    transition-hide="fade"
    )
    manifest
  q-dialog(
    :value=`gosmart($store, 'state.app.showCartCacheDialog', false)`
    v-if=`gosmart($store, 'state.app.showCartCacheDialog', false)`
    @input=`setsmart($store, 'state.app.showCartCacheDialog', $event)`
    transition-show="fade"
    transition-hide="fade"
    )
    q-card
      q-card-section.text-center
        .text-normal.text-smlg We found an old shopping cart
        .text-thin.text-grey.text-smd You can merge or choose the cart you want
      q-separator
      q-card-section.text-center.q-mt-xxsm
        .text-normal.text-xlg Merge
      // q-card-section.text-center.q-mb-no.q-pb-md
      //   q-btn.full-width(
      //     color="primary"
      //     size="sm"
      //   ) Choose
      q-card-section
        cart(
          :theme=`{
            summary: true
          }`
          v-if=`getsmart($store, 'state.app.entity.alopu.carts.1', false)`
          :cart=`{
            products: setThings({
              options: setThings({
                options: getsmart($store, 'state.app.entity.alopu.carts.1.products', []),
                list: [],
                keys: ['title'],
                push: true
              }),
              list: setThings({
                options: getsmart($store, 'state.app.entity.alopu.carts.0.products', []),
                list: [],
                keys: ['title'],
                push: true
              }),
              keys: ['title'],
              push: true
            })
          }
          `
        )
      q-card-section.text-center.q-mb-md
        q-btn.full-width(
          color="primary"
          size="md"
          @click=`
            setThings({
              options: getsmart($store, 'state.app.entity.alopu.carts.1.products', []),
              list: getsmart($store, 'state.app.entity.alopu.carts.0.products', []),
              keys: ['title'],
              push: true
            })
            setsmart($store, 'state.app.showCartCacheDialog', false)
          `
        ) Merge Carts
      q-separator
      q-card-section.text-center.q-mt-xxsm
        .text-normal.text-xlg Current Cart
      q-card-section
        cart.q-mb-md(
          :theme=`{
            summary: true
          }`
        )
      q-card-section.text-center.q-mb-md
        q-btn.full-width(
          color="primary"
          size="md"
          @click=`
            setsmart($store, 'state.app.showCartCacheDialog', false)
          `
        ) Keep Current Cart
      q-separator
      q-card-section.text-center.q-mt-xxsm
        .text-normal.text-xlg Old Cart
      q-card-section
        cart(
          :theme=`{
            summary: true
          }`
          v-if=`getsmart($store, 'state.app.entity.alopu.carts.1', false)`
          :cart=`getsmart($store, 'state.app.entity.alopu.carts.1', undefined)`
        )
      q-card-section.text-center.q-mb-md
        q-btn.full-width.q-mb-sm(
          color="primary"
          size="md"
          @click=`
            let localCart = getsmart($store, 'state.app.entity.alopu.carts.0', undefined)
            setsmart($store, 'state.app.entity.alopu.carts.0.products',
              getsmart($store, 'state.app.entity.alopu.carts.1.products', [])
            )
            delete $store.state.app.entity.alopu.carts['1']
            // setsmart($store, 'state.app.entity.alopu.carts.1',
            //   undefined
            // )
            let list = gosmart($store, 'state.app.entity.alopu.carts.history', [])
            if(list instanceof Array && localCart){
              list.push(localCart)
            }
            setsmart($store, 'state.app.showCartCacheDialog', false)
          `
        ) Use Old Cart
        // q-btn.full-width(
        //   color="primary"
        // ) Merge
  q-dialog(
    persistent
    :value=`gosmart($store, 'state.app.paymentDialog', false)`
    v-if=`gosmart($store, 'state.app.paymentDialog', false)`
    )
    // @input=`setsmart($store, 'state.app.paymentDialog', false)`
    q-card.q-flex-column.q-justify-center.q-pt-xxsm.q-pb-xxsm.q-pl-smd.q-pr-smd
      q-card-section.q-pb-xxxxsm(
        v-if=`!gosmart($store, 'state.app.paymentProcessing', false)`
      ).text-center.q-pb-xmd
        .text-md Thanks for your order.
      q-card-section.q-pb-xxxxsm(
        v-if=`!gosmart($store, 'state.app.paymentProcessing', false)`
      )
        .text-sm Payment Successful
      q-card-section.q-pt-xxxsm(
        v-if=`gosmart($store, 'state.app.paymentReceipt', $uuid.v4())`
      )
        .text-xxsm.text-grey Order number:
        .text-xxxsm.text-grey.text-uppercase {{ gosmart($store, 'state.app.paymentReceipt', $uuid.v4()) }}
      q-card-section.q-justify-end(
        v-if=`!gosmart($store, 'state.app.paymentProcessing', false) || true`
      ).q-mt-sm
        q-btn(
          @click="setsmart($store, 'state.app.paymentDialog', false) ; setsmart($store, 'state.app.paymentProcessing', false)"
          color="primary"
        ) Close</template>

<script>
export default {
  name: 'default',
  data(){
    return {
      uuid: this._uid,
    }
  },
  sockets: {
    connect: function(){
    },
  },
  created(){
  },
  methods: {
  },
  watch: {
    // '$store.state'(){
    //   console.log('run')
    //   this.$store.commit('thing', {
    //   })
    // },
  },
  components: {
    navbar: require('src/components/navbar').default,
    'footer-thing': require('src/components/footer').default,
    sidebar: require('src/components/sidebar').default,
    'cart-sidebar': require('src/components/cart-sidebar').default,
    'manifest': require('src/components/manifest').default,
    'cart': require('src/components/cart').default,
  },
  computed: {
    navigator: {
      get(){
        return navigator
      }
    },
    pageHistory: {
      get(){
        return this.$store.state.app.pageHistory
      },
      set(val){
        this.$store.commit('pageHistory', val)
      }
    },
    feedback: {
      get(){
        return this.$store.state.app.feedback
      },
      set(val){
        this.$store.commit('feedback', val)
      }
    }
  }
}
</script>

<style lang="sass">
@import 'src/styles/vars'
html
  // cursor: url(/statics/cursors/ms/aero_link2.cur), pointer
  cursor: url(/statics/cursors/ms/aero_arrow.cur) 2 2, auto
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  // text-align: center
  color: $friendly
  // padding-top: 60px
  // min-height: 100vh
body
  margin: 0px
  &.cursor-pointer,
  &.cursor-pointer *
    cursor: url(/statics/cursors/ms/aero_link2.cur) 2 2, auto !important

h1,h2
  font-weight: normal

ul
  list-style-type: none
  padding: 0

li
  display: inline-block
  margin: 0 10px

a,
.action,
.fa-icon,
a:-webkit-any-link,
.btn,
.btn-container
  color: $green
  text-decoration: none
  // cursor: url(/statics/cursors/ms/aero_link1.cur), pointer
  // border-bottom: 1px dotted rgba($green, .5)
  +animate(all, 300ms, ease)
  cursor: url(/statics/cursors/ms/aero_arrow.cur) 2 2, auto
  animation: 400ms hoverMaple linear infinite
  &:hover
    color: $greenhover

  +keyframes(hoverMaple)
    0%
      cursor: url(/statics/cursors/ms/aero_link2.cur) 2 2, pointer
    49%
      cursor: url(/statics/cursors/ms/aero_link2.cur) 2 2, pointer
    50%
      cursor: url(/statics/cursors/ms/aero_link1.cur) 2 2, auto
    99%
      cursor: url(/statics/cursors/ms/aero_link1.cur) 2 2, auto
    100%
      cursor: url(/statics/cursors/ms/aero_link2.cur) 2 2, pointer

.fa-icon
  user-select: none
button,
.btn
  color: $green
  // cursor: url(/statics/cursors/ms/aero_link1.cur), pointer
.content-editable
  outline: none
  padding: 5px
  &:focus
    // background: white
input
  color: $friendly
body
  background: $white
.router-view
  // padding-top: 50px
.v-select
  $font-size: 1rem
  font-size: $font-size
  line-height: $font-size
  height: 100%
  max-width: 100%
  .dropdown-toggle
    border: none !important
    border-radius: 0px !important
    // border-bottom: 1px solid $grey !important
    display: flex
    align-items: flex-start
    justify-content: flex-start
    flex-direction: column
    flex-wrap: wrap
    height: 100%
    max-width: 100%
    &:after
      display: none
    .input-container
      width: 100%
      max-width: 100%
      .form-control
        order: 1
        height: 100% !important
        max-width: 100%
        background: rgba(black, 0)
        font-size: $font-size
        line-height: $font-size
        font-family: $family
        padding: 0 4px
    .selected-tag-list
      order: 2
      max-width: 100%
      .selected-tag
        margin: 0
        margin-left: 4px
        padding: 0
        padding-right: 9px
        max-width: 100%
        height: auto
        font-size: $font-size
        line-height: $font-size + .3rem
        background: rgba(black, 0)
        color: $friendly
        font-family: $family
        width: auto
        border: none
        border-radius: 0px
        max-height: 100%
        white-space: normal
        position: relative
        text-transform: capitalize
        word-wrap: break-word
        &:first-child
          // margin-left: 4px
        button
          top: 0
          left: -5px
          position: absolute
          align-self: flex-start
          bottom: auto
          float: right
          font-size: .85rem
          line-height: .2rem
          // font-weight: 900
          color: rgba(darken($green, 0),.5)
          opacity: 1
    .open-indicator
      top: 0px
      display: flex
      align-self: flex-start
      align-items: center
      justify-content: center
      &:before
        height: 5px
        width: 5px
        border-width: 1px 1px 0 0
  .dropdown-menu
    border: 1px solid rgba($friendly, .15)
    display: flex
    align-items: flex-start
    justify-content: flex-start
    flex-direction: column
    text-transform: capitalize
    li
      margin-right: 4px
    .active,
      background-color: rgba($green, .5)
    .highlight
      background-color: $green
      a
        background-color: inherit
.mapboxgl-ctrl-logo
  display: none !important
.mapboxgl-ctrl-attrib
  display: none !important

// quasar style modifications
.q-pt-none
  // padding-top: 0px !important
.text-primary
  color: $green !important
.q-chip
  margin-left: -16px !important
  top: -0.6rem !important
  padding: 0 10px !important
  min-height: 25px !important
.q-verified-status
  text-align: center
  justify-content: center
  img
    width: 20px
    height: auto
.q-item-label-profile-picture
  img
    width: 60px
    height: auto
    border-radius: 50%
  width: auto
  height: auto
</style>

<style lang="stylus">
@import '~src/css/quasar.variables.styl'

.q-nav-footer
  max-width: 100%
  margin: 5px
  background-color $negative
  // position: fixed !important
.q-layout-page-container
  padding-bottom: 0px !important

.fb-signin-button
  /* This is where you control how the button looks. Be creative! */
  display flex
  flex-direction row
  align-items center
  padding: 0px 5px 0px 15px
  background: #4460a0
  border-radius: 4px
  width: 100%
  height: 45px
  cursor: pointer
  padding-top: 1px
  transition: .2s
  -webkit-user-select: none
  -moz-user-select: none
  -ms-user-select: none
  user-select: none
  position: relative
  &:hover
    background #4a68ae
  .text
    width: 100%
    text-align: center
  img
    position: absolute
    left: 15px
    width: 16px
    height: 16px

.g-signin-button
  /* This is where you control how the button looks. Be creative! */
  display flex
  flex-direction row
  align-items center
  padding: 0px 5px 0px 15px
  border-radius: 4px
  width: 100%
  height: 45px
  cursor: pointer
  padding-top: 1px
  transition: .2s
  -webkit-user-select: none
  -moz-user-select: none
  -ms-user-select: none
  user-select: none
  position: relative
  background-color #3f82f8
  &:hover
    background-color #4c8bf8
  .text
    width: 100%
    text-align: center
  img
    position: absolute
    left: 15px
    width: 16px
    height: 16px
</style>
