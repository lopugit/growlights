<template lang='pug'>
.sidebar
  q-item(
    )
    q-item-section(
      avatar
      @click=`
        $router.push('/profile')
        $store.commit('thing', { path: 'leftSidebar', val: !$store.state.app.leftSidebar})
      `
      )
      img.q-circle-img.q-max-height-60.q-max-width-60(
        :src=`$store.getters.cover()`
        )
    q-item-section(
    )
      q-item-label.text-elip.text-wrap(
      ) {{ $store.getters.username() }}
      q-item-label(
        size=".5rem"
        ).q-mt-xxxsm.text-grey.text-xsm {{ $store.getters.ego(0) }}
    q-item-section.q-ml-auto.w-auto(
      :side='true'
      )
      q-btn.w-auto(
        icon="close"
        @click="setsmart($store, 'state.app.leftSidebar', !getsmart($store, 'state.app.leftSidebar', true))"
      ).shadow-0.q-pa-no
  // q-list.q-flex.q-flex-column.sidebar
  q-list.no-border.main-list.q-pl-no-important.q-pa-sm.q-pt-sm.q-pr-no.full-width.q-pb-no(
    )
    template(
      v-if="getsmart($store, 'state.app.navigation.general', []) instanceof Array"
      v-for="nav in getsmart($store, 'state.app.navigation.general', [])"
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
            ).text-cap.q-pl-md {{ nav.name }}

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
    },
  },
  created () {
  },
  methods: {
  },
  props: {
    "siteTitle": {}
  },
  computed: {
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
  height: 100vh
  max-height: 100vh
  .main-list
    // min-height: 100%
    // max-height: 100%
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
