<template lang='pug'>
  .cart-container(
    :class="theme"
  )
    .cart-positioner
      .cart
        .banner-section(
          v-if="banner"
        )
          banner(
            size="thin"
          )
        .your-cart.full-width
          q-item.full-width(
            )
            q-item-section(
              ).text-cap
              router-link.text-smd.full-width.text-dark(
                to="/cart"
              ) Your cart
          .clear-cart.text-primary(@click="setsmart(cartD, 'products', [])") Clear Cart
          q-separator
        q-list.product-list.no-border.q-pa-no
          q-item.full-width(
            v-if=`
             getsmart(cartD, 'products.length', 0) < 1
            `
            )
            q-item-section.text-grey(
              )
              | Your cart is empty, add some products to check out
          template(
            v-for="product in (gosmart(cartD, 'products', []) || [])"
          )
            q-item.cart-product(
              )
              q-item-section.product-img(
                side
              )
                img.q-square-img.q-br-rd-xs(
                  :src="`${product.thumbnail}`"
                )
                q-chip.floating.product-count-chip(
                  color="primary"
                  text-color="white"
                ) {{ product.count }}
              q-item-section.informations(
                ).text-cap
                .information-positioner.one
                  .information-container
                    .title-positioner
                      .title-container
                        router-link(
                          :to='"/product/"+product.title'
                        ).title {{ product.title }}
                .information-positioner.two
                  .information-container
                    .count-positioner
                      .count-container
                        q-btn.count-minus.count-btn(
                          color="primary"
                          size="xs"
                          @click=`
                            // increment product count
                            setsmart(product, 'count', product.count - ((product.count > 1) ? 1 : 0)) ;
                            // set cart update time
                            setsmart(cartD, 'lastUpdated', Date.now())
                          `
                          flat
                        ) -
                        .count {{ gosmart(product, 'count', 1) }}
                        q-btn.count-minus.count-btn(
                          color="primary"
                          size="xs"
                          @click=`
                            // increment product count
                            setsmart(product, 'count', product.count+1)
                            setsmart(cartD, 'lastUpdated', Date.now())
                          `
                          flat
                        ) +
                    .delete-positioner.q-ml-xsm
                      .delete-container
                        q-btn.remove-btn(
                          color="grey"
                          size="xs"
                          @click="removeProduct({product})"
                          flat
                        ) remove
                    .price-positioner.q-ml-auto
                      .price-container
                        .price ${{ Math.ceil((getThing({option: {'name': 'growtime.com.au marked up price'}, list: product.prices, keys: ['name']}).values['AUD']*product.count)*100)/100 }}
                          .currency {{ false || 'AUD' }}
            q-separator
        .bottom-section.q-pl-xxsm.q-pr-xxxxsm
          q-list.no-border.full-width.bottom-section-list
            q-item.bottom-info.subtotal.q-pl-xxxxsm.q-pr-xxxxsm
              q-item-section.uppercase Subtotal
              q-item-section(
                side
              ).bottom-value.cart-subtotal ${{ Math.ceil(getsmart($store, 'getters.cartSubtotal', ()=>{return 0})({cart: cartD})*100)/100 }}
                .currency {{ false || 'AUD' }}
            q-item.bottom-info.shipping.q-pl-xxxxsm.q-pr-xxxxsm
              q-item-section.uppercase Shipping
              q-item-section(
                side
              ).bottom-value.cart-shipping {{ getsmart(cartD, 'shippingMethod.cost', 'Calculated at next step') }}
                // .currency {{ false || 'AUD' }}
            .shipping-and-discount.message.q-pa-sm.q-pt-no.q-pb-smd.text-center Shipping and discount codes are added at checkout
            q-btn.checkout-button.shadow-0.q-mr-no.q-ml-auto(
              color="primary"
              @click=`
                $router.push(
                  gosmart(
                    cartD,
                    'currentStage',
                    '/checkout/customer_information'
                  )
                )
                `
            ) Checkout
            q-separator.total-separator
            q-item.bottom-info.total.q-pl-xxxxsm.q-pr-xxxxsm
              q-item-section.uppercase total
              q-item-section(
                side
              ).bottom-value.cart-total ${{ Math.ceil(getsmart($store, 'getters.cartTotal', ()=>{return 0})({cart: cartD})*100)/100 }}
                .currency {{ false || 'AUD' }}

</template>

