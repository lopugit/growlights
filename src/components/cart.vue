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
            //- q-item-side.q-square-img.q-br-xs(
            //- 	:avatar="`statics/trolley.png`"
            //- )
            q-item-main(
              :label="'your cart'"
              ).text-cap
          q-item-separator
        q-list.product-list.no-border.q-pa-no
          template(
            v-for="product in gosmart($store, 'state.alopu.entity.alopu.carts.0.products', [])"
          )
            q-item.cart-product(
              )
              q-item-side.q-square-img.q-br-xs.product-img(
                :avatar="`${product.thumbnail}`"
              )
                q-chip.product-count-chip(
                  floating
                  small
                  color="grey"
                ) {{ product.count }}
              q-item-main(
                ).text-cap
                .information-positioner.one
                  .information-container
                    .title-positioner
                      .title-container
                        router-link(
                          :to='"/products/product/"+product.title'
                        ).title {{ product.title }}
                .information-positioner.two
                  .information-container
                    .count-positioner
                      .count-container
                        q-btn.count-minus.count-btn(
                          color="primary"
                          size="xs"
                          @click="product.count > 1 ? product.count-- : product.count = 1 ; $store.commit('thing', { path: 'cart', val: gosmart($store, 'state.alopu.entity.alopu.carts.0.products', [])})"
                          flat
                        ) -
                        .count {{ gosmart(product, 'count', 1) }}
                        q-btn.count-minus.count-btn(
                          color="primary"
                          size="xs"
                          @click="product.count++ ; $store.commit('thing', { path: 'cart', val: gosmart($store, 'state.alopu.entity.alopu.carts.0.products', [])})"
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
                        .price ${{ Math.ceil((getThing({option: {'name': 'growlights.com.au marked up price'}, list: product.prices, keys: ['name']}).values['AUD']*product.count)*100)/100 }}
                          .currency {{ false || 'AUD' }}
            q-item-separator
        q-item-separator
        .bottom-section
          q-list.no-border.full-width.bottom-section-list
            q-item.bottom-info.subtotal.q-pl-xxxxsm.q-pr-xxxxsm
              q-item-main.uppercase Subtotal
              q-item-side(
                side="right"
              ).bottom-value.cart-subtotal ${{ Math.ceil(cartSubtotal*100)/100 }}
                .currency {{ false || 'AUD' }}
            q-item.bottom-info.shipping.q-pl-xxxxsm.q-pr-xxxxsm
              q-item-main.uppercase Shipping
              q-item-side(
                side="right"
              ).bottom-value.cart-shipping {{ 'Calculated at next step' }}
                // .currency {{ false || 'AUD' }}
            .shipping-and-discount.message.q-pa-sm.q-pt-no.q-pb-smd.text-center Shipping and discount codes are added at checkout
            q-btn.checkout-button.shadow-0.q-mr-no.q-ml-auto(
              color="primary"
              @click="$router.push('/checkout/customer_information')"
            ) Checkout
            q-item-separator.total-separator
            q-item.bottom-info.total.q-pl-xxxxsm.q-pr-xxxxsm
              q-item-main.uppercase total
              q-item-side(
                side="right"
              ).bottom-value.cart-total ${{ Math.ceil(cartTotal*100)/100 }}
                .currency {{ false || 'AUD' }}

</template>

<script>
export default {
  name: 'cart-comp',
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
    removeProduct(args){
      if(args.product){
        this.popThing({
          option: args.product,
          list: this.gosmart($store, 'state.alopu.entity.alopu.carts.0.products', []),
          keys: ['title']
        })
        this.$store.commit('thing', { path: 'cart', val: this.gosmart($store, 'state.alopu.entity.alopu.carts.0.products', [])})
      }
    }
  },
  props: {
    theme: {
      default: {}
    },
    banner: {}
  },
  computed: {
    cartShipping: {
      get(){
        return false
      },
      set(val){

      }
    },
    cartTotal: {
      get(){
        let list = this.gosmart($store, 'state.alopu.entity.alopu.carts.0.products', [])
        let total = 0
        for(var product of list){
          total += this.getThing({option: {'name': 'growlights.com.au marked up price'}, list: product.prices, keys: ['name']}).values['AUD']*product.count
        }
        return total
      }
    },
    cartSubtotal: {
      get(){
        let list = this.gosmart($store, 'state.alopu.entity.alopu.carts.0.products', [])
        let subtotal = 0
        for(var product of list){
          subtotal += this.getThing({option: {'name': 'growlights.com.au marked up price'}, list: product.prices, keys: ['name']}).values['AUD']*product.count
        }
        return subtotal
      }
    },
  },
  components: {
    banner: require('src/components/banner').default,
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
<style lang="sass" scoped>
@import 'src/styles/vars'
.cart-container
  width: 100%
  display: flex
  flex-shrink: 1
  height: auto
  // max-height: 90vh
  overflow: auto
  max-width: 100%
  justify-content: center
  .cart-positioner
    width: 100%
    max-width: 80vw
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
      .product-img
        position: relative
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
          font-size: 10px
          margin-right: -8px
          margin-top: -5px
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
      /deep/ .q-item-label
        text-align: center
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
        /deep/ img
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
        .q-item-separator-component
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
        /deep/ img
          width: 65px
          height: auto
        .product-count-chip
          display: flex
          border-radius: 50%

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
          display: none
          .price-container
            .price
              .currency
        .delete-positioner
          display: none
          .q-btn
      &.one
        .information-container
          .remove-btn
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
</style>

  .checkout-button
    width: auto
