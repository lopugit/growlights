<template lang='pug'>
	.growlights-banner
		.growlights-banner-container
			img.logo(src='statics/growlights.com.au.png')
</template>

<script>
export default {
	name: 'growlights-banner-comp',
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
		"siteTitle": {}
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
<style lang="sass" scoped>
@import 'src/styles/vars'
.growlights-banner
	width: 100%
	max-width: 100%
	height: 150vh
	overflow: hidden
	-webkit-tap-highlight-color: green
	.growlights-banner-container
		display: flex
		width: 100%
		max-width: 100%
		align-items: center
		justify-content: center
		-webkit-tap-highlight-color: green
		.logo
			margin: 80px 10px 50px 10px
			-webkit-tap-highlight-color: green
			max-width: 300px
	// background: $grey
</style>
