<template lang="pug">
#q-app(ref="app")
  router-view
</template>

<script>
export default {
  name: 'app',
  data(){
    return {
    }
  },
  sockets: {
    connect: function(){
    },
  },
  created(){
    this.setsmart(this, '$store.state.app.$env', this.$env)
    /** inits */
      /** initiate unique client id */
        this.$store.dispatch('manifestClientId', this.$uuid.v4())
      /** userAgent */
        this.setsmart(this.$store, 'state.app.userAgent', navigator.userAgent)
      /** cursor */
        this.initCursor()
      /** env */
        this.$store.commit('env', this.$env)
      /** sync this device with entity devices */
        this.$store.dispatch('syncDevice', 'this')
      /** get any entity updates */
      this.syncEntity()
  },
  methods: {
    syncEntity(){
      // configure watcher for this entity's firestore id listener
        let FSid = this.getsmart(this.$store, 'state.app.entity.firestore.id', false)
        if(FSid){
          this.setsmart(this, 'things.entityWriteLock', true)
          this.$fs.collection(`${this.getsmart(this, '$env.level', 'dev')}/things/users}`).doc(FSid).get()
          .then((snapshot)=>{
            // push to local store when firestore indicates a change
              let entity = snapshot.data()
              if(entity){
                if(this.getsmart(this.$store, 'state.app.entity.firestore.lastUpdated', false) !== this.getsmart(entity, 'firestore.lastUpdated', false)){
                  this.setsmart(this.$store, 'state.app.justFirestore', Date.now())
                  this.setsmart(this.$store, 'state.app.entity', entity)
                  let pwd = this.getsmart(this.$store, 'state.app.entity.alopu.password', false)
                  if(pwd){
                    delete this.$store.state.app.entity.alopu.password
                  }
                }
              }
              this.setsmart(this, 'things.entityWriteLock', false)
          })
          .catch(err=>{
            console.error(err)
            this.setsmart(this, 'things.entityWriteLock', false)
          })
        }
    },
    initCursor(){
      let that = this
      var down
      var up
      var waitdown
      var waitup
      var movingTimerDown
      var movingTimerUp
      var lastUpTimer = new timer(()=>{}, 0)
      var lastDownTimer = new timer(()=>{}, 0)
      var count = 0
      var mouseClick = function(){
        // console.lgog('count click')
        let lastUp = lastUpTimer.getTimeLeft()
        new timer(()=>{
          document.body.classList.add('cursor-pointer')
        }, lastUp)
        lastDownTimer = new timer(()=>{}, lastUp+200)
      }
      var mouseUp = function(){
        // console.lgog('count release')
        let lastDown = lastDownTimer.getTimeLeft()
        new timer(()=>{
          document.body.classList.remove('cursor-pointer')
        }, lastDown)
        lastUpTimer = new timer(()=>{}, lastDown+100)
        count++
        // console.lgog(count)
      }

      document.body.onmousedown = mouseClick
      document.body.onmouseup = mouseUp

      console.log("app was created")
      this.$socket.emit('getRealms', {
        id: this.uuid,
        find: {},
        count: Infinity
      })
      function timer(callback, delay) {
        var id, started, remaining = delay, running

        this.start = function() {
            running = true
            started = new Date()
            id = setTimeout(callback, remaining)
        }

        this.pause = function() {
            running = false
            clearTimeout(id)
            remaining -= new Date() - started
        }

        this.getTimeLeft = function() {
            if (running) {
                this.pause()
                this.start()
            }

            return remaining
        }

        this.getStateRunning = function() {
            return running
        }

        this.start()
      }
    }
  },
  watch: {
    '$store.state.app.showLoginOptions'(){
      let username = this.gosmart(this.$store, 'state.app.entity.alopu.username', '')
      this.$store.dispatch('checkUsernameAvailability', username)
    },
    '$store.state.app.entity.alopu.username'(){
      let username = this.gosmart(this.$store, 'state.app.entity.alopu.username', '')
      if(this.showLoginOptions && (username || username == 0)){
        clearTimeout(this.checkusername)
        this.checkusername = setTimeout(()=>{
          this.$store.dispatch('checkUsernameAvailability', username)
        }, 200)
      }
    },
    '$store.state.app.feedback'(){
      // let index = this.thingIn({option: { type: 'login' } , list: this.$store.state.app.feedback, keys: ['type'], retIndex: true})
      for(var i=0; i<this.getsmart(this, '$store.state.app.feedback.length', 0); i++){
        let feedback = this.$store.state.app.feedback[0]
        this.$q.notify(Object.assign({ position: 'top' }, feedback))
        this.$store.commit('removefeedback', 0)
      }
    },
    '$store.state.app.dialog'(){
      // let index = this.thingIn({option: { type: 'login' } , list: this.$store.state.app.dialog, keys: ['type'], retIndex: true})
      for(var i=0; i<this.getsmart(this, '$store.state.app.dialog.length', 0); i++){
        let dialog = this.$store.state.app.dialog[0]
        this.$q.dialog(dialog)
        this.$store.commit('removedialog', 0)
      }
    },
    '$store.state.app.entity': {
      handler: async function (){
        let username = this.gosmart(this.$store, 'state.app.entity.alopu.username', '')
        this.$store.dispatch('checkUsernameAvailability', username)
        /** smarts.equal code */
          // let cached = this.gosmart(this.things, 'cachedEntity', {})
          // let entity = this.gosmart(this.$store, 'state.app.entity', {})
          // let equal = this.equal(cached, entity)
        let that = this
        // push to firestore on new change
          if(!this.gosmart(this, 'things.entityWriteLock', false) && !this.getsmart(this.$store, 'state.app.justFirestore', false)){
            clearTimeout(this.things.entityWriteTimeout)
            this.setsmart(
              this.things,
              'entityWriteTimeout',
              setTimeout(async ()=>{
                if(!this.gosmart(this, 'things.entityWriteLock', false)){
                  this.setsmart(this, 'things.entityWriteLock', true)
                  let fsid = this.getsmart(this.$store, 'state.app.entity.firestore.id', false)
                  if(fsid){
                    let things = this.$fs.collection(`${this.getsmart(this, '$env.level', 'dev')}/things/users}`)
                    let entityRef = things.doc(fsid)
                    if(entityRef){
                      let entity = this.getsmart(this.$store, 'state.app.entity', false)
                      this.setsmart(entity, 'firestore.lastUpdated', Date.now())
                      if(entity){
                        await entityRef.set(this.$f.parse(this.$f.stringify(entity)), { merge: true })
                        .catch(err=>{
                          console.error('There was an error setting the updated entity: ', err)
                        })
                        this.setsmart(this.$store, 'state.app.justFirestore', false)
                        this.setsmart(this, 'things.entityWriteLock', false)
                      } else {
                        this.setsmart(this.$store, 'state.app.justFirestore', false)
                        this.setsmart(this, 'things.entityWriteLock', false)
                      }
                    } else {
                      this.setsmart(this.$store, 'state.app.justFirestore', false)
                      this.setsmart(this, 'things.entityWriteLock', false)
                    }
                  } else {
                    this.setsmart(this.$store, 'state.app.justFirestore', false)
                    this.setsmart(this, 'things.entityWriteLock', false)
                  }
                }
              }, 500)
            )
          }
          // fallback entity lock mechanism
            clearTimeout(this.things.entityWriteFallbackTimeout)
            this.setsmart(
              this.things,
              'entityWriteFallbackTimeout',
              setTimeout(
                async ()=>{
                  this.setsmart(this.$store, 'state.app.justFirestore', false)
                  this.setsmart(this, 'things.entityWriteLock', false)
                }, 2000
              )
            )
        // configure watcher for this entity's firestore id listener
          let FSid = this.getsmart(this.$store, 'state.app.entity.firestore.id', false)
          let kill = this.getsmart(this, 'things.entityFirestoreListener', ()=>{})
          typeof kill == 'function' && kill()
          if(FSid){
            this.setsmart(this, 'things.entityFirestoreListener', this.$fs.collection(`${this.getsmart(this, '$env.level', 'dev')}/things/users}`).doc(FSid).onSnapshot((snapshot)=>{
              // push to local store when firestore indicates a change
                let entity = snapshot.data()
                if(entity){
                  if(that.getsmart(that.$store, 'state.app.entity.firestore.lastUpdated', false) !== that.getsmart(entity, 'firestore.lastUpdated', false)){
                    that.setsmart(that.$store, 'state.app.justFirestore', Date.now())
                    that.setsmart(that.$store, 'state.app.entity', entity)
                    let pwd = that.getsmart(that.$store, 'state.app.entity.alopu.password', false)
                    if(pwd){
                      delete that.$store.state.app.entity.alopu.password
                    }
                  }
                }
            }))
          }
      },
      deep: true
    }
  },
  components: {
  },
  computed: {
    pageHistory: {
      get(){
        return this.$store.state.app.pageHistory
      },
      set(val){
        this.$store.commit('pageHistory', val)
      }
    },
  }
}
</script>

