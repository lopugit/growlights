<template lang='pug'>
  .templateO-container.align-center.flex-column
    .templateO-positioner.align-center.flex-column
      .templateO.justify-start.q-width-100
        h5 Privacy Policy
      .templateO.justify-start
        ul
          li We use browser cookies to store data between sessions so you have a nicer user experience
          li We do not store your password in english but use 4096-bit encryption to validate your password upon login
</template>

<script>
export default {
  name: 'templateO-comp',
  data () {
    return {
      uid: this._uid,
      things: {},
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
<style lang="sass" scoped>
@import 'src/styles/vars'
.templateO-container
  width: 100%
  max-width: 100%
  overflow: hidden
  .template0-positioner
    width: auto
    text-align: center
    .template0
      width: auto
      // text-align: left
</style>
