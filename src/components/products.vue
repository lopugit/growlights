<template lang='pug'>
.products-container
  .products-positioner
    .section.q-justify-center.q-mb-lg
      q-select.q-border-1.q-border-round-md.q-pa-sm.q-pt-xxsm.full-width.q-max-width-800(
        use-input
        hide-selected
        label="Search eg. 400W, Black Dog, LED, HPS"
        text-color="black"
        :value="gosmart($store, 'state.app.test', '')"
        @input="setsmart($store, 'state.app.test', $event)"
        @filter="(val)=>{setsmart($store, 'state.app.test', val)}"
        :options=`['test1', 'test2', 'test3']`
      )
    q-list.products.no-border.q-pa-no
      q-spinner(
        v-if="!products.length && !timeout"
        color="primary"
        size="90px"
      )
      template(
        v-for="product in products"
      )
        product(
          :product=`product`
          :card=`cards`
        )
    .load-more(
      v-if=`products.length`
    ).text-center
      q-btn(
        color="primary"
      ) Load More {{ `${productTypeD}${(productTypeD[productTypeD.length-1] == 's' || productTypeD[productTypeD.length-1] == 'S') ? '' : 's'}`}}
    .no-products-message(
      v-if=`!products.length`
    ).text-center
      .message.color-lg.wtf There's no products here
      four

</template>

<script>
export default {
  name: 'products-comp',
  data () {
    return {
      // objects: null,
      productTypeD: this.productType,
      timeout: false,
      uuid: this._uid,
      products: []
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
    setTimeout(()=>{
      this.timeout = true
    },2000)
    this.getProducts(this)
  },
  methods: {
    getProducts(args){
      console.log(args.$env.apiUrl)
      var model
      if(!args.model){
        model = 'thing'
      } else {
        model = args.model
      }
      var query
      if(!args.query && args.productType){
        query = {
          type: args.productType
        }
      } else {
        query = args.query
      }
      if(query){
        this.productTypeD = query.type
        this.$axios({
          method: 'POST',
          url: `${this.$env.apiUrl}/mongodb/query`,
          data: {
            query,
            model,
          }
        })
        .then(res=>{
          if(res.data && res.data instanceof Array){
            let list = this.$store.state.app.products
            this.pushThings({
              options: res.data,
              list,
              keys: ['title'],
              obj: true
            })
            this.$store.commit('thing', {
              path: 'products',
              val: list
            })
            this.$set(this, 'products', res.data)
          }
        })
        .catch(err=>{
          console.error(err)
        })
      }
    }
  },
  props: {
    productType: {},
    query: {},
    model: {},
    cards: {}
  },
  components: {
    product: require('src/components/product').default,
    four: require('src/pages/Error404').default,
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
.products-container
  width: 100%
  max-width: 100%
  overflow: hidden
  padding-bottom: 20px
  // background: $grey
  padding-left: 5%
  padding-right: 5%
  @media(max-width: 800px)
    padding-left: 3%
    padding-right: 3%
  .products-positioner
    .products
      display: flex
      align-items: flex-start
      justify-content: center
      flex-direction: row
      flex-wrap: wrap
      // width: 100vw
      max-width: 100%
      flex: 1 1 auto
  .load-more
    margin-top: 50px
  .no-products-message
    margin-top: 10px
</style>
