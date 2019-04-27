<template lang='pug'>
  .register(v-if="!entity || (entity && !entity.auth)")
    .register-sizer
      //- form
      input(v-model='fields.username' placeholder='username')
      input(v-model='fields.password' type='password' placeholder='password')
      input(v-model='fields.passwordConfirm' type='password' placeholder='confirm password')
      button(v-on:click="register" type="button") register
      .errMsg(v-if="errMsg") {{ errMsg }}
      .feedbackMsg(v-if="feedbackMsg && entity.username") {{ feedbackMsg }}
  .register(v-else-if="entity.username")
    .msg.thanks {{ feedbackMsg }}
</template>

<script>
export default {
  name: 'register-comp',
  data () {
    return {
      entity: this.$store.state.entity,
      pageHistory: this.$store.state.pageHistory,
      fields: {
        username: null,
        password: null,
        passwordConfirm: null,
      },
      errMsg: null,
      feedbackMsg: null,
      uuid: this._uid
    }
  },
  sockets: {
    connect: function(){
      // console.log("module %s connect vue side", this.$options.name)
    },
    giveRegister(data){
      // console.log(data)
      // if(this.uuid == data.id){
        console.log(data)
        if(data.success){
          this.feedbackMsg = data.msg || 'succesfully registered'
          this.clearFields()
        } else {
          this.errMsg = data.msg || 'there was an error'
          console.log(data.err)
        }
      // }
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
  methods: {
    register(){
      if(this.fields.password && this.fields.password == this.fields.passwordConfirm){
        let credentials = {
          username: this.fields.username,
          password: this.fields.password
        }
        console.log("sent register emit")
        this.$socket.emit('register', credentials)
        this.errMsg = null
      } else {
        this.errMsg = "the passwords do not match"
      }
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
  watch: {
    '$store.state.entity': function(){
      this.entity = this.$store.state.entity
    },
    '$store.state.pageHistory': function(){
      this.pageHistory = this.$store.state.pageHistory
    },
  },
  props: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import 'src/styles/vars'
.register
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  height: auto
  .register-sizer
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
