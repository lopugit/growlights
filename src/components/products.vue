<template lang='pug'>
  .products-container
		.products-positioner
			.products
				template(
					v-for="product in products"
				)
</template>

<script>
let components = {
	product: require('src/components/product').default
}

export default {
  name: 'products-comp',
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
		getProducts(args){
			// this.$axios({
			// 	method: 'get',
			// 	url: `${this.$env.apiUrl}`,
			// 	params: {
			// 	}
			// })
			// .then(res=>{
			// 	console.log(res.data)
			// })
			// .catch(err=>{
			// 	console.error(err)
			// })
		}
  },
  props: {
		names
  },
  components: {
		...components
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
.products
  width: 100%
  max-width: 100%
  overflow: hidden
  // background: $grey
</style>
