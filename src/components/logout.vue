<template lang='pug'>
	//- .logout(v-if="!entity || (entity && !entity.auth)")
	//-   .logout-sizer
	//-     .errMsg(v-if="errMsg") {{ errMsg }}
	//-     .feedbackMsg(v-if="feedbackMsg && entity.username") {{ feedbackMsg }}
	//- .logout(v-else-if="entity.username")
	//-   .msg.thanks {{ feedbackMsg }}
	.logout
		.logout-sizer
			.feedbackMsg {{ getsmart($store, 'state.app.entity.registered', false) ? 'Logged out' : "You aren't logged in :O" }}
</template>

<script>
export default {
	name: 'logout-comp',
	data () {
		return {
			entity: this.$store.state.entity,
			errMsg: "thanks for Logged out",
			feedbackMsg: "thanks for Logged out",
			uuid: this._uid
		}
	},
	sockets: {
		connect: function(){
			// console.log("module %s connect vue side", this.$options.name)
		}
	},
	created () {
		if(this.$store.state.app.entity.registered){
			this.$store.dispatch('logout')
		}
		this.$router.push('/')
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
		this.logout()
	},
	methods: {
		logout(){
			let opts = {}
			this.$socket.emit('logout', opts)
		}
	},
	watch: {
		'$store.state.entity': function(){
			this.entity = this.$store.state.entity
		}
	},
	props: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import 'src/styles/vars'
.logout
	display: flex
	align-items: center
	justify-content: center
	width: 100%
	height: auto
	.logout-sizer
		width: auto
		height: auto
		max-width: 100%
		overflow: hidden
		background: $grey
		padding: 20px
		display: flex
		align-items: center
		justify-content: center
		flex-direction: column
		form
			width: auto
			height: auto
		input,
		button
			display: block
			margin-top: 5px
			margin-bottom: 5px
</style>
