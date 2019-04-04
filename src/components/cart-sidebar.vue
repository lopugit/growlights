<template lang='pug'>
//- .sidebar
q-list.q-flex.q-flex-column.sidebar
	q-item(
		)
		q-item-side
			q-item-tile(
				avatar
				sparse
				@click="$store.state.app.cartSidebar = !$store.state.app.cartSidebar"
				).q-item-tile-profile-picture
				//- :style=`{
				//-   height: '50px',
				//-   width: 'auto'
				//- }`
				img.q-circle-img(
					:src=`$store.getters.cover()`
					)
		q-item-main(
		)
			q-item-tile(
				label
				:style={
					'text-transform': 'capitalize'
				}
			) {{ $store.getters.username() }}
			q-item-tile(
				sublabel
				size=".5rem"
				) {{ $store.getters.ego(0) }}
		q-item-side(
			)
			q-btn(
				icon="close"
				@click="$store.state.app.cartSidebar = !$store.state.app.cartSidebar"
			).shadow-0
	q-list.no-border.main-list.q-pa-sm.q-pt-xxxxsm.q-mt-auto.q-mb-sm.full-width
		q-item.your-cart.full-width(
			)
			//- q-item-side.q-square-img.q-br-xs(
			//- 	:avatar="`statics/trolley.png`"
			//- )
			q-item-main(
				:label="'your cart'"
				).text-cap.text-center
		q-list.product-list.no-border.q-pa-no
			template(
				v-for="product in $store.state.app.cart"
			)
				q-item-separator
				q-item.cart-product(
					)
					q-item-side.q-square-img.q-br-xs(
						:avatar="`${product.thumbnail}`"
					)
					q-item-main(
						).text-cap
						.information-positioner.one
							.information-container
								.title-positioner
									.title-container
										router-link(
											:to='"/products/"+product.title'
										)
											a.title {{ product.title }}
								.delete-positioner
									.delete-container
										q-btn.remove-btn.q-ml-auto(
											color="red"
											size="sm"
											@click="removeProduct({product})"
											flat
										) X
						.information-positioner.two
							.information-container
								.count-positioner
									.count-container
										q-btn.count-minus.count-btn(
											color="primary"
											size="xs"
											@click="product.count > 1 ? product.count-- : product.count = 1"
											flat
										) -
										.count {{ product.count }}
										q-btn.count-minus.count-btn(
											color="primary"
											size="xs"
											@click="product.count++"
											flat
										) +
								.cost-positioner.q-ml-auto
									.cost-container
										.cost ${{ Math.ceil(229*product.count) }}
		q-item-separator
		q-item.full-width.subtotal.q-pl-xxxxsm.q-pr-xxxxsm
			q-item-main.uppercase subtotal
			q-item-side(
				side="right"
			).cart-subtotal ${{ 229*$store.state.app.cart.length }}
		.message.q-pa-sm.q-pt-no.q-pb-smd.text-center Shipping and discount codes are added at checkout
		q-btn.full-width.nav-button.shadow-0.q-mr-no.q-ml-no(
			color="primary"
			@click="$router.push('checkout')"
		) Checkout

</template>

<script>
export default {
	name: 'sidebar',
	data () {
		return {
			// objects: null,
			uuid: this._uid,
			fbParams: {
				scope: 'email,public_profile',
				return_scopes: true
			},
			googleParams: {
				client_id: '278663639558-du8pit378au8cvkm22s1vv02be65dmru.apps.googleusercontent.com'
			}
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
				this.$s.popThing({
					option: args.product,
					list: this.$store.state.app.cart,
					keys: ['title']
				})
			}
		}
		// getObjects(opts){
		//   this.$socket.emit('getObjects', opts)
		// }
	},
	props: {
		"siteTitle": {}
	},
	computed: {
		entity: {
			get(){
				return this.$store.state.alopu.entity
			},
			set(val){
				this.$store.commit('entity', {entity: val})
			}
		},
		showLoginOptions: {
			get(){
				if(this.$store.getters.loggedIn){
					return false
				} else {
					return this.$store.state.app.showLoginOptions
				}
			},
			set(val){
				this.$store.commit('showLoginOptions', val)
			}
		},
	},
	components: {
		
	},
	watch: {
		'$store.state.app.showLoginOptions'(){
			this.showLoginOptions = this.$store.state.app.showLoginOptions
		},
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
.sidebar
	// width: 100%
	// max-width: 100%
	// overflow: hidden
	max-height: 100vh
	// display: flex
	// align-items: flex-start
	// justify-content: flex-start
	// padding: 0
	// margin: 0
	.main-list
		min-height: 100%
		max-height: 100%
		overflow: hidden
		display: flex
		flex-direction: column
		// flex-shrink: 1
		align-items: flex-start
		.product-list
			max-height: auto
			overflow: auto
	// background: $grey
	.information-positioner
		.information-container
			display: flex
			flex-direction: row
			align-items: center
			.title-positioner
				.title-container
					.title
						// color: black
			.count-positioner
				display: flex
				margin-top: 10px
				.count-container
					display: flex
					flex-direction: row
					align-items: center
					border: 1px solid rgba(0,0,0,.2)
					width: auto
					border-radius: 5px
					.count
						padding: 0px 5px
			.cost-positioner
				margin-top: 8px
				.cost-container
					.cost
		&.one
			.information-container
				align-items: flex-start
				.remove-btn
					margin-top: -8px
					margin-right: -5px
	.cart-product
		padding-left: 5px
		padding-right: 5px
		font-size: 14px
	.message
		color: rgba(black, .5)
		font-size: 12px
	.cart-subtotal
		color: black
	.subtotal
		font-size: 14px
	
</style>
