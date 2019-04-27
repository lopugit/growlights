<template lang='pug'>
  .templateO-container
    .templateO-positioner
      .templateO
</template>

<script>
export default {
  name: 'templateO-comp',
  data () {
    return {
      uuid: this._uid,
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
.templateO
  width: 100%
  max-width: 100%
  overflow: hidden
</style>
