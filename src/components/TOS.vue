<template lang='pug'>
  .templateO-container.align-center.flex-column
    .templateO-positioner.align-center.flex-column
      .templateO.justify-start.q-width-100
        h5 TOS
      .templateO.justify-start
        ul
          li By using this platform you agree to:
            ul
              li Us storing your email and encrypted 4096-bit password
              li Us storing your payment data to complete finalized shopping cart orders
              li Us storing addresses to complete finalized shopping cart orders
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
  // text-align: center
  // min-height: 100vh
  .template0-positioner
    width: auto
    text-align: center
    .template0
      width: auto
      // text-align: left
</style>
