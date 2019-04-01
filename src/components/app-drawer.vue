<template lang='pug'>
//- .app-drawer
q-list.q-flex.q-flex-column
	q-item(
		)
		q-item-side
			q-item-tile(
				avatar
				sparse
				@click="$store.dispatch('toggleMainDrawer')"
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
				@click="mainDrawer = !mainDrawer"
			).shadow-0
	q-list.no-border.q-pa-sm.q-pt-xl.q-mt-auto.q-mb-auto.full-width.text-white(
		:class=`{
			'flex': true,
			'column': showLoginOptions
		}`
		)
		//- q-item.full-width.q-pa-no.q-mb-xsmd(
			id="firebaseui-auth-container"
			)
		q-item.full-width.q-pa-no.q-mb-xsmd(
			v-show="showLoginOptions"
			)
			q-item-main.full-width
				fb-signin-button(
					:params="fbParams"
					@success="res => $store.dispatch('login', {token: Object.assign({provider: 'facebook'}, res), provider: 'facebook', success: true})"
					@error="res => $store.dispatch('login', {token: Object.assign({provider: 'facebook'}, res), provider: 'facebook', success: false})"
					) 
					img(
						src="https://dy6j70a9vs3v1.cloudfront.net/funnel_wap/static/files/32c47a476283bf5bb60f88935fc0815a/facebook_white.svg"
						)
					.text() Continue with Facebook
		q-item.full-width.q-pa-no(
			v-show="showLoginOptions"
			)
			q-item-main.full-width
				g-signin-button(
					:params="googleParams"
					@success="res => $store.dispatch('login', {token: Object.assign({provider: 'google'}, res), provider: 'google', success: true})"
					@error="res => $store.dispatch('login', {token: Object.assign({provider: 'google'}, res), provider: 'google', success: false})"
					) 
					img(
						src="https://dy6j70a9vs3v1.cloudfront.net/funnel_wap/static/files/45eaf69cf1018aa240cea767e822dc96/google_white.svg"
						)
					.text() Continue with Google
		span.or.full-width.q-mt-md.q-mb-md(
			v-show="showLoginOptions"
			) OR
		q-item.full-width.q-pa-no.q-mb-xs(
			v-show="showLoginOptions"
			)
			q-item-main.full-width.p-pa-no.q-ma-no(
				)
				form.full-width.q-pa-no.q-ma-no(
					v-on:submit.prevent="$store.dispatch('login', {provider: 'alopu'})"
					)
					q-input.q-mb-sm.no-shadow.border-1.round-borders(
						v-model='$store.state.alopu.entity.alopu.username'
						v-if="(entity && entity.alopu) && (entity.alopu.username || entity.alopu.username == undefined || entity.alopu.username == '' || entity.alopu.username.length >= 0) "
						float-label="Username or Email"
						color="white"
						inverted-light
						type="username"
					)
		q-item.full-width.q-pa-no.q-mb-xs(
			v-show="showLoginOptions"
			)
			q-item-main.full-width.p-pa-no.q-ma-no(
				)
				form.full-width.q-pa-no.q-ma-no(
					v-on:submit.prevent="$store.dispatch('login', {provider: 'alopu'})"
					)
					q-input.q-mb-sm.no-shadow.border-1.round-borders(
						v-model='$store.state.alopu.entity.alopu.password'
						v-if="(entity && entity.alopu) && (entity.alopu.password || entity.alopu.password == undefined || entity.alopu.password == '' || entity.alopu.password.length >= 0) "
						float-label="Password"
						color="white"
						inverted-light
						type="password"
					)
		q-item.full-width.q-pa-no.q-mb-xs(
			v-show="$s.getsmart(entity, 'alopu.password.length', 0) > 0 && showLoginOptions && $store.state.alopu.registerable"
			)
			q-item-main.full-width.p-pa-no.q-ma-no(
				)
				form.full-width.q-pa-no.q-ma-no(
					v-on:submit.prevent="$store.dispatch('login', {provider: 'n'})"
					)
					q-input.q-mb-sm.no-shadow.border-1.round-borders(
						v-model='$store.state.alopu.passwordConfirmation'
						float-label="Confirm password"
						color="white"
						inverted-light
						type="password"
					)
		q-item.full-width.q-pa-no.q-mb-xsmd(
			v-if="!$store.getters.loggedIn"
			)
			q-item-main.full-width(
				)
				q-btn.full-width(
					color="primary"
					@click="$store.dispatch('login', {provider: 'alopu'})"
				) {{ $store.state.alopu.registerable == 'haventchecked' ? 'login or register' : $store.state.alopu.registerable ? 'register' : 'login' }}
		q-item.full-width.q-pa-no.q-mb-xsmd(
			v-if="$store.getters.loggedIn"
			)
			q-item-main.full-width.text-tertiary(
			)
				q-btn.full-width(
					color="primary"
					@click="$store.dispatch('logout')"
					) logout
		//- q-item.full-width.q-pa-no.q-mb-xsmd(
			v-if="!$s.getsmart(entity, 'registered', false)"
			)
			q-item-main.full-width.text-tertiary(
				)
				q-btn.full-width(
					color="primary"
					@click="register"
					) register


</template>

<script>
export default {
	name: 'app-drawer',
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
		mainDrawer: {
			get(){
				return this.$store.state.app.mainDrawer
			},
			set(val){
				this.$store.commit('mainDrawer', val)
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
.app-drawer
	width: 100%
	max-width: 100%
	overflow: hidden
	display: flex
	align-items: flex-start
	justify-content: flex-start
	padding: 0
	margin: 0
	// background: $grey
</style>
