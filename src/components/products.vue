<template lang='pug'>
.products-container.justify-center(
  :class=`things.theme`
  )
  .products-positioner.align-center.flex-column
    .section.search-section.q-justify-center.q-ml-xxl-bp-min-sm.q-pt-lg.q-mt-xxxxl
      q-input.no-underline.o-hidden.q-border-1.font-17.q-border-round-md.full-width.q-max-width-450(
        hide-selected
        filled
        placeholder="Search eg. 400W, Black Dog, LED, HPS"
        text-color="black"
        :value="gosmart($store, 'state.app.test', '')"
        @input=`
          setsmart(things, 'searching', true)
          setsmart($store, 'state.app.test', $event)
          $native.setTimeout(()=>{
            setsmart(things, 'searching', false)
          }, 2000)
          `
      )
        template(v-slot:append)
          q-spinner(
            v-if="getsmart(things, 'searching', false)"
          )
      q-select.bg-none.border-no.no-underline(
        :hide-selected=`true`
        :value=`gosmart(things, 'searchSelected', 'All Categories')`
        @input=`setsmart(things, 'searchSelected', $event)`
        :options=`[
          'All Categories',
          'Grow Lights',
          'Grow Rooms',
          'Grow Kits',
          'Additives',
          'Accessories',
        ]`
        hide-dropdown-icon
      )
        template(v-slot:prepend)
          q-icon.q-ma-sm.q-mr-no-important.font-28(
            name="tune"
          )
        template(v-slot:append)
          q-icon.q-ml-no-important.q-mr-no-important.q-ma-sm.font-28(
            name="arrow_drop_down"
          )
    q-infinite-scroll.no-border.q-pa-no(
      @load=`getMoreProducts`
    )
      q-list.products.flex-row.flex-wrap.justify-center.align-end.no-border.q-pa-no
        template(
          v-for="product in getsmart(things, 'products', [])"
        )
          // :key=`product.title`
          product(
            :props=`{
              product,
              card: getsmart(things, 'cards', undefined)
            }`
          )
    .load-more(
    ).text-center.flex-column.align-center.w-auto.flex-shrink
      .no-more-products.color-lg.q-mb-xxxxlg.q-mt-lg(
        v-if=`getsmart(things, 'no more products', false) && !getsmart(things, 'productsLoading', false)`
      ) No more products
      .spinner-container.animate(
        :class=`{
          'q-mb-xlg': getsmart(things, 'productsLoading', false),
          'q-mt-md': getsmart(things, 'productsLoading', false),
          'q-mb-no': !getsmart(things, 'productsLoading', false),
          'q-mt-no': !getsmart(things, 'productsLoading', false),
        }`
      )
        q-spinner.text-primary.font60(
          v-if=`getsmart(things, 'productsLoading', false)`
        )
      q-btn.q-mt-xlg.text-md.q-pl-xl.q-pr-xl.q-pt-md.q-pb-md(
        v-if=`!getsmart(things, 'no more products', false) && getsmart(things, 'products.length', 0)`
        @click=`getMoreProducts`
        color="primary"
      ) Load More {{
        | getsmart(things, 'query.types.$in.0', 'products')+
        | (
        |   (
        |     getsmart(things, 'query.types.$in.0.'+(getsmart(things, 'query.types.$in.0.length', 1) - 1).toString(), 's') == 's' ||
        |     getsmart(things, 'query.types.$in.0.'+(getsmart(things, 'query.types.$in.0.length', 1) - 1).toString(), 's') == 'S'
        |   )
        |     ? '' : 's'
        | )
        | }}
    .no-products-message(
      v-if=`!getsmart(things, 'products.length', 1) && !getsmart(things, 'productsLoading', false)`
    ).text-center
      // .message.color-lg.q-mb-xl There's no products here
      four.relative-important(
        :style=`{
          'top': 'initial',
          'left': 'initial',
          'transform': 'none',
        }`
      )

</template>

