<template lang='pug'>
  .login-small(v-if="!entity || (entity && !entity.auth)")
    .login-form
      input(v-model='fields.username' @keyup.enter="login" type="text" placeholder='username')
      input(v-model='fields.password' @keyup.enter="login" placeholder='password' type='password')
      button(v-on:click="login" type="button") login
      router-link(to="/register")
        button register
    .messages-container(v-if="errMsg || feedbackMsg")
      .errMsg(v-if="errMsg") {{ errMsg }}
      .feedbackMsg(v-if="feedbackMsg") {{ feedbackMsg }}
</template>

<script>
export default {
  name: 'login-small-comp',
  data () {
    return {
      entity: this.$store.state.entity,
      fields: {
        username: null,
        password: null,
      },
      uuid: this._uid,
      errMsg: null,
      feedbackMsg: null
    }
  },
  sockets: {
    connect: function(){
      console.log("module %s connect vue side", this.$options.name)
    },
    giveLogin(data){
      // console.log(data)
      if(data.success){
        this.feedbackMsg = data.msg || 'successfully logged in'
      } else {
        this.errMsg = data.msg || 'something went wrong logging in'
      }
    }
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
  watch: {
    '$store.state.entity': function(){
      this.entity = this.$store.state.entity
    }
  },
  methods: {
    login(){
      let credentials = {
        username: this.fields.username,
        password: this.fields.password
      }
      console.log('emitting')
      this.$socket.emit('login', credentials)
    },
    clearFields(){
      for(let field in this.fields){
        if(this.fields.hasOwnProperty(field)){
          this.fields[field] = null
        }
      }
      // this.fields.forEach(field=>{
      // })
    }
  },
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import 'src/styles/vars'
.login-small
  width: auto
  height: auto
  max-width: 100%
  overflow: visible
  background: $grey
  position: relative
  // display: flex
  // align-items: flex-start
  .messages-container
    position: absolute
    top: 100%
    height: auto
    font-size: .65rem
</style>
