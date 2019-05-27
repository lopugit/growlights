<template lang='pug'>
  .growlights-banner(
    :class=`{
      size
    }`
  )
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
    "size": {},
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
  overflow: hidden
  -webkit-tap-highlight-color: green
  display: flex
  align-items: center
  justify-content: center
  padding: 30px 0px 0px 0px
  .growlights-banner-container
    display: flex
    width: 100%
    max-width: 100%
    align-items: center
    justify-content: center
    -webkit-tap-highlight-color: green
    display: flex
    align-items: center
    justify-content: center
    .logo
      -webkit-tap-highlight-color: green
      width: 450px
      max-width: 90%
  // background: $grey
  &.size
    // height: 180px
    padding: 0px 0px 0px 0px
    .logo
      max-width: 150px
</style>