<script>
import { Promise } from 'q';
export default {
  name: 'products-comp',
  data () {
    return {
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
  created() {
    setTimeout(()=>{
      this.setsmart(this.things, 'productsLoading', false)
    },5000)
    this.getProducts()
  },
  methods: {
    getMoreProducts: function(args, done){
      if(!this.getsmart(this.things, 'productsLoading', false) && !this.getsmart(this.things, 'no more products', false)){
        new Promise((resolve, reject)=>{
          this.setsmart(this.things, 'keepProducts', true)
          this.setsmart(this.things, 'options.limit', 12)
          this.setsmart(this.things, 'options.skip',
            this.getsmart(this.things, 'options.skip', 0) + this.gosmart(this.things, 'options.limit', 12)
          )
          this.getProducts(done)
          this.setsmart(this.things, 'keepProducts', false)
        })
      } else {
        typeof done == 'function' && done()
      }
    },
    getProducts: async function (done){
      if(!this.getsmart(this, 'things.productsLoading', false)){
        this.setsmart(this, 'things.productsLoading', true)
        new Promise((resolve, reject)=>{
          this.setsmart(this, 'things.productsLoading', true)
          setTimeout(()=>{
            this.setsmart(this, 'things.productsLoading', false)
          }, 2000)
          if(!this.getsmart(this, 'things.keepProducts', false)){
            this.setsmart(this, 'things.products', [])
          }
          this.gosmart(this, 'things.model', `growlights/${this.getsmart(this.$env, 'level', 'dev')}/products`)
          this.gosmart(this, 'things.options', {
            limit: 12
          })
          this.gosmart(this, 'things.options.limit', 12)
          this.gosmart(this, 'things.query', {
            types: {
              $in: ['product']
            }
          })
          if(this.getsmart(this, 'things.query', false)){
            let resCached = this.getsmart(this.$store,
              'state.app.caches.queries.' + this.stringify({
                query: this.getsmart(this, 'things.query', false),
                options: this.getsmart(this, 'things.options', false),
                model: this.getsmart(this, 'things.model', false),
              }),
              undefined
            )
            if(this.getsmart(resCached, 'data', undefined) instanceof Array && this.getsmart(resCached, 'data.length', false)){
              new Promise((resolve, reject)=>{
                this.setThings({
                  options: resCached.data,
                  list: this.getsmart(this.$store, 'state.app.products', []),
                  keys: ['title'],
                  push: true,
                  async: true
                })
              })
              new Promise((resolve, reject)=>{
                this.setThings({
                  options: resCached.data,
                  list: this.getsmart(this, 'things.products', []),
                  keys: ['title'],
                  push: true,
                  async: true
                })
                setTimeout(()=>{
                  this.setsmart(this, 'things.productsLoading', false)
                }, 300)
              })
              // this.setsmart(this, 'things.productsLoading', false)
            }
            new Promise(async (resolve, reject)=>{
              let res
              res = await this.$axios({
                method: 'POST',
                url: `${this.$env.apiUrl}/monk/get`,
                data: {
                  query: this.getsmart(this, 'things.query', undefined),
                  options: this.getsmart(this, 'things.options', undefined),
                  model: this.getsmart(this, 'things.model', undefined),
                }
              })
              .catch(err=>{
                console.error(err)
                this.setsmart(this, 'things.productsLoading', false)
                typeof done == 'function' && done()
              })
              this.setsmart(this.things, 'promises.productQuerySet.' + this.stringify({
                  query: this.getsmart(this, 'things.query', false),
                  options: this.getsmart(this, 'things.options', false),
                  model: this.getsmart(this, 'things.model', false),
                }),
                new Promise((resolve, reject)=>{
                  let cached = this.getsmart(this.$store,
                    'state.app.caches.queries.' + this.stringify({
                      query: this.getsmart(this, 'things.query', false),
                      options: this.getsmart(this, 'things.options', false),
                      model: this.getsmart(this, 'things.model', false),
                    }),
                    undefined
                  )
                  if(this.getsmart(cached, 'data', undefined) instanceof Array){
                    // we take the server things out of the cached server result, effectively diffing the cached result and leaving the old data
                    this.popThings({
                      options: res.data,
                      list: cached,
                      keys: ['title']
                    })
                    // we then remove the old data from the current list of products rendered on screen
                    this.popThings({
                      options: cached,
                      list: this.getsmart(this, 'things.products', []),
                      keys: ['title']
                    })
                  }
                  // and then we push server results
                  resolve()
                })
              )
              if(this.getsmart(res, 'data', undefined) instanceof Array && this.getsmart(res, 'data.length', false)){
                new Promise((resolve, reject)=>{
                  this.setThings({
                    options: res.data,
                    list: this.getsmart(this.$store, 'state.app.products', []),
                    keys: ['title'],
                    push: true
                  })
                })
                let prom = this.getsmart(this.things, 'promises.productQuerySet.' + this.stringify({
                  query: this.getsmart(this, 'things.query', false),
                  options: this.getsmart(this, 'things.options', false),
                  model: this.getsmart(this, 'things.model', false),
                }), true)
                new Promise(async ()=>{
                  await prom
                  this.setThings({
                    options: res.data,
                    list: this.getsmart(this, 'things.products', []),
                    keys: ['title'],
                    push: true
                  })
                  this.setsmart(this, 'things.productsLoading', false)
                  typeof done == 'function' && done()
                })
              } else if (this.getsmart(res, 'data.length', false) == 0){
                this.setsmart(this, 'things.productsLoading', false)
                this.setsmart(this, 'things.no more products', true)
                typeof done == 'function' && done()
              }
              // we wait for the server query to finish before updating the server query local cached result so we can check what changed
              let prom = this.getsmart(this.things, 'promises.productQuerySet.' + this.stringify({
                query: this.getsmart(this, 'things.query', false),
                options: this.getsmart(this, 'things.options', false),
                model: this.getsmart(this, 'things.model', false),
              }), true)
              new Promise(async ()=>{
                await prom
                this.setsmart(this.$store,
                  'state.app.caches.queries.' + this.stringify({
                    query: this.getsmart(this, 'things.query', false),
                    options: this.getsmart(this, 'things.options', false),
                    model: this.getsmart(this, 'things.model', false),
                  }),
                  {
                    data: this.getsmart(res, 'data', undefined),
                    when: Date.now()
                  }
                )
              })
            })
          } else {
            typeof done == 'function' && done()
          }
        })
      } else {
        typeof done == 'function' && done()
      }
    }
  },
  components: {
    product: require('src/components/product').default,
    four: require('src/pages/Error404').default,
  },
  watch: {
    'things.query': {
      handler: function(n, o){
        if(!this.equal(n,o)){
          this.setsmart(this.things, 'keepProducts', false)
          this.setsmart(this.things, 'options', { limit: 12 })
          this.setsmart(this.things, 'no more products', false)
          this.getProducts(this)
        }
      },
      deep: true
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
    width: 1200px !important
    max-width: 100%
    .products
      max-width: 100%
      margin-top: -7px
      /deep/ .product-container
        margin-top: 120px
        margin-left: 5px
        margin-right: 5px
  .load-more
    margin-top: 50px
  .no-products-message
    margin-top: 10px
  .search-section
    display: none
    width: 500px
    max-width: 100%
  &.search
    .search-section
      display: flex
</style>
