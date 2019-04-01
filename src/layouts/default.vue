<template lang="pug">
	q-layout(
		view="HHH Lpr FFF"
		)
		q-layout-drawer(
			v-model="mainDrawer"
			side="left"
			:overlay="true"
			).z-top.q-flex.q-flex-column
			//- :noHideOnRouteChange="true"
			app-drawer(
			)
			
		q-page-container.q-pt-none
			router-view.router-view
		q-toolbar.fixed-top.q-nav-toolbar(
			color="primary"
			:overlay="true"
			)
			q-btn(
				icon="menu"
				@click="mainDrawer = !mainDrawer"
				size="1.2rem"
				).shadow-0.q-ml-auto.text-primary
</template>

<script>
/** components */
import appDrawer from 'src/components/app-drawer'
import smarts from 'smarts'
export default {
	mixins: [
		smarts({
			vue: {
				reactiveSetter: true
			}
		})
	],
	name: 'default',
	data(){
		return {
			False: false,
			wooo: true,
			siteTitle: 'alopu',
			uuid: this._uid,
			fbParams: {
				scope: 'email,public_profile',
				return_scopes: true
			},
			googleParams: {
				client_id: '975800988436-0hoego0l4bvdv0du05jivj538tnk91vl.apps.googleusercontent.com'
			}
		}
	},
	sockets: {
		connect: function(){
			// console.log("socket connect vue side")
		},
	},
	created(){
		// console.log(this)
	},
	methods: {
		register(){
			this.showLoginOptions = !this.showLoginOptions
		},
		logout(){
			this.$store.dispatch('logout')
		},
	},
	watch: {
		'entity.alopu.username'(){
			if(this.showLoginOptions && (this.entity.alopu.username || this.entity.alopu.username == 0)){
				clearTimeout(this.checkusername)
				var that = this
				this.checkusername = setTimeout(function(){
					that.$store.dispatch('checkUsernameAvailability', that.entity.alopu.username)
				}, 200)
			}
		},
		'$store.state.app.pageHistory': function(){
			this.pageHistory = this.$store.state.app.pageHistory
		},
		'$store.state.alopu.feedback'(){
			// let index = this.thingIn({option: { type: 'login' } , list: this.$store.state.alopu.feedback, keys: ['type'], retIndex: true})
			for(var i=0; i<this.getsmart(this, '$store.state.alopu.feedback.length', 0); i++){
				let feedback = this.$store.state.alopu.feedback[0]
				this.$q.notify(feedback)
				this.$store.commit('removefeedback', 0)
			}
		},
		'$store.state.alopu.dialog'(){
			// let index = this.thingIn({option: { type: 'login' } , list: this.$store.state.alopu.dialog, keys: ['type'], retIndex: true})
			for(var i=0; i<this.getsmart(this, '$store.state.alopu.dialog.length', 0); i++){
				let dialog = this.$store.state.alopu.dialog[0]
				this.$q.dialog(dialog)
				this.$store.commit('removedialog', 0)
			}
		},
		'$store.state.alopu.entity'(){
			this.entity = this.$store.state.alopu.entity
			if(this.$store.getters.loggedIn){
				this.$store.commit('showLoginOptions', false)
			}
		},
		'$store.state.app.showLoginOptions'(){
			this.showLoginOptions = this.$store.state.app.showLoginOptions
		},
		// '$store.state.app.mainDrawer'(){
		// 	this.mainDrawer = this.$store.state.app.mainDrawer
		// }
	},
	components: {
		appDrawer
	},
	computed: {
		navigator: {
			get(){
				return navigator
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
		mainDrawer: {
			get(){
				return this.$store.state.app.mainDrawer
			},
			set(val){
				this.$store.commit('mainDrawer', val)
			}
		},
		entity: {
			get(){
				return this.$store.state.alopu.entity
			},
			set(val){
				this.$store.commit('entity', {entity: val})
			}
		},
		pageHistory: {
			get(){
				return this.$store.state.app.pageHistory
			},
			set(val){
				this.$store.commit('pageHistory', val)
			}
		},
		feedback: {
			get(){
				return this.$store.state.alopu.feedback
			},
			set(val){
				this.$store.commit('feedback', val)
			}
		}


	}
}
</script>

<style lang="sass">
@import 'src/styles/vars'
html
	// cursor: url(/statics/cursors/ms/aero_link2.cur), pointer
	cursor: url(/statics/cursors/ms/aero_arrow.cur) 2 2, auto
#app
	font-family: 'Avenir', Helvetica, Arial, sans-serif
	-webkit-font-smoothing: antialiased
	-moz-osx-font-smoothing: grayscale
	// text-align: center
	color: $friendly
	// padding-top: 60px
	// min-height: 100vh
body
	margin: 0px
	&.cursor-pointer,
	&.cursor-pointer *
		cursor: url(/statics/cursors/ms/aero_link2.cur) 2 2, auto !important
h1,h2
	font-weight: normal

ul
	list-style-type: none
	padding: 0

li
	display: inline-block
	margin: 0 10px

a,
.action,
.fa-icon,
a:-webkit-any-link,
.btn,
.btn-container
	color: $green
	text-decoration: none
	// cursor: url(/statics/cursors/ms/aero_link1.cur), pointer
	// border-bottom: 1px dotted rgba($green, .5)
	+animate(all, 300ms, ease)
	cursor: url(/statics/cursors/ms/aero_arrow.cur) 2 2, auto
	animation: 400ms hoverMaple linear infinite
	&:hover
		color: $greenhover

	+keyframes(hoverMaple)
		0%
			cursor: url(/statics/cursors/ms/aero_link2.cur) 2 2, pointer 
		49%
			cursor: url(/statics/cursors/ms/aero_link2.cur) 2 2, pointer 
		50% 
			cursor: url(/statics/cursors/ms/aero_link1.cur) 2 2, auto 
		99% 
			cursor: url(/statics/cursors/ms/aero_link1.cur) 2 2, auto 
		100%
			cursor: url(/statics/cursors/ms/aero_link2.cur) 2 2, pointer 
	
.fa-icon
	user-select: none
button,
.btn
	color: $green
	// cursor: url(/statics/cursors/ms/aero_link1.cur), pointer
.content-editable
	outline: none
	padding: 5px
	&:focus
		// background: white
input
	color: $friendly
body
	background: $white
.router-view
	// padding-top: 50px
.v-select
	$font-size: 1rem
	font-size: $font-size
	line-height: $font-size
	height: 100%
	max-width: 100%
	.dropdown-toggle
		border: none !important
		border-radius: 0px !important
		// border-bottom: 1px solid $grey !important
		display: flex
		align-items: flex-start
		justify-content: flex-start
		flex-direction: column
		flex-wrap: wrap
		height: 100%
		max-width: 100%
		&:after
			display: none
		.input-container
			width: 100%
			max-width: 100%
			.form-control
				order: 1
				height: 100% !important
				max-width: 100%
				background: rgba(black, 0)
				font-size: $font-size
				line-height: $font-size
				font-family: $family
				padding: 0 4px
		.selected-tag-list
			order: 2
			max-width: 100%
			.selected-tag
				margin: 0
				margin-left: 4px
				padding: 0
				padding-right: 9px
				max-width: 100%
				height: auto
				font-size: $font-size
				line-height: $font-size + .3rem
				background: rgba(black, 0)
				color: $friendly
				font-family: $family
				width: auto
				border: none
				border-radius: 0px
				max-height: 100%
				white-space: normal
				position: relative
				text-transform: capitalize
				word-wrap: break-word
				&:first-child
					// margin-left: 4px
				button
					top: 0
					left: -5px
					position: absolute
					align-self: flex-start
					bottom: auto
					float: right
					font-size: .85rem
					line-height: .2rem
					// font-weight: 900
					color: rgba(darken($green, 0),.5)
					opacity: 1
		.open-indicator
			top: 0px
			display: flex
			align-self: flex-start
			align-items: center
			justify-content: center
			&:before
				height: 5px
				width: 5px
				border-width: 1px 1px 0 0
	.dropdown-menu
		border: 1px solid rgba($friendly, .15)
		display: flex
		align-items: flex-start
		justify-content: flex-start
		flex-direction: column
		text-transform: capitalize
		li
			margin-right: 4px
		.active,
			background-color: rgba($green, .5)
		.highlight
			background-color: $green
			a
				background-color: inherit
.mapboxgl-ctrl-logo
	display: none !important
.mapboxgl-ctrl-attrib
	display: none !important

// quasar style modifications
.q-pt-none
	// padding-top: 0px !important
.q-nav-toolbar
	background: rgba($green, 0) !important
	img
		width: 60px
		height: auto
		right: 0
		margin-right: 0px
		margin-left: auto
.text-primary
	color: $green !important
.q-chip
	margin-left: -16px !important
	top: -0.6rem !important
	padding: 0 10px !important
	min-height: 25px !important
.q-verified-status
	text-align: center
	justify-content: center
	img
		width: 20px
		height: auto
.q-item-tile-profile-picture
	img
		width: 60px
		height: auto
		border-radius: 50%
	width: auto
	height: auto
</style>

<style lang="stylus">
@import '~variables'

.q-nav-footer
	max-width: 100%
	margin: 5px
	background-color $negative
	// position: fixed !important
.q-layout-page-container
	padding-bottom: 0px !important

.fb-signin-button
	/* This is where you control how the button looks. Be creative! */
	display flex
	flex-direction row
	align-items center
	padding: 0px 5px 0px 15px
	background: #4460a0
	border-radius: 4px
	width: 100%
	height: 45px
	cursor: pointer
	padding-top: 1px
	transition: .2s
	-webkit-user-select: none
	-moz-user-select: none
	-ms-user-select: none
	user-select: none
	position: relative
	&:hover
		background #4a68ae
	.text
		width: 100%
		text-align: center
	img
		position: absolute
		left: 15px
		width: 16px
		height: 16px
		
.g-signin-button
	/* This is where you control how the button looks. Be creative! */
	display flex
	flex-direction row
	align-items center
	padding: 0px 5px 0px 15px
	border-radius: 4px
	width: 100%
	height: 45px
	cursor: pointer
	padding-top: 1px
	transition: .2s
	-webkit-user-select: none
	-moz-user-select: none
	-ms-user-select: none
	user-select: none
	position: relative	
	background-color #3f82f8
	&:hover
		background-color #4c8bf8
	.text
		width: 100%
		text-align: center
	img
		position: absolute
		left: 15px
		width: 16px
		height: 16px
.or
	color $gentleGrey
	text-transform: uppercase;
	font-size: 14px;
	letter-spacing: 2px;
	font-weight: 300;
	margin: 15px 0;
	color: $strongGrey;
	display: block;
	text-align: center;
	&:before
		margin-left: -120px;
		margin-top: 10px
		position: absolute
		content: ""
		height: 1px
		width: 110px
		opacity: .48
		background-color: $gentleGrey
	&:after
		margin-left: 10px
		margin-top: 10px
		position: absolute
		content: ""
		height: 1px
		width: 110px
		opacity: .48
		background-color: $gentleGrey
</style> 