<style lang="sass">
@import 'src/styles/vars'
html
  // cursor: url(/statics/cursors/ms/aero_link2.cur), pointer
  cursor: url(/statics/cursors/ms/aero_arrow.cur) 2 2, auto
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  // text-align: center
  color: $friendly
  // padding-top: 60px
  // min-height: 100vh
body
  margin: 0px
  &.cursor-pointer,
  &.cursor-pointer *
    cursor: url(/statics/cursors/ms/aero_link2.cur) 2 2, auto !important
h1,h2
  font-weight: normal

ul
  list-style-type: none
  padding: 0

li
  display: inline-block
  margin: 0 10px

a,
.action,
.fa-icon,
a:-webkit-any-link,
.btn,
.btn-container
  color: $green
  text-decoration: none
  // cursor: url(/statics/cursors/ms/aero_link1.cur), pointer
  // border-bottom: 1px dotted rgba($green, .5)
  +animate(all, 300ms, ease)
  cursor: url(/statics/cursors/ms/aero_arrow.cur) 2 2, auto
  animation: 400ms hoverMaple linear infinite
  &:hover
    color: $greenhover

  +keyframes(hoverMaple)
    0%
      cursor: url(/statics/cursors/ms/aero_link2.cur) 2 2, pointer
    49%
      cursor: url(/statics/cursors/ms/aero_link2.cur) 2 2, pointer
    50%
      cursor: url(/statics/cursors/ms/aero_link1.cur) 2 2, auto
    99%
      cursor: url(/statics/cursors/ms/aero_link1.cur) 2 2, auto
    100%
      cursor: url(/statics/cursors/ms/aero_link2.cur) 2 2, pointer

