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

<style lang="stylus">
@import '~src/css/quasar.variables.styl'

.q-nav-footer
  max-width: 100%
  margin: 5px
  background-color $negative
  // position: fixed !important
.q-layout-page-container
  padding-bottom: 0px !important

</style>
