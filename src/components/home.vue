<template lang='pug'>
q-page
	.home.home-positioner lel
</template>

<script>
import smarts from 'smarts'
export default {
	name: 'home',
	mixins: [
		smarts({
			vue: {
				reactiveSetter: true,
				vm: 'this'
			}
		})
	],
	data () {
		return {
			// objects: null,
			uuid: this.$uuid.v4(),
			mapboxglAccessToken: "pk.eyJ1IjoibG9wdSIsImEiOiJjamFydTVhc3QxNjRtMzNwaHEzNmJ1bW0zIn0.Wm7f-1eyd7K5AT3WN7fRDw",
			funCounter: 1
		}
	},
	sockets: {
		connect: function(){
		},
	},
	created () {
	},
	methods: {
	},
	computed: {
	},
	props: {
	},
	components: {
	},
	watch: {
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
.home
	width: 100%
	max-width: 100%
	overflow: hidden
	min-height: 100vh
	.splash-container
		min-height: 100vh
		background: $green
		// padding-top: 60px
		width: 100%
		align-items: flex-start
		justify-content: center
		display: flex
		flex-direction: column
		box-sizing: border-box
		.splash-positioner
			width: 100%
			height: 100%
			.splash
				width: 100%
				height: 100%
				align-items: flex-start
				justify-content: center
				display: flex
				flex-direction: column
				position: relative
				.particles-container
					position: absolute
					top: 0
					left: 0
					width: 100%
					min-height: 100vh
					height: 100%
					.particles-positioner
						width: 100%
						height: 100%
						.particles
							width: 100%
							height: 100%
							.vue-particles
								height: 100%
								width: 100%
								canvas
									height: 100%
									width: 100%
				.search-container
					width: 100%
					min-height: 100vh
					padding-top: 60px
					padding-bottom: 10%
					top: 0
					left: 0
					display: flex
					align-items: center
					justify-content: center
					flex-direction: column
					.search-positioner
						width: 100%
						display: flex
						align-items: center
						justify-content: flex-start
						flex-direction: column
						.search
							width: 100%
							display: flex
							align-items: center
							justify-content: center
							flex-direction: column
							max-width: 500px
							.q-search
								// margin-top: -15px
								padding: 15px
								// max-width: 95%
								.q-if-inner
									min-height: 24px !important
									padding-top: 0px !important
								.q-if-label
									// top: 3px
								.q-if-label-above
									// transform: scale(0.75) translate(0, -21px)
								input
									width: 280px
									&::selection
										color: $green
										background: rgba($green, .3)
									// max-width: 90%
							.addresses-container
								width: 100%
								max-width: 100%
								padding: 0px 10px
								padding-bottom: 30px
								.addresses-positioner
									.addresses
										.address-container  
											.address-positioner
												padding-bottom: 20px
												.address
													position: relative
													.q-chip-address-delete
														right: -5px
														left: auto
														// top: auto !important
														// bottom: 0
														border-radius: 5px
													&:hover
														.q-chip-address-delete
															display: inline-flex !important
															opacity: 1
													.all-goods-container
														margin-top: 13px
														max-width: 100%
														.all-goods-positioner
															display: flex
															max-width: 100%
															align-items: flex-start
															justify-content: flex-start
															flex-direction: row
															flex-wrap: wrap
															.all-goods
																display: flex
																max-width: 100%
																align-items: flex-start
																justify-content: flex-start
																flex-direction: column
																padding-bottom: 7px
																flex-wrap: wrap
																.goods-container
																	.goods-positioner
																		padding-bottom: 15px
																		.goods
																			display: flex
																			max-width: 100%
																			align-items: flex-start
																			justify-content: flex-start
																			flex-direction: row
																			padding-bottom: 7px
																			flex-wrap: wrap
																			.good
																				margin-right: 20px
																				margin-bottom: 13px
																				display: flex
																				align-items: center
																				justify-content: center
																				flex-direction: column
																				position: relative
																				order: 1
																				&.placeholder
																					order: 1
																				.q-chip-good-delete
																						left: 8px
																						right: auto
																						border-radius: 5px
																				&:hover
																					.q-chip-good-delete
																						display: inline-flex !important
																						opacity: 1
																				img
																					height: 40px
																					z-index: 100
																					// width: 40px
																				.good-name-container
																					position: relative
																					display: flex
																					justify-content: center
																					align-items: center
																					.good-name-positioner
																						position: relative
																						top: 0
																						display: flex
																						justify-content: center
																						align-items: center
																						.good-name
																							display: flex
																							justify-content: center
																							align-items: center
																							font-size: .77rem
																							text-align: center
																			.add-good
																				order: 2
																				// padding: 3px
																				margin-top: 5px
																				margin-left: 2px
																				// width: 30px
																				// height: 30px
																				background: white
																				border-radius: 3px
																				display: flex
																				align-items: center
																				justify-content: center
																				box-shadow: 0px 3px 8px -1px rgba(black, .2)
																				.add
																					// position:
																					color: $green
																					font-size: 1.3rem
													.map-container
														// display: none
														width: 100%
														margin-top: 5px
														.map-positioner
															width: 100%
															.map
																width: 100%
																// min-height: 100vh
																display: flex
																align-items: center
																justify-content: center
																flex-direction: column
																
								.additional-actions-container
									margin-top: 10px
									.action
										color: white
									.add-address-btn
										// margin-top: 5px
										// margin-bottom: 5px
										.q-btn-inner
											&::before
											// color: black !important
								
				
	// background: $grey
//quasar mods
.q-chip-delete
	padding: 0px 5px !important
	min-height: 20px !important
	margin-left: -20px !important
	top: -0.5rem !important
	// display: none !important
	opacity: 0
	pointer-events: all
	+animate(all, 200ms, ease)
	.q-chip-main
		display: flex
		align-items: center
		justify-content: center
		padding: 3px 0px !important
	&:hover
		display: inline-flex !important
		opacity: 1
</style>

<style lang="stylus">
@import '~variables'
</style>