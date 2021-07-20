<template lang='pug'>
  .profile-container.q-pa-sm
    .profile-positioner.q-pa-xxxxl-bp-min-sm.q-pt-md-bp-min-sm
      .profile.q-pa-md-bp-min-sm
        q-card.q-min-width-300.q-max-width-100-p.shadow-8
          q-card-section
            q-list.q-flex.q-flex-column.sidebar
              q-item(
                )
                q-item-section(
                  avatar
                  @click=`
                    $router.push('/profile')
                    $store.commit('graph/thing', { path: 'leftSidebar', val: !$store.state.graph.leftSidebar})
                  `
                )
                  q-item-label(
                    sparse
                    ).q-item-label-profile-picture
                    //- :style=`{
                    //-   height: '50px',
                    //-   width: 'auto'
                    //- }`
                    img.q-circle-img.q-max-height-60.q-max-width-60(
                      :src=`$store.getters['graph/cover']()`
                      )
                q-item-section(
                )
                  q-item-label.text-elip.text-wrap(
                  ) {{ $store.getters['graph/username']() }}
                  q-item-label(
                    size=".5rem"
                    ).q-mt-xxxsm.text-grey.text-xsm {{ $store.getters['graph/ego'](0) }}
        q-list.q-pa-no
          template(
            v-for="nav in getsmart($store, 'state.graph.navigation.user', [])"
          )
            q-card.hover-change.q-pl-lg-important.q-pa-md.shadow-8.q-mt-md(
              @click=`$router.push('/profile'+nav.link)`
            )
              q-card-section.q-pa-no.q-square-img.q-br-rd-xs.flex-row.justify-start.align-center(
                side
              )
                q-item(
                  )
                  q-item-section(
                    avatar
                  )
                    img.q-ml-xxsm.q-mr-xxsm.q-max-width-20(
                      :src="`${nav.icon}`"
                    )
                q-item.q-pl-no(
                  )
                  q-item-section(
                    label
                    ).text-cap.text-lg {{ nav.name }}

</template>
<script>
export default {
  name: 'profile-comp',
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
    x: {}
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
.profile-container
  width: 100%
  max-width: 100%
  // overflow: hidden
</style>
