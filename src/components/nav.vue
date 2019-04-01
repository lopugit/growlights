<template lang='pug'>
  .nav
    //- .debug.art {{ nav }}
    .nav-positioner(v-if="nav")
      .brand-container
        router-link(to="/home").brand {{nav.siteTitle}}
          //- img(src="statics/agoraLogoIcon.png")
      //- .debug {{ user }}
      .welcome-message-container(v-if="entity")
        .welcome-message 
          .text welcome, {{ " " }}
          router-link.text(to="/self")  {{ entity.username || entity.identity }},
          .text have you seen our {{ " " }}
          router-link.text(to="/ico") ICO?
      .actions-group-container
        .actions-container(
          v-if="nav.actionGroups && nav.actionGroups.length > 0" 
          v-for="actionsGroup in nav.actionGroups"
          )
          .action(
            v-if="((action.auth.indexOf('user') >= 0) ? entity.auth : true) && (action.auth.indexOf('nouser') >= 0 ? !entity.auth : true)"
            v-for="action in actionsGroup.actions"
            :title="action.text"
            )
            router-link(v-if="action.type == 'link'" :to="action.link")
              .text(v-if="action.render == 'text'") {{ action.text }}
              <icon v-else-if="action.render == 'icon'" :name='action.icon'></icon>
              img(
                v-else-if="action.render == 'img'"
                :src="action.src"
                )
            <component v-else-if="action.type == 'component' && !entity.auth" :is="action.text+'-comp'"></component>
            .dropdown-container(
              v-else-if="action.type == 'dropdown'"
              @click="emit(action.action)"
              )
              .text(v-if="action.render == 'text'") {{ action.text }}
              <icon v-else-if="action.render == 'icon'" :name='action.icon'></icon>
              img(
                v-else-if="action.render == 'img'"
                :src="action.src"
                )
            .static(
              v-else-if="action.type == 'static' "
              )
              .text(v-if="action.render == 'text'") {{ action.text }}
              <icon v-else-if="action.render == 'icon'" :name='action.icon'></icon>
              img(
                v-else-if="action.render == 'img'"
                :src="action.src"
                )

            //- .debug {{ action.action }}
        .actions-container(v-if="nav.actions && nav.actions.length > 0")
          .action(
            v-for="action in nav.actions" 
            v-if="((action.auth.indexOf('user') >= 0) ? entity.auth : true) && (action.auth.indexOf('nouser') >= 0 ? !entity.auth : true)"
            :title="action.text"
            )
            router-link(v-if="action.type == 'link'" :to="action.link")
              .text(v-if="action.render == 'text'") {{ action.text }}
              <icon v-else-if="action.render == 'icon'" :name='action.icon'></icon>
            <component v-else-if="action.type == 'component' && !entity.auth" :is="action.text+'-comp'"></component>
            .dropdown-container(v-else-if="action.type == 'dropdown'")
              .text(v-if="action.render == 'text'") {{ action.text }}
              <icon v-else-if="action.render == 'icon'" :name='action.icon'></icon>

</template>

<script>
import loginSmall from '@/components/login-small'
// import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      nav: this.$store.state.nav,
      entity: this.$store.state.entity,
      // message: this.$store.state.entityMessage
    }
  },
  // computed: {
  //   // mix the getters into computed with object spread operator
  //   ...mapGetters({
  //     entity: 'entityGetter'
  //   })
  // },
  sockets: {
    connect: function(){
      // console.log("module %s connect vue side", this.$options.name)
    },
    giveNav(data){
      if(this._uid == data.clientId && data.nav){
        this.$store.commit('navSet', data.nav)
      }
    }
  },
  created () {
    this.getNav({
      clientId: this._uid,
      siteTitle: this.siteTitle
    })
    // this.$store.watch(state=>{
    //   return state.entity
    // },
    // ()=>{
    //   this.entity = state.entity
    // })
  },
  watch: {
    '$store.state.entity': function(){
      this.entity = this.$store.state.entity
    },
    // '$store.state.entityMessage': function(){
    //   this.message = this.$store.state.entityMessage
    // }
  },
  methods: {
    getNav(opts){
      this.$socket.emit('getNav', opts)
    },
    toggleSideBar(){
      this.eventHub.$emit('toggleSideBar')
    },
    emit(data){
      this.eventHub.$emit(data)
    }
  },
  props: {
    siteTitle: {}
  },
  components: {
    'login-small-comp': loginSmall
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import 'src/styles/vars'
$navSpace: 2%
.nav
  position: fixed
  display: flex
  // display: hidden
  flex-direction: row
  align-items: center
  justify-content: flex-start
  top: 0
  left: 0
  width: 100%
  max-width: 100%
  overflow: hidden
  height: auto
  // alopu
  background: rgba($grey, .85)
  // background: rgba($green, 1)
  // background: linear-gradient(to bottom, rgba($green, 1), rgba($green, 0))
  z-index: 500
  color: $white
  .debug
    &.art
      color: rgba($green, .8)
  .nav-positioner
    @extend .nav
    .brand-container
      margin-left: $navSpace
      margin-right: auto
      display: flex
      align-items: center
      justify-content: center
      height: 100%
      .brand
        height: 100%
        display: flex
        align-items: center
        justify-content: center
        // text-transform: capitalize
        // text-transform: uppercase
        // font-weight: 600
        font-size: 1.1rem
        img
          max-height: 30pxplanet express
    .actions-group-container
      display: flex
      align-items: center
      justify-content: center
      flex-direction: row
      margin-left: auto
      // margin-right: $navSpace
    .actions-container
      display: flex
      align-items: center
      justify-content: center
      flex-direction: row
      margin-left: 15px
      // margin-right: $navSpace
      &:first-child
        margin-left: 0px
      .action
        margin-right: 5px
        height: auto
        display: flex
        align-items: center
        justify-content: center
        color: $white
        a
          height: auto
          display: flex
          align-items: center
          justify-content: center
          color: $white
          // text-shadow: 1px 1px rgba(darken($green, 12), .4)
        .dropdown-container
          height: auto
          display: flex
          align-items: center
          justify-content: center
        .fa-icon
          margin-left: 10px
          margin-right: 10px
          color: $white
          // text-shadow: 1px 1px rgba(darken($green, 12), .4)
        .text
          margin-right: 5px
        .static
          img
            height: 70px
            // width: 35px
        &:last-child
          .text
            margin-right: 0px
    .welcome-message-container
      // padding-left: 20%
      // padding-right: 10px
      display: flex
      align-items: center
      justify-content: center
      margin-right: auto
      margin-left: auto
      width: auto
      .welcome-message  
        display: flex
        flex-flow: row
        .text
          padding-right: 4px
          &.nudge-right
            padding-left: 2px
  a
    text-decoration: none
</style>
