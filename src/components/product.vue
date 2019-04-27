<template lang='pug'>
.product-container(
  :class=`{
    card,
    display: !card
  }`
)
  .product-positioner.full-width
    q-item.product(
      v-if=`productD`
    )
      q-item-main
        q-item-tile
          .product-image-container
            .product-image-positioner
              .product-image
                router-link(
                  :to='"/products/product/"+productD.title'
                ).full-width
                  img(
                    :src=`productD.thumbnail`
                  )

        q-item-tile.product-title
          router-link(
            :to='"/products/product/"+productD.title'
          ) {{ productD.title }}
        q-item-tile.product-price-container.text-right
          q-item-main.product-price-positioner(
          ).text-primary ${{ Math.ceil($s.getThing({option: {'name': 'growlights.com.au marked up price'}, list: productD.prices, keys: ['name']}).values['AUD']*100)/100 }}
            .currency {{ false || 'AUD' }}
        q-item-tile(
          v-if="!card"
        )
          .description.text-primary(
            v-html=`$s.getsmart(productD, 'short description', undefined)`
          )
        q-item-tile.add-to-cart-btn
          q-btn.full-width(
            color="primary"
            size="sm"
            @click="addToCart"
          ) add to cart
    .product-message.text-center(
      v-if=`!productD`
    ).full-width.text-center
      .message.color-lg There's no product here
      four
</template>

<script>
export default {
  name: 'product-comp',
  data () {
    return {
      // objects: null,
      productD: this.product,
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
    this.getProduct(this)
  },
  methods: {
    getProduct(args){
      if(!args.productD && args.productTitle){
        let product = this.getThing({
          option: { title: args.productTitle },
          list: this.$store.state.app.products,
          keys: ['title']
        })
        if(product){
          this.setsmart(this, 'productD', product)
        }
      }
    },
    // getObjects(opts){
    //   this.$socket.emit('getObjects', opts)
    // }
    addToCart(args){
      this.setsmart(this, '$store.state.app.cartSidebar', true)
      this.setsmart(this.productD, 'count', this.gosmart(this.productD, 'count', 0) + 1)
      this.setThing({
        option: this.productD,
        list: this.gosmart(this, '$store.state.alopu.entity.alopu.carts.0.products', []),
        keys: ['title'],
        push: true
      })

    }
  },
  props: {
    productTitle: {},
    product: {},
    card: {},
  },
  components: {
    'four': require('src/pages/404.vue').default
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
.product-container
  padding: 5px
  display: flex
  height: 100%
  justify-content: center
  &.display
    .product-positioner
      width: 700px !important
      max-width: 100%
    .product-price-container
      padding-bottom: 0px
      .product-price-positioner
        justify-content: flex-start
    .product-image
      img
    .add-to-cart-btn
      max-width: 150px
    .product-title
      margin-top: 20px
      max-width: 350px
    .description
      padding: 0px 0px 20px 0px
      *
        font-family: Montserrat
        color: inherit !important
        font-size: inherit !important
        margin: 0px
        font-weight: 700
        text-transform: uppercase
      strong
        font-weight: 800
      br
        height: 0px
      a
        display: none
      ul
        margin-top: -2px
      li
        padding-bottom: 5px
  &.card
    max-width: 250px
    @media(max-width: 1000px)
      max-width: 100%
    // padding: 10px
  .product-title
    word-wrap: break-word
    max-width: 230px
    font-family: Montserrat
    font-weight: 800
    font-size: 14px
  .product-price-container
    padding: 13px 0px 15px 0px
    font-family: Montserrat
    font-weight: 900
    // letter-spacing: .5px
    .product-price-positioner
      display: flex
      flex-direction: row
      justify-content: center
      align-items: flex-end
      font-size: 16px
      .currency
        font-size: 10px
  .product-image
    img
      max-width: 100%
  .add-to-cart-btn
    .q-btn-inner
      padding-top: 1px
  .q-btn
    font-family: Montserrat
    font-weight: 900
    letter-spacing: 1px
</style>