<script>
export default {
  name: 'cart-comp',
  data () {
    return {
      uid: this._uid,
      cartD: this.cart || this.gosmart(this.$store, 'state.graph.entity.alopu.carts.0', {})
    }
  },
  sockets: {
    connect: function(){
    },
  },
  created () {
  },
  methods: {
    removeProduct(args){
      if(args.product){
        this.setsmart(this.cartD, 'lastUpdated', Date.now())
        this.setsmart(args, 'product.count', 0)
        this.popThing({
          option: args.product,
          list: this.gosmart(this.cartD, 'products', []),
          keys: ['title']
        })
      }
    }
  },
  props: {
    theme: {
      default: args => {}
    },
    banner: {},
    cart: {},
  },
  computed: {
  },
  components: {
    banner: require('src/components/banner').default,
  },
  watch: {
    '$store.state.graph.entity.alopu.carts.0'(){
      this.$set(this, 'cartD', this.cart || this.gosmart(this.$store, 'state.graph.entity.alopu.carts.0', {}))
    },
    'cart'(){
      this.$set(this, 'cartD', this.cart || this.gosmart(this.$store, 'state.graph.entity.alopu.carts.0', {}))
    },
    'cartD'(){
      this.$set(this, 'cartD', this.cart || this.gosmart(this.$store, 'state.graph.entity.alopu.carts.0', {}))
    },
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
.cart-container
  width: 100%
  max-width: 100%
  display: flex
  // flex-shrink: 1
  height: auto
  // max-height: 90vh
  overflow: auto
  justify-content: center
  .cart-positioner
    width: 95vw
    @media(min-width: $breakpoint-sm)
      width: 85vw
    max-width: 100%
    display: flex
    flex-shrink: 1
    height: auto
    max-height: auto
    overflow: auto
    .cart
      display: flex
      flex-shrink: 1
      height: auto
      max-height: auto
      overflow: auto
      flex-direction: column
      width: 100%
      max-width: 100%
      .your-cart
        text-align: center
        position: relative
        .clear-cart
          text-align: right
          font-size: 10px
          padding-right: 2px
          padding-bottom: 2px
          position: absolute
          right: 0
          bottom: 0px
  .product-list
    height: auto
    // max-height: 80vh
    overflow-y: auto
    overflow-x: hidden
    max-width: 100%
    .cart-product
      padding-left: 5px
      padding-right: 5px
      font-size: 14px
      max-width: 100%
      // display: flex
      // flex-direction: row
      // flex-wrap: nowrap
      .product-img
        position: relative
        width: auto
        .product-count-chip
          display: none
          min-height: 0px !important
          min-width: 0px !important
          width: 18px
          height: 18px
          padding: 0px !important
          justify-content: center
          text-align: center
          font-weight: 700
          font-size: 11px
          // margin-right: -8px
          line-height: 5px
          margin-top: -1px
        img
          width: 50px
  // background: $grey
  .information-positioner
    .information-container
      display: flex
      flex-direction: row
      align-items: center
      margin-top: 10px
      .title-positioner
        .title-container
          .title
            // color: black
      .count-positioner
        display: flex
        .count-container
          display: flex
          flex-direction: row
          align-items: center
          border: 1px solid rgba(0,0,0,.2)
          width: auto
          border-radius: 5px
          .count
            padding: 0px 5px
      .price-positioner
        // margin-top: 8px
        .price-container
          .price
            display: flex
            flex-direction: row
            align-items: flex-end
            // font-family: Montserrat
            // font-weight: 600
      .delete-positioner
        .q-btn
          padding: 4px 8px
    &.one
      .information-container
        align-items: flex-start
        .remove-btn
          margin-top: -8px
          margin-right: -5px

  .message
    color: rgba(black, .5)
    font-size: 12px
  .bottom-info
    font-size: 14px
    .bottom-value
      color: black
      display: flex
      flex-direction: row
      align-items: flex-end
      &.cart-shipping
        text-transform: none !important
        color: grey
        font-weight: 400
        font-size: 12px
      &.cart-total
        font-size: 19px
        font-weight: 500
        letter-spacing: 0px
  .currency
    font-size: 7px

  .bottom-section
    // display: flex
    // flex-direction: column
    .checkout-button
      width: 100%
    .total-separator
      display: none
  &.simple
    .your-cart
    .bottom-section
      .bottom-info
        &.shipping
          display: none
        &.total
          display: none
  &.pretty
    .cart
      .your-cart
        text-align: left
        .clear-cart
          display: none
      .product-list
        // max-height: 50vh
    .cart-product
      padding-top: 20px
      padding-bottom: 25px
      // padding-top: 18px
      // padding-bottom: 18px
      align-items: flex-start
      .product-img
        border-radius: 7px
        // border: 2px solid darken($white, 15)
        // padding: 5px
        margin-right: 15px
        img
          width: 65px
          height: auto
    .information-positioner
      .information-container
        margin-top: 0px
        .title-positioner
          .title-container
            max-width: 220px
            .title
        .count-positioner
          .count-container
            .count
        .price-positioner
          .price-container
            .price
              .currency
        .delete-positioner
          .q-btn
      &.one
        .information-container
          .remove-btn
      &.two
        .information-container
          margin-top: 7px
          .remove-btn

    .bottom-section
      display: flex
      flex-direction: column
      justify-content: flex-end
      align-items: flex-end
      .bottom-section-list
        display: flex
        flex-direction: column
        justify-content: flex-end
        align-items: flex-end
      .checkout-button
        width: auto
        margin-left: auto
      .shipping,
      .total
        display: none
  &.summary
    .shipping-and-discount
      display: none
    .cart
      .your-cart
        display: none
        text-align: left
      .product-list
        max-height: auto
        .q-separator
          display: none

    .cart-product
      padding-top: 18px
      padding-bottom: 18px
      align-items: flex-start
      .product-img
        border-radius: 7px
        // border: 2px solid darken($white, 15)
        // padding: 5px
        margin-right: 15px
        img
          width: 65px
          height: auto
        .product-count-chip
          display: flex
          border-radius: 50%
    .informations
      display: flex
      flex-direction: row
      justify-content: flex-start
      .information-positioner
        .information-container
          margin-top: 0px
          .title-positioner
            .title-container
              max-width: 220px
              .title
          .count-positioner
            display: none
            .count-container
              .count
          .price-positioner
            // display: none
            .price-container
              .price
                .currency
          .delete-positioner
            display: none
            .q-btn
        &.one
          .information-container
            .remove-btn
        &.two
          margin-left: auto
    .checkout-button
      display: none
    .bottom-section
      display: flex
      flex-direction: column
      justify-content: flex-end
      align-items: flex-end
      .bottom-info
        width: 100%
        > div
          text-transform: capitalize
      .currency
        font-size: inherit
        padding-left: 4px
      .total-separator
        display: block
  &.items-only
    .clear-cart
      display: none
    .bottom-section
      display: none
</style>
