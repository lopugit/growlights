<template lang='pug'>
  .manifest-container.q-pa-md.q-ma-no
    q-list.no-border.q-mt-auto.q-mb-auto(
      )
      q-item.full-width.q-pa-no.q-mt-auto.q-mb-xsmd(
        v-show="gosmart($store, 'state.app.showLoginOptions', false)"
        )
        q-item-section.full-width
          fb-signin-button(
            :params="gosmart($store, 'state.app.fbParams', {})"
            @success="res => $store.dispatch('login', {token: Object.assign({provider: 'facebook'}, res), provider: 'facebook', success: true})"
            @error="res => $store.dispatch('login', {token: Object.assign({provider: 'facebook'}, res), provider: 'facebook', success: false})"
            )
            img(
              src="https://dy6j70a9vs3v1.cloudfront.net/funnel_wap/static/files/32c47a476283bf5bb60f88935fc0815a/facebook_white.svg"
              )
            .text.text-white() Continue with Facebook
      q-item.full-width.q-pa-no(
        v-show="gosmart($store, 'state.app.showLoginOptions', false)"
        )
        q-item-section.full-width
          g-signin-button(
            :params="gosmart($store, 'state.app.googleParams', {})"
            @success="res => $store.dispatch('login', {token: Object.assign({provider: 'google'}, res), provider: 'google', success: true})"
            @error="res => $store.dispatch('login', {token: Object.assign({provider: 'google'}, res), provider: 'google', success: false})"
            )
            img(
              src="https://dy6j70a9vs3v1.cloudfront.net/funnel_wap/static/files/45eaf69cf1018aa240cea767e822dc96/google_white.svg"
              )
            .text.text-white() Continue with Google
      .or.full-width(
        v-show="gosmart($store, 'state.app.showLoginOptions', false)"
        )
        .line.q-mr-sm
        .text OR
        .line.q-ml-sm
      form.full-width.q-pa-no.q-ma-no(
        v-on:submit.prevent="$store.dispatch('login', {provider: 'alopu'})"
        )
        q-item.full-width.q-pa-no.q-mb-xs(
          v-show="gosmart($store, 'state.app.showLoginOptions', false)"
          )
          q-item-section.full-width.p-pa-no.q-ma-no(
            )
              q-input.q-mb-sm.no-shadow.border-1.round-borders(
                :value="gosmart($store, 'state.app.entity.alopu.username', undefined)"
                @input="setsmart($store, 'state.app.entity.alopu.username', $event)"
                v-if="(getsmart($store, 'state.app.entity.alopu.password', undefined) || getsmart($store, 'state.app.entity.alopu.username', {}) == undefined || getsmart($store, 'state.app.entity.alopu.password', undefined) == '' || getsmart($store, 'state.app.entity.alopu.password.length', 0) >= 0) "
                label="Username or Email"
                filled
                type="email"
                autocomplete="email"
              )
        q-item.full-width.q-pa-no.q-mb-xs(
          v-show="gosmart($store, 'state.app.showLoginOptions', false)"
          )
          q-item-section.full-width.p-pa-no.q-ma-no(
            )
            q-input.q-mb-sm.no-shadow.border-1.round-borders(
              :value="gosmart($store, 'state.app.entity.alopu.password', undefined)"
              @input="setsmart($store, 'state.app.entity.alopu.password', $event)"
              v-if="(getsmart($store, 'state.app.entity.alopu.password', undefined) || getsmart($store, 'state.app.entity.alopu.username', {}) == undefined || getsmart($store, 'state.app.entity.alopu.password', undefined) == '' || getsmart($store, 'state.app.entity.alopu.password.length', 0) >= 0) "
              label="Password"
              filled
              :type="gosmart(things, 'showPassword', false) ? 'text' : 'password'"
            )
              template(
                v-slot:append
              )
                q-icon(
                  @click="setsmart(things, 'showPassword', !gosmart(things, 'showPassword', false))"
                  size=".8em"
                  :name="gosmart(things, 'showPassword', false) ? 'visibility' : 'visibility_off'"
                )
        q-item.full-width.q-pa-no.q-mb-xs(
          v-show="gosmart($store, 'state.app.showLoginOptions', false) && gosmart($store, 'state.app.registerable', false)"
          )
          q-item-section.full-width.p-pa-no.q-ma-no(
            )
            q-input.q-mb-sm.no-shadow.border-1.round-borders(
              :value="gosmart($store, 'state.app.passwordConfirmation', undefined)"
              @input="setsmart($store, 'state.app.passwordConfirmation', $event)"
              label="Confirm password"
              filled
              :type="gosmart(things, 'showPasswordConfirm', false) ? 'text' : 'password'"
            )
              template(
                v-slot:append
              )
                q-icon(
                  @click="setsmart(things, 'showPasswordConfirm', !gosmart(things, 'showPasswordConfirm', false))"
                  size=".8em"
                  :name="gosmart(things, 'showPasswordConfirm', false) ? 'visibility' : 'visibility_off'"
                )
      q-item.full-width.q-pa-no(
        v-if="!$store.getters.loggedIn"
        )
        q-item-section.full-width(
          )
          q-btn.full-width(
            color="primary"
            @click="$store.dispatch('login', {provider: 'alopu'})"
          ) {{ gosmart($store, 'state.app.registerable', false) == 'haventchecked' ? 'sign in or sign up' : gosmart($store, 'state.app.registerable', false) ? 'register' : 'login' }}
      q-item.full-width.q-pa-no(
        v-if="$store.getters.loggedIn"
        )
        q-item-section.full-width.text-tertiary(
        )
          q-btn.full-width(
            color="primary"
            @click="$store.dispatch('logout')"
          ) logout
</template>

<script>
export default {
  name: 'manifest-comp',
  data () {
    return {
      // objects: null,
      uuid: this._uid
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
.manifest-container
  width: 350px
  max-width: 100%
  overflow: hidden
  background: $white
  .or
    color: $gentleGrey
    text-transform: uppercase
    font-size: 14px
    letter-spacing: 2px
    font-weight: 300
    margin: 15px 0
    color: $strongGrey
    display: flex
    flex-direction: row
    justify-content: center
    align-items: center
    flex-grow: 1
    // flex-shrink: 1
    // flex-basis: 100%
    flex-wrap: nowrap
    .line
      display: flex
      align-items: center
      flex-grow: 10000
      border-top: 1px solid lighten($strongGrey, 10)
      // .line
      //   border-top: 1px solid $strongGrey
      //   width: 100%
      //   height: 1px
      //   min-width: 1px
    // &:before
    //   margin-left: -120px
    //   margin-top: 10px
    //   // position: absolute
    //   content: ""
    //   height: 1px
    //   width: 110px
    //   opacity: .48
    //   background-color: $gentleGrey
    // &:after
    //   margin-left: 10px
    //   margin-top: 10px
    //   // position: absolute
    //   content: ""
    //   height: 1px
    //   width: 110px
    //   opacity: .48
    //   background-color: $gentleGrey
</style>