.fa-icon
  user-select: none
button,
.btn
  color: $green
  // cursor: url(/statics/cursors/ms/aero_link1.cur), pointer
.content-editable
  outline: none
  padding: 5px
  &:focus
    // background: white
input
  color: $friendly
body
  background: $white
.router-view
  // padding-top: 50px
.v-select
  $font-size: 1rem
  font-size: $font-size
  line-height: $font-size
  height: 100%
  max-width: 100%
  .dropdown-toggle
    border: none !important
    border-radius: 0px !important
    // border-bottom: 1px solid $grey !important
    display: flex
    align-items: flex-start
    justify-content: flex-start
    flex-direction: column
    flex-wrap: wrap
    height: 100%
    max-width: 100%
    &:after
      display: none
    .input-container
      width: 100%
      max-width: 100%
      .form-control
        order: 1
        height: 100% !important
        max-width: 100%
        background: rgba(black, 0)
        font-size: $font-size
        line-height: $font-size
        font-family: $family
        padding: 0 4px
    .selected-tag-list
      order: 2
      max-width: 100%
      .selected-tag
        margin: 0
        margin-left: 4px
        padding: 0
        padding-right: 9px
        max-width: 100%
        height: auto
        font-size: $font-size
        line-height: $font-size + .3rem
        background: rgba(black, 0)
        color: $friendly
        font-family: $family
        width: auto
        border: none
        border-radius: 0px
        max-height: 100%
        white-space: normal
        position: relative
        text-transform: capitalize
        word-wrap: break-word
        &:first-child
          // margin-left: 4px
        button
          top: 0
          left: -5px
          position: absolute
          align-self: flex-start
          bottom: auto
          float: right
          font-size: .85rem
          line-height: .2rem
          // font-weight: 900
          color: rgba(darken($green, 0),.5)
          opacity: 1
    .open-indicator
      top: 0px
      display: flex
      align-self: flex-start
      align-items: center
      justify-content: center
      &:before
        height: 5px
        width: 5px
        border-width: 1px 1px 0 0
  .dropdown-menu
    border: 1px solid rgba($friendly, .15)
    display: flex
    align-items: flex-start
    justify-content: flex-start
    flex-direction: column
    text-transform: capitalize
    li
      margin-right: 4px
    .active,
      background-color: rgba($green, .5)
    .highlight
      background-color: $green
      a
        background-color: inherit
.mapboxgl-ctrl-logo
  display: none !important
.mapboxgl-ctrl-attrib
  display: none !important

// quasar style modifications
.q-pt-none
  // padding-top: 0px !important
.q-nav-toolbar
  background: rgba($green, 0) !important
  img
    width: 60px
    height: auto
    right: 0
    margin-right: 0px
    margin-left: auto
.text-primary
  color: $green !important
.q-chip
  margin-left: -16px !important
  top: -0.6rem !important
  padding: 0 10px !important
  min-height: 25px !important
.q-verified-status
  text-align: center
  justify-content: center
  img
    width: 20px
    height: auto
</style>

<style lang="stylus">
@import '~src/css/quasar.variables.styl'

.q-nav-footer
  max-width: 100%
  margin: 5px
  background-color $negative
  // position: fixed !important
.q-layout-page-container
  padding-bottom: 0px !important

</style>
