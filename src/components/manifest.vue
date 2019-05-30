<template lang='pug'>
  .manifest-container.justify-center.align-center
    .manifest-positioner.q-pa-md.q-ma-no
      q-list.no-border.q-mt-auto.q-mb-auto(
        )
        q-item.full-width.q-pa-no.q-mt-auto.q-mb-xsmd(
          v-show=`
            gosmart($store, 'state.app.showLoginOptions', false)
          `
          v-if=`
            !gosmart($store, 'state.app.entity.loggedIn.'+
              getsmart($store, 'state.app.userAgent', ''),
              false
            )
          `
        )
          q-item-section.full-width
            fb-signin-button(
              :params="gosmart($store, 'state.app.fbParams', {})"
              @success=`
                res => $store.dispatch(
                  'login',
                  {
                    token: Object.assign(
                      {
                        provider: 'facebook'
                      },
                      res
                    ),
                    provider: 'facebook',
                    success: true
                  }
                )
                `
              @error=`
                res => $store.dispatch(
                  'login',
                  {
                    token: Object.assign(
                      {
                        provider: 'facebook'
                      },
                      res
                    ),
                    provider: 'facebook',
                    success: false
                  }
                )
                `
              )
              img(
                src="https://dy6j70a9vs3v1.cloudfront.net/funnel_wap/static/files/32c47a476283bf5bb60f88935fc0815a/facebook_white.svg"
                )
              .text.text-white() Continue with Facebook
        q-item.full-width.q-pa-no(
          v-show=`
            gosmart($store, 'state.app.showLoginOptions', false)
          `
          v-if=`
            !gosmart($store, 'state.app.entity.loggedIn.'+
              getsmart($store, 'state.app.userAgent', ''),
              false
            )
          `
        )
          q-item-section.full-width
            g-signin-button(
              :params=`{
                client_id: gosmart($env, 'googleClientId', undefined)
              }`
              @success="res => $store.dispatch('login', {token: Object.assign({provider: 'google'}, res), provider: 'google', success: true})"
              @error="res => $store.dispatch('login', {token: Object.assign({provider: 'google'}, res), provider: 'google', success: false})"
              )
              img(
                src="https://dy6j70a9vs3v1.cloudfront.net/funnel_wap/static/files/45eaf69cf1018aa240cea767e822dc96/google_white.svg"
                )
              .text.text-white() Continue with Google
        .or.full-width(
          v-show=`
            gosmart($store, 'state.app.showLoginOptions', false)
          `
          v-if=`
            !gosmart($store, 'state.app.entity.loggedIn.'+
              getsmart($store, 'state.app.userAgent', ''),
              false
            )
          `
        )
          .line.q-mr-sm
          .text OR
          .line.q-ml-sm
        form.full-width.q-pa-no.q-ma-no(
          v-on:submit.prevent=`
            if(
              getsmart($store, 'state.app.showLoginOptions', false)
              &&
              !gosmart($store, 'state.app.entity.loggedIn.'+
                getsmart($store, 'state.app.userAgent', ''),
                false
              )
            ){
              let usernamePasswordForm = getsmart($v, 'state.app.$touch', ()=>{})
              if(getsmart($store, 'state.app.entity.registered.any', true)){
                usernamePasswordForm = getsmart($v, 'state.app.entity.alopu.$touch', ()=>{})
                if(typeof usernamePasswordForm == 'function'){
                  usernamePasswordForm()
                  if(!getsmart($v, 'state.app.entity.alopu.$error', false)){
                    $store.dispatch('login', {provider: 'alopu'})
                  }
                }
              } else {
                if(typeof usernamePasswordForm == 'function'){
                  usernamePasswordForm()
                  if(!getsmart($v, 'state.app.$error', false)){
                    $store.dispatch('login', {provider: 'alopu'})
                  }
                }
              }
            } else if (
              gosmart($store, 'state.app.entity.loggedIn.'+
                getsmart($store, 'state.app.userAgent', ''),
                false
              )
            ) {
              $store.dispatch('logout')
            }
            setsmart($store, 'state.app.showLoginOptions', true)
          `
          )
          q-item.full-width.q-pa-no.q-mb-xs(
            v-show=`
              gosmart($store, 'state.app.showLoginOptions', false)
            `
            v-if=`
              !gosmart($store, 'state.app.entity.loggedIn.'+
                getsmart($store, 'state.app.userAgent', ''),
                false
              )
            `
            )
            q-item-section.full-width.p-pa-no.q-ma-no(
              )
              q-input.q-mb-sm.no-shadow.border-1.round-borders(
                :value="gosmart($store, 'state.app.entity.alopu.username', undefined)"
                @input="setsmart($store, 'state.app.entity.alopu.username', $event)"
                label="Email"
                filled
                type="email"
                autocomplete="email"
                bottom-slots
                :error=`
                  ( (getsmart($v, 'state.app.entity.alopu.username.$error', false) && !getsmart($v, 'state.app.entity.alopu.username.required', false)) ) ||
                  ( (getsmart($v, 'state.app.entity.alopu.username.$error', false) && !getsmart($v, 'state.app.entity.alopu.username.email', false)) ) ||
                  ( (getsmart($v, 'state.app.entity.alopu.username.$error', true) && getsmart($v, 'state.app.entity.alopu.username.$anyError', true)) )
                `
              )
                template(v-slot:error) {{
                  | ( (getsmart($v, 'state.app.entity.alopu.username.$error', false) && !getsmart($v, 'state.app.entity.alopu.username.required', false)) ? 'This value is required' : '' ) ||
                  | ( (getsmart($v, 'state.app.entity.alopu.username.$error', false) && !getsmart($v, 'state.app.entity.alopu.username.email', false)) ? 'This is not a valid email' : '' ) ||
                  | ( (getsmart($v, 'state.app.entity.alopu.username.$error', true) && getsmart($v, 'state.app.entity.alopu.username.$anyError', true)) ? "There's something wrong with this value" : '' )
                  | }}
          q-item.full-width.q-pa-no.q-mb-xs(
            v-show=`
              gosmart($store, 'state.app.showLoginOptions', false)
            `
            v-if=`
              !gosmart($store, 'state.app.entity.loggedIn.'+
                getsmart($store, 'state.app.userAgent', ''),
                false
              )
            `
          )
            q-item-section.full-width.p-pa-no.q-ma-no(
              )
              q-input.q-mb-sm.no-shadow.border-1.round-borders(
                :value="gosmart($store, 'state.app.entity.alopu.password', undefined)"
                @input="setsmart($store, 'state.app.entity.alopu.password', $event)"
                label="Password"
                filled
                :type="gosmart(things, 'showPassword', false) ? 'text' : 'password'"
                autocomplete="password"
                bottom-slots
                :error=`
                  ( (getsmart($v, 'state.app.entity.alopu.password.$error', false) && !getsmart($v, 'state.app.entity.alopu.password.required', false)) ) ||
                  ( (getsmart($v, 'state.app.entity.alopu.password.$error', false) && !getsmart($v, 'state.app.entity.alopu.password.email', false)) ) ||
                  ( (getsmart($v, 'state.app.entity.alopu.password.$error', true) && getsmart($v, 'state.app.entity.alopu.password.$anyError', true)) )
                `
              )
                template(v-slot:error) {{
                  | ( (getsmart($v, 'state.app.entity.alopu.password.$error', false) && !getsmart($v, 'state.app.entity.alopu.password.required', false)) ? 'This value is required' : '' ) ||
                  | ( (getsmart($v, 'state.app.entity.alopu.password.$error', true) && getsmart($v, 'state.app.entity.alopu.password.$anyError', true)) ? "There's something wrong with this value" : '' )
                  | }}
                template(
                  v-slot:append
                )
                  q-icon(
                    @click="setsmart(things, 'showPassword', !gosmart(things, 'showPassword', false))"
                    size=".8em"
                    :name="gosmart(things, 'showPassword', false) ? 'visibility' : 'visibility_off'"
                  )
          q-item.full-width.q-pa-no.q-mb-xs(
            v-show=`
              !gosmart($store, 'state.app.entity.loggedIn.'+
                getsmart($store, 'state.app.userAgent', ''),
                false
              ) &&
              !getsmart($store, 'state.app.entity.registered.any', false)
            `
            )
            q-item-section.full-width.p-pa-no.q-ma-no(
              )
              q-input.q-mb-sm.no-shadow.border-1.round-borders(
                :value="gosmart($store, 'state.app.passwordConfirmation', undefined)"
                @input="setsmart($store, 'state.app.passwordConfirmation', $event)"
                label="Confirm password"
                filled
                :type="gosmart(things, 'showPasswordConfirm', false) ? 'text' : 'password'"
                bottom-slots
                autocomplete="password"
                :error=`
                  ( (getsmart($v, 'state.app.passwordConfirmation.$error', false) && !getsmart($v, 'state.app.passwordConfirmation.required', false)) ) ||
                  ( (getsmart($v, 'state.app.passwordConfirmation.$error', false) && !getsmart($v, 'state.app.passwordConfirmation.same', false)) ) ||
                  ( (getsmart($v, 'state.app.passwordConfirmation.$error', true) && getsmart($v, 'state.app.passwordConfirmation.$anyError', true)) )
                `
              )
                template(v-slot:error) {{
                  | ( (getsmart($v, 'state.app.passwordConfirmation.$error', false) && !getsmart($v, 'state.app.passwordConfirmation.required', false)) ? 'This value is required' : '' ) ||
                  | ( (getsmart($v, 'state.app.passwordConfirmation.$error', false) && !getsmart($v, 'state.app.passwordConfirmation.same', false)) ? 'Must be the same as your password' : '' ) ||
                  | ( (getsmart($v, 'state.app.passwordConfirmation.$error', true) && getsmart($v, 'state.app.passwordConfirmation.$anyError', true)) ? "There's something wrong with this value" : '' )
                  | }}
                template(
                  v-slot:append
                )
                  q-icon(
                    @click="setsmart(things, 'showPasswordConfirm', !gosmart(things, 'showPasswordConfirm', false))"
                    size=".8em"
                    :name="gosmart(things, 'showPasswordConfirm', false) ? 'visibility' : 'visibility_off'"
                  )
          input(type="submit" v-show="false")
        q-item.full-width.q-pa-no(
          )
          q-item-section.full-width(
            )
            q-btn.full-width(
              color="primary"
              @click=`
                if(
                  getsmart($store, 'state.app.showLoginOptions', false)
                  &&
                  !gosmart($store, 'state.app.entity.loggedIn.'+
                    getsmart($store, 'state.app.userAgent', ''),
                    false
                  )
                ){
                  let usernamePasswordForm = getsmart($v, 'state.app.$touch', ()=>{})
                  if(getsmart($store, 'state.app.entity.registered.any', true)){
                    usernamePasswordForm = getsmart($v, 'state.app.entity.alopu.$touch', ()=>{})
                    if(typeof usernamePasswordForm == 'function'){
                      usernamePasswordForm()
                      if(!getsmart($v, 'state.app.entity.alopu.$error', false)){
                        $store.dispatch('login', {provider: 'alopu'})
                      }
                    }
                  } else {
                    if(typeof usernamePasswordForm == 'function'){
                      usernamePasswordForm()
                      if(!getsmart($v, 'state.app.$error', false)){
                        $store.dispatch('login', {provider: 'alopu'})
                      }
                    }
                  }
                } else if (
                  gosmart($store, 'state.app.entity.loggedIn.'+
                    getsmart($store, 'state.app.userAgent', ''),
                    false
                  )
                ) {
                  $store.dispatch('logout')
                }
                setsmart($store, 'state.app.showLoginOptions', true)
              `
            ) {{
              | gosmart($store, 'state.app.entity.loggedIn.'+
              |   getsmart($store, 'state.app.userAgent', ''),
              |   false
              | ) ?
              |   'logout' :
              |   !getsmart($store, 'state.app.showLoginOptions', false) ?
              |     'sign in or sign up' :
              |     getsmart($store, 'state.app.entity.registered.any', false) ?
              |       'login' :
              |       'register'
              | }}
</template>

<script>
import { email, required, sameAs } from 'vuelidate/lib/validators'
export default {
  name: 'manifest-comp',
  data () {
    return {
      // objects: null,
      uuid: this._uid,
      state: this.gosmart($store, 'state', {}),
      password: this.gosmart($store, 'state.app.entity.alopu.password', undefined)
    }
  },
  validations(){
    return {
      state: {
        app: {
          entity: {
            alopu: {
              username: {
                email,
                required
              },
              password: {
                required
              },
            }
          },
          passwordConfirmation: {
            required,
            same: () => this.gosmart(this.$store, 'state.app.entity.alopu.password', undefined) == this.gosmart(this.$store, 'state.app.passwordConfirmation', undefined)
          },
        }
      }
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
  width: 100%
  max-width: 100%
  // height: 100%
  height: auto
  overflow: hidden
  background: $white
  .manifest-positioner
    width: 350px
    max-width: 100%
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
