<template lang='pug'>
	q-toolbar.fixed-top.q-nav-toolbar.navbar(
		color="primary"
		:overlay="true"
		)
		q-btn(
			icon="menu"
			@click="$store.state.app.leftSidebar = !$store.state.app.leftSidebar"
			size="1.2rem"
			).shadow-0.text-primary
		div.q-ml-auto
		template(
			v-for="nav in $store.state.app.navigation"
		)
			q-btn.nav-button.shadow-0.q-mr-xsmd(
				color="primary"
				@click="$router.push(nav.link)"
				flat
			) {{ nav.name }}
		div.q-mr-auto
		q-btn(
			color="primary"
			@click="$store.state.app.leftSidebar = true ; $store.dispatch('login', {provider: 'alopu'})"
			v-if="$store.state.alopu.entity == $store.state.alopu.entityDefault"
		).shadow-0.q-mr-xsmd {{ $store.state.alopu.registerable == 'haventchecked' ? 'members' : $store.state.alopu.registerable ? 'register' : 'login' }}
		q-btn(
			icon="shopping_basket"
			@click="$store.state.app.cartSidebar = !$store.state.app.cartSidebar"
			size="1.2rem"
			).shadow-0.text-primary
			q-chip(
				v-if="$store.state.app.cart.length"
				floating
				color="primary"
				small
			).q-circle.cart-chip {{ $store.state.app.cart.length }}

</template>

<script>
export default {
	name: 'navbar-comp',
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
<style lang="sass">
@import 'src/styles/vars'
.navbar
	width: 100%
	max-width: 100%
	flex-wrap: wrap
	overflow: hidden
	.nav-button
		margin-left: 1%
		margin-right: 1%
		@media screen and (max-width: 920px)
			display: none
	.cart-chip
		min-height: 0px !important
		min-width: 0px !important
		width: 17px
		height: 17px
		padding: 0px !important
		margin-top: 15px
		margin-right: 12px !important
		border: 1px solid white
		font-size: 10px
		.q-chip-main
			margin-bottom: 1px
</style>
