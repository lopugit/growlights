<template lang='pug'>
//- .sidebar
q-list.q-flex.q-flex-column.sidebar
  q-item(
    )
    q-item-section(
      avatar
      @click="$store.commit('thing', { path: 'leftSidebar', val: !$store.state.app.leftSidebar})"
    )
      q-item-label(
        sparse
        ).q-item-label-profile-picture
        //- :style=`{
        //-   height: '50px',
        //-   width: 'auto'
        //- }`
        img.q-circle-img(
          :src=`$store.getters.cover()`
          )
    q-item-section(
    )
      q-item-label(
        :style={
          'text-transform': 'capitalize'
        }
      ) {{ $store.getters.username() }}
      q-item-label(
        size=".5rem"
        ).q-mt-xxxsm.text-grey.text-xsm {{ $store.getters.ego(0) }}
    q-item-section(
      )
      q-btn(
        icon="close"
        @click="$store.commit('thing', { path: 'leftSidebar', val: !$store.state.app.leftSidebar})"
      ).shadow-0
  q-list.no-border.main-list.q-pa-sm.q-pt-lg.q-mt-auto.q-mb-auto.full-width.q-pb-no(
    )
    template(
      v-for="nav in $store.state.app.navigation"
    )
      q-separator
      router-link(
        :to='nav.link'
      ).nav-link
        q-item(
          )
          q-item-section.nav-link-icon.q-square-img.q-br-rd-xs(
            side
          )
            img(
              :src="`statics/${nav.icon}`"
            )
          q-item-section(
            label
            ).text-cap {{ nav.name }}

  q-separator
  manifest


</template>

<script>
export default {
  name: 'sidebar',
  data () {
    return {
      // objects: null,
      uuid: this._uid,
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
  },
  components: {
    manifest: require('src/components/manifest').default
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
.sidebar
  // width: 100%
  // max-width: 100%
  // overflow: hidden
  // display: flex
  // align-items: flex-start
  // justify-content: flex-start
  // padding: 0
  // margin: 0
  .main-list
    min-height: 100%
  // background: $grey
  .nav-link
    display: flex
    align-items: center
    width: 100%
    .q-item
      width: 100%
    &:hover
      // background: rgba(0,0,0,.2)
      .q-item
        background: rgba(0,0,0,.1)
    .nav-link-icon
      img
        width: 42px
</style>
