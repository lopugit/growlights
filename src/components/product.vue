<template lang='pug'>
.product-container(
  :class=`{
    card: getsmart(things, 'card', undefined),
    showcase: getsmart(things, 'showcase', undefined),
  }`
)
  .product-positioner
    q-item.product(
      v-if=`getsmart(things, 'product', false)`
    )
      q-item-section
        q-item-label
          .product-image-container
            .product-image-positioner
              .product-image
                router-link(
                  :to=`"/product/"+getsmart(things, 'product.title', undefined)`
                ).full-width
                  img(
                    :src=`getsmart(things, 'product.thumbnail', undefined)`
                  )

        q-item-label.product-title
          router-link(
            :to=`"/product/"+getsmart(things, 'product.title', undefined)`
          ) {{ getsmart(things, 'product.title', undefined) }}
        q-item-label.product-price-container.text-right
          q-item-section.product-price-positioner(
          ).text-primary ${{ Math.ceil(getsmart(getThing({option: {'name': 'growlights.com.au marked up price'}, list: getsmart(things, 'product.prices', undefined), keys: ['name']}), 'values.AUD', 0)*100)/100 }}
            .currency {{ false || 'AUD' }}
        q-item-label(
          v-if="!getsmart(things, 'card', undefined)"
        )
          .description.text-primary(
            v-html=`getsmart(things, 'product.short description', undefined)`
          )
        q-item-label.add-to-cart-btn
          q-btn.full-width(
            color="primary"
            size="sm"
            @click="addToCart"
          ) add to cart
    .product-message.text-center(
      v-if=`!getsmart(things, 'product', undefined)`
    ).full-width.text-center
      four.relative-important(
        :style=`{
          'top': 'initial',
          'left': 'initial',
          'transform': 'none',
        }`
      )
      .message.color-lg.q-mt-sm There's no product here
</template>

<script>
export default {
  name: 'product-comp',
  data () {
    return {
      // objects: null,
      uuid: this._uid,
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
    this.setsmart(this, 'things.updateTimeout', setInterval(()=>{
      this.getProduct()
    }, 10000))
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
    this.getProduct()
  },
  methods: {
    getProduct(args){
      new Promise((resolve, reject)=>{
        if(this.getsmart(this.things, 'product.title', undefined) && !this.setsmart(this.things, 'productLoading', false)){
          this.setsmart(this.things, 'productLoading', true)
          setTimeout(()=>{
            this.setsmart(this.things, 'productLoading', false)
          }, 2000)
          new Promise((resolve, reject)=>{
            let prod = this.getThing({
                option: {
                  title: this.getsmart(this.things, 'product.title', undefined)
                },
                list: this.gosmart($store, 'state.app.products', []),
                keys: ['title']
              })
            if(prod && prod.types && this.getsmart(this.things, 'product.title', undefined) == prod.title && !this.equal(this.getsmart(this.things, 'product', undefined), prod)){
              this.setsmart(this.things, 'product',
                prod
              )
            }
            this.setsmart(this.things, 'productLoading', false)
          })
          this.gosmart(this, 'things.model', `growlights/${this.getsmart(this, '$env.level', 'dev')}/products`)
          this.gosmart(this, 'things.options', {
            limit: 1
          })
          this.gosmart(this, 'things.options.limit', 1)
          this.setsmart(this, 'things.query', {
            title: this.getsmart(this.things, 'product.title', undefined)
          })
          if(this.getsmart(this.things, 'query.title', false)){
            new Promise(async()=>{
              let res = await this.$axios({
                method: 'POST',
                url: `${this.$env.apiUrl}/monk/get`,
                data: {
                  query: this.getsmart(this.things, 'query', undefined),
                  options: this.getsmart(this.things, 'options', undefined),
                  model: this.getsmart(this.things, 'model', undefined),
                }
              })
              .catch(err=>{
                console.error('error posting monk/get product query', err)
                console.error(this.getsmart(err, 'response.data', undefined))
                this.setsmart(this.things, 'productLoading', false)
              })
              if(
                this.getsmart(res, 'data', undefined) instanceof Array &&
                this.getsmart(res, 'data.length', false)){
                if(this.getsmart(this.things, 'product.title', undefined) == this.getsmart(res, 'data.0.title', undefined) && !this.equal(this.getsmart(this.things, 'product', undefined), this.getsmart(res, 'data.0', undefined))){
                  this.setsmart(this.things, 'product', res.data[0])
                  new Promise(()=>{
                    this.setThing({
                      option: {
                        title: this.getsmart(this.things, 'product.title', '')
                      },
                      list: this.gosmart($store, 'state.app.products', []),
                      keys: ['title']
                    })
                    this.setsmart(this.things, 'productLoading', false)
                  })
                }
              } else if (this.getsmart(res, 'data.length', false) == 0){
                this.setsmart(this.things, 'productLoading', false)
              }
            })
          } else {
            this.setsmart(this.things, 'productLoading', false)
          }
        }
      })
    },
    // getObjects(opts){
    //   this.$socket.emit('getObjects', opts)
    // }
    addToCart(args){
      this.setsmart(this.$store, 'state.app.entity.alopu.carts.0.lastUpdated', Date.now())
      this.setsmart(this, '$store.state.app.cartSidebar', true)
      let product = this.getThing({
        option: {
          title: this.getsmart(this.things, 'product.title')
        },
        list: this.gosmart(this, '$store.state.app.entity.alopu.carts.0.products', []),
        keys: ['title']
      }) || this.getsmart(this.things, 'product', undefined)
      if(product){
        this.setsmart(product, 'count', this.gosmart(product, 'count', 0) + 1)
        this.setThing({
          option: product,
          list: this.gosmart(this, '$store.state.app.entity.alopu.carts.0.products', []),
          keys: ['title'],
          push: true
        })
      } else {
        console.error('there was no product to add to cart!')
      }

    }
  },
  props: {
  },
  components: {
    'four': require('src/pages/Error404.vue').default
  },
  watch: {
    'things.product.title': {
      handler: function(n,o){
        this.getProduct(this)
      }
    }
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
  width: auto
  justify-content: center
  &.showcase
    width: 100%
    .product-positioner
      // width: 700px !important
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
