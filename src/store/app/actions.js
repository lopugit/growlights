/*
export const someAction = (store) => {
}
*/
import smarts from 'smarts'
import axios from 'axios'
import CJSON from 'circular-json'
import UAParser from 'ua-parser-js'
import { Notify } from 'quasar'
import Vue from 'vue'
var notify = Notify
var uap = new UAParser()
var s = smarts({
  vue: {
    reactiveSetter: true
  }
}).methods
var $s = s

export const checkUsernameAvailability = (store, username) =>{
  let fs = s.getsmart(window, '$fs', undefined)
  let things = fs.collection(`${s.getsmart(window, 'env.level', 'dev')}/things/users`) // global things collection reference
  if(username){
    let url = s.getsmart(store, 'state.env.apiUrl', 'https://api.growlights.src')+'/usernamecheck'
    axios({
      method: 'POST',
      url: url,
      data: {
        username
      },
    })
    .then(res=>{
      if(res.data.success){
        if(res.data.taken){
          s.setsmart(store, 'state.entity.registered.any', true)
        } else if(!res.data.taken){
          s.setsmart(store, 'state.entity.registered.any', false)
        }
      } else {
        console.error('something went wrong checking if the username is registerable via the api: ', s.getsmart(res, 'data.error', 'undefined'))
      }
    })
    .catch(err=>{
      console.error('something went wrong checking if the username is registerable via the api: ', err)
    })
  }
}

export const switchUserSuccess = (store, args) => {
  if(args.success && args.entity){
    if(
      (s.getsmart(args, 'entity.alopu.carts.0.products.length', false) &&
      s.getsmart(store, 'state.entity.alopu.carts.0.products.length', false)) &&
      (s.getsmart(args, 'entity.alopu.carts.0.lastUpdated', false) !==
      s.getsmart(store, 'state.entity.alopu.carts.0.lastUpdated', false))
    ){
      s.setsmart(args, 'entity.alopu.carts.1', s.getsmart(args, 'entity.alopu.carts.0', {}))
      s.setsmart(args, 'entity.alopu.carts.0', s.getsmart(store, 'state.entity.alopu.carts.0', {}))
      s.setsmart(store, 'state.showCartCacheDialog', true)
    } else if(s.getsmart(store, 'state.entity.alopu.carts.0.products.length', false)){
      s.setsmart(args, 'entity.alopu.carts.0', s.getsmart(store, 'state.entity.alopu.carts.0', {}))
    } else if(s.getsmart(args, 'entity.alopu.carts.0.products.length', false)){
      s.setsmart(store, 'state.entity.alopu.carts.0', s.getsmart(args, 'entity.alopu.carts.0', {}))
    }
    s.setsmart(store, 'state.entity', args.entity)
    if(s.getsmart(store, 'state.entity.alopu.password', false)){
      delete store.state.entity.alopu.password
    }
    args.type = 'login'
    store.commit('feedback', args)
    s.setsmart(store, 'state.showLoginDialog', false)
    s.setsmart(store, 'state.passwordConfirmation', '')
  }
  s.setsmart(store, 'state.showLoginOptions', false)
}

export const switchUserFailure = (store, args) => {
  s.setsmart(store, 'state.showLoginOptions', true)
  // var entityDefault = CJSON.parse(CJSON.stringify(s.gosmart(store, 'state.entityDefault', {})))
  // store.dispatch('resetEntity')
  store.commit('feedback', args)
}

export const login = async (store, args) => {
  /** HELPER FUNCTIONS */
    let syncUser = (args) => {
      /** this function will make an api call to api.alopu.com
       * @returns @type {Promise}
       * and do 1 or more of a few things, but always return the same thing
       * @param @var args @type {Object} is the arguments object with expected schema defined below
       * @param @var args.token @type {Object} is a provider token given by eg. google, facebook, twitter, github, etc..
       * can be undefined if you're authenticating a native user
       * @param @var args.provider  @type {String} is the provider source, eg. google, facebook, twitter, github, etc..
       * @param @var args.entity @type {Object} is the entity object to be used with the authentication
       * if this isn't provided and no @var args.token is provided then the function will return an error
       * There are a few ways the api will handle a token and entity
       * @param @var args.upgrade @type {Boolean} is a true/false value denoting whether or not to upgrade and merge a provided entity data if
       * there is a native account already linked with whatever provider token is given
       * NOT CURRENTLY SUPPORTED
       */

      return new Promise((resolve, reject)=>{
        if(args.entity || args.provider || args.token || args.clientId){
          let params = {
            token: args.token,
            entity: args.entity,
            provider: args.provider,
            clientId: args.clientId
          }
          axios.post(s.getsmart(store, 'state.env.apiUrl', 'https://api.alopu.com')+'/auth', params, axiosConf)
          .then(post=>{
            if(post.data.success && post.data.entity){
              Object.assign(args, post.data)
              resolve(args)
            } else {
              console.error('there was an error authenticating the user server side: ', s.getsmart(post, 'data.error', undefined))
              reject({
                success: false,
                error: ['there was an error authentication the user server side: ', s.getsmart(post, 'data.error', 'there was an error authentication the user server side')]
              })
            }
          })
          .catch(err=>{
            console.error('there was an error authenticating the native user:', err)
            reject({
              success: false,
              error: ['there was an error authenticating the native user', err]
            })
          })
        } else {
          if(!args.token && !args.provider){
            reject({
              success: false,
              error: "You didn't provide an entity to be authenticated or a provider token or a source, what are we meant to do....?"
            })
          } else if(!(args.provider || s.getsmart(args, 'token.provider', false)) && args.token){
            reject({
              success: false,
              error: "We're sorry but right now we need to know the source of a token explicitely to process authentication, it'd be great if they included some kind of auth source in the token"
            })
          } else {
            reject({
              success: false,
              error: "You didn't provide enough arguments to sync a user"
            })
          }
        }
      })
    }
    let firebaseAuth = (args) => {
      return new Promise((resolve, reject)=>{
        let fb = s.getsmart(window, '$fb', undefined)
        fb.auth().signInWithCustomToken(args.entity.firebase.customToken)
        .then(()=>{
          resolve(args)
        })
        .catch(err=>{
          console.error('there was an error authenticating the user with Firebase: ', err)
          reject({
            success: false,
            error: ['there was an error authenticating the user with Firebase', err]
          })
        })
      })
    }
  // if the login button was pressed with no login options showing, toggle login options
  s.setsmart(store, 'state.showLoginOptions', true)
  let fs = s.getsmart(window, '$fs', undefined)
  let things = fs.collection(`${s.getsmart(window, 'env.level', 'dev')}/things/users`)
  args.clientId = store.state.clientId
  if(args['provider'] == 'alopu' || !args['provider']){
    var feedback = undefined
    args['success'] = true
    var message = 'Logging in'
    if(!s.getsmart(store, 'state.entity.registered.any', true)){
      message = 'Signing up'
    }
    feedback = {
      message,
      color: 'positive',
      timeout: 4000
    }
    s.pushThing({
      option: feedback,
      list: s.gosmart(store, 'state.feedback', [])
    })
    args.entity = {
      ...store.state.entity,
      ids: {
        "username-alopu": s.getsmart(args, 'entity.alopu.username', s.getsmart(store, 'state.entity.alopu.username', undefined))
      },
      registered: {
        any: true,
        alopu: true
      }
    }
    /** AUTHENTICATE THE PROVIDER TOKEN & SYNC THE USER WITH THE GLOBAL STATE */
      await syncUser(args)
      .catch(err=>{
        console.error('Something went wrong syncing the user with the database: ', err)
        args.feedback = {
          message: `There was an error logging in with your Growlights.com.au account`,
          color: 'negative',
          timeout: 4000,
        }
        store.dispatch('switchUserFailure', args)
      })
      if(args.success){
        var fsid = s.getsmart(args, 'entity.firestore.id', false)
        if(fsid){
          firebaseAuth(args)
          .then(args=>{
            /** create DocumentReference */
              var ref = things.doc(fsid)
            /** set loggedIn status for this userAgent */
              s.setsmart(args, 'entity.loggedIn.'+s.getsmart(store, 'state.userAgent', ''), true)
            /** add alopu token to alopu tokens list */
              if(args.entity.alopu && args.token){
                if(args.entity.alopu.tokens){
                  args.entity.alopu.tokens.push(args.token)
                }
              }
            /** save changes and notify user */
              ref.set(CJSON.parse(CJSON.stringify(args.entity)), {merge: true})
              .then(()=>{
                args.feedback = {
                  message: `Welcome ${args.entity.alopu.username}. You have successfully ${args.newEntity ? 'signed up with a' : 'logged in with your'} Growlights.com.au acccount`,
                  color: 'positive',
                  timeout: 2000,
                }
                store.dispatch('switchUserSuccess', args)
              })
              .catch(err=>{
                console.error('there was an error processing a login attempt via Growlights.com.au because of Firebase', err)
                args.feedback = {
                  message: `There was an error logging in with your Growlights.com.au account`,
                  color: 'negative',
                  timeout: 4000,
                }
                store.dispatch('switchUserFailure', args)
              })

          })
          .catch(err=>{
            console.error('Something went wrong authenticating the user with firebase: ', err)
            args.feedback = {
              message: `There was an error logging in with your Growlights.com.au account`,
              color: 'negative',
              timeout: 4000,
            }
            store.dispatch('switchUserFailure', args)
          })
        } else {
          console.error("there was an error processing a login attempt via Growlights.com.au because there's no firestore id assosciated with the entity, context @param args: ", args)
          args.feedback = {
            message: `There was an error logging in with your Growlights.com.au account`,
            color: 'negative',
            timeout: 4000,
          }
          store.dispatch('switchUserFailure', args)
        }
      } else {
        // catch all error
        console.error('Something went wrong syncing the user with the database: ', err)
        args.feedback = {
          message: `There was an error logging in with your Growlights.com.au account`,
          color: 'negative',
          timeout: 4000,
        }
        store.dispatch('switchUserFailure', args)
      }
  }
  // IF AUTH SOURCE == FB
  else if(args.provider == 'facebook' && args.success){
    var userID = s.getsmart(args, 'token.authResponse.userID', undefined)
    args.entity = {
      ids: {
        "userID-facebook": userID
      },
      facebook: {
        id: userID,
        tokens: [
          args.token
        ]
      },
      registered: {
        any: true,
        facebook: true
      }
    }
    /** AUTHENTICATE THE PROVIDER TOKEN & SYNC THE USER WITH THE GLOBAL STATE */
      await syncUser(args)
      .catch(err=>{
        console.error('Something went wrong syncing the user with the database: ', err)
        args.feedback = {
          message: `There was an error logging in with your Facebook account`,
          color: 'negative',
          timeout: 4000,
        }
        store.dispatch('switchUserFailure', args)
      })

      if(args.success){
        var fsid = s.getsmart(args, 'entity.firestore.id', false)
        if(fsid){
          firebaseAuth(args)
          .then(args=>{
            /** create DocumentReference */
              var ref = things.doc(fsid)
            /** set loggedIn status for this userAgent */
              s.setsmart(args, 'entity.loggedIn.'+s.getsmart(store, 'state.userAgent', ''), true)
            /** add facebook token to facebook tokens list */
              if(args.entity.facebook){
                if(args.entity.facebook.tokens){
                  args.entity.facebook.tokens.push(args.token)
                }
              }
            /** add facebook email to entity and some other facebook data */
              var facebookEmailLink = new Promise((resolve, reject)=>{
                FB.api('/me?locale=en_US&fields=name,email,picture.type(normal)', user=>{
                  if(user){
                    if(user.email){
                      // args.entity.ids["email-facebook"] = user.email
                      s.setsmart(args, 'entity.ids.email-facebook', user.email)
                      s.setsmart(args, 'entity.alopu.username', user.email)
                    }
                    Object.assign(args.entity.facebook, user)
                    s.setsmart(args, 'entity.facebook.picture', user.picture)
                  }
                  resolve(true)
                })
              })
            /** wait for the facebook data link and then set any new entity data */
              facebookEmailLink
              .then(()=>{
                ref.set(CJSON.parse(CJSON.stringify(args.entity)), {merge: true})
                .then(()=>{
                  args.feedback = {
                    message: `Welcome ${args.entity.facebook.name}. You have successfully ${args.newEntity ? 'signed up' : 'logged in'} with your Facebook acccount`,
                    color: 'positive',
                    timeout: 2000,
                  }
                  store.dispatch('switchUserSuccess', args)
                })
                .catch(err=>{
                  console.error('there was an error processing a login attempt via Facebook because of firebase', err)
                  args.feedback = {
                    message: `There was an error logging in with your Facebook account`,
                    color: 'negative',
                    timeout: 4000,
                  }
                  store.dispatch('switchUserFailure', args)
                })
              })
              .catch(err=>{
                console.error('something went wrong getting more Facebook data to link to the entity: ', err)
                args.feedback = {
                  message: `There was an error logging in with your Facebook account`,
                  color: 'negative',
                  timeout: 4000,
                }
                store.dispatch('switchUserFailure', args)
              })
          })
          .catch(err=>{
            console.error('Something went wrong authenticating the user with firebase: ', err)
            args.feedback = {
              message: `There was an error logging in with your Facebook account`,
              color: 'negative',
              timeout: 4000,
            }
            store.dispatch('switchUserFailure', args)
          })

        } else {
          console.error("there was an error processing a login attempt via Facebook because there's no firestore id assosciated with the entity, context @param args: ", args)
          args.feedback = {
            message: `There was an error logging in with your Facebook account`,
            color: 'negative',
            timeout: 4000,
          }
          store.dispatch('switchUserFailure', args)

        }
      } else {
        // catch all error
        console.error('there was an error processing a login attempt via Facebook during token authentication server side, context @param args: ', args)
        args.feedback = {
          message: `There was an error logging in with your Facebook account`,
          color: 'negative',
          timeout: 4000,
        }
        store.dispatch('switchUserFailure', args)
      }
  } else if (args.provider == 'facebook' && !args.success){
    console.error('Something went wrong with the Facebook login popup ', args)
    args.feedback = {
      message: `There was an error logging in with your Facebook account`,
      color: 'negative',
      timeout: 4000,
    }
    store.dispatch('switchUserFailure', args)
  }
  // IF AUTH SOURCE == GOOGLE
  else if(args.provider == 'google' && args.success){
    var userID = s.getsmart(args, 'token.El', undefined)
    /** google specific cleaning */
      args.token.w3 = Object.assign({}, args.token.w3)
    args.entity = {
      alopu: {
        username: args.token.w3.U3
      },
      ids: {
        "El-google": userID,
        "email-google": args.token.w3.U3
      },
      google: {
        id: userID,
        tokens: [
          args.token
        ]
      },
      registered: {
        any: true,
        google: true
      }
    }
    /** AUTHENTICATE THE PROVIDER TOKEN & SYNC THE USER WITH THE GLOBAL STATE */
      await syncUser(args).catch(err=>{
        console.error('Something went wrong syncing the user with the database: ', err)
      })

      if(args.success){
        var fsid = s.getsmart(args, 'entity.firestore.id', false)
        if(fsid){
          firebaseAuth(args)
          .then(args=>{
            /** create DocumentReference */
              var ref = things.doc(fsid)
            /** set loggedIn status for this userAgent */
              s.setsmart(args, 'entity.loggedIn.'+s.getsmart(store, 'state.userAgent', ''), true)
            /** add google token to google tokens list */
              if(args.entity.google){
                if(args.entity.google.tokens){
                  args.entity.google.tokens.push(args.token)
                }
              }
            /** add google email to entity and some other google data */
              Object.assign(args.entity.google, args.token)
            /** wait for the facebook data link and then set any new entity data */
              ref.set(CJSON.parse(CJSON.stringify(args.entity)), {merge: true})
              .then(()=>{
                args.feedback = {
                  message: `Welcome ${args.entity.google.w3.ofa}. You have successfully ${args.newEntity ? 'signed up' : 'logged in'} with your Google acccount`,
                  color: 'positive',
                  timeout: 2000,
                }
                store.dispatch('switchUserSuccess', args)
              })
              .catch(err=>{
                console.error('there was an error processing a login attempt via Google because of firebase', err)
                args.feedback = {
                  message: `There was an error logging in with your Google account`,
                  color: 'negative',
                  timeout: 4000,
                }
                store.dispatch('switchUserFailure', args)
              })

          })
          .catch(err=>{
            console.error('Something went wrong authenticating the user with firebase: ', err)
            args.feedback = {
              message: `There was an error logging in with your Google account`,
              color: 'negative',
              timeout: 4000,
            }
            store.dispatch('switchUserFailure', args)
          })
        } else {
          console.error("there was an error processing a login attempt via Google because there's no firestore id assosciated with the entity, context @param args: ", args)
          args.feedback = {
            message: `There was an error logging in with your Google account`,
            color: 'negative',
            timeout: 4000,
          }
          store.dispatch('switchUserFailure', args)
        }
      } else {
        // catch all
        console.error('there was an error processing a login attempt via Google during Google token authentication server side, context @param args: ', args)
        args.feedback = {
          message: `There was an error logging in with your Google account`,
          color: 'negative',
          timeout: 4000,
        }
        store.dispatch('switchUserFailure', args)
      }
  } else if (args.provider == 'google' && !args.success){
    console.error('Something went wrong with the Google login popup ', args)
    args.feedback = {
      message: `There was an error logging in with your Google account`,
      color: 'negative',
      timeout: 4000,
    }
    store.dispatch('switchUserFailure', args)
  }

}

export const logout = async (store, args) =>{
  var entity = CJSON.parse(CJSON.stringify(s.getsmart(store, 'state.entity', undefined)))
  var entityDefault = CJSON.parse(CJSON.stringify(s.gosmart(store, 'state.entityDefault', {})))
  s.setsmart(store, 'state.entity', entityDefault)
  s.setsmart(store, 'state.entity.alopu.carts.0.products',
    s.getsmart(entity, 'alopu.carts.0.products', [] )
  )
  s.setsmart(store, 'state.entity.alopu.carts.0.lastUpdated',
    s.getsmart(entity, 'alopu.carts.0.lastUpdated', Date.now() )
  )
  s.setsmart(store, 'state.passwordConfirmation', '')
  s.pushThing({
    option: {
      message: 'Logged out',
      color: 'positive',
      timeout: 2000
    },
    list: s.gosmart(store, 'state.feedback', []),
    keys: ['message']
  })
  // setTimeout(()=>{
  //   s.pushThing({
  //     option: {
  //       message: 'Successfully logged out',
  //       color: 'positive',
  //       timeout: 2000,
  //     },
  //     list: s.gosmart(store, 'state.feedback', [])
  //   })
  // }, 2200)
  // var entity
  let fs = s.getsmart(window, '$fs', undefined)
  var things = fs.collection(`${s.getsmart(window, 'env.level', 'dev')}/things/users`)
  var id
  if(entity){
    id = s.getsmart(entity, 'firestore.id', s.getsmart(entity, 'ids.id-firestore', undefined))
  }
  if(id){
    let ref = things.doc(id)
    // set loggedIn status for this userAgent to false
    s.setsmart(entity, 'loggedIn.'+s.getsmart(store, 'state.userAgent', ''), false)
    s.popThing({
      option: {
        clientId: store.state.clientId
      },
      list: entity.sessions,
      keys: ['clientId'],
      keymatchtype: 'broad'
    })
    await ref.set(
      entity,
      {
        merge: true
      }
    )
    .catch((err)=>{
      console.error('there was an error committing logout to firestore: ', err)
    })
  }
}

export const resetEntity = (store, args) => {
  // var entityDefault = CJSON.parse(CJSON.stringify(store.state.entityDefault))
  var entityDefault = CJSON.parse(CJSON.stringify(store.state.entityDefault))
  store.commit('entity', {entity: entityDefault})
}

export const syncDevice = (store, device) => {
  var entityDevices = s.gosmart(store, 'state.entity.inventory.devices', [])
  var userAgent = s.getsmart(store, 'state.userAgent', '')
  if(entityDevices){
    var entityDevice = s.getThing({
      option: {
        'userAgent': userAgent
      },
      list: entityDevices,
      keys: ['userAgent'],
      keymatchtype: 'broad'
    })
  }
  if(device == 'this' && entityDevice){
    uap.setUA(userAgent)
    let parsed = uap.getDevice
    Object.assign(entityDevice, parsed)
  }
}
// export const loadSchema = (store, args) => {
// 	if(args){
// 		if(args.schema && typeof args.schema == 'string'){
// 			FL.schemas.subscribe(args.schema, function(err, schema){
// 				if(!err){
// 					if(schema){
// 						store.commit('setSchema', schema)
// 					} else {
// 						console.error(`no schema was supplied but there was no error`)
// 					}
// 				} else if(err){
// 					console.error(`error: ${err}`)
// 				}
// 			})
// 		}
// 	}
// }

export const manifestClientId = (store, uuid) => {
  if(!store.state.clientId){
    store.commit('clientId', uuid)
  }
}

export const mergeCarts = (store, args) => {

}

const axiosConf = {
  headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
  }
}

/** template auth code */
  // var things = fs.collection(`${s.getsmart(window, 'env.level', 'dev')}/things/users`)
  // var username = s.getsmart(store, 'state.entity.alopu.username', undefined)
  // things = things.where('username', "==", username)
  // things.get()
  // .then(res=>{
  // 	// NO FACEBOOK LINKED NATIVE ACCOUNT
  // 	if(res.empty){
  // 		things.add({})
  // 		.then((res)=>{
  // 			args.entity = {
  // 				ids: {
  // 					"username-alopu": username,
  // 					"id-firestore": res.id
  // 				},
  // 				firestore: {
  // 					id: res.id
  // 				},
  // 				alopu: {
              // username: username,
              // password: s.getsmart(store, 'state.entity.alopu.password', undefined)
  // 					tokens: [ // PUSH JWT
  // 						args.token
  // 					]
  // 				},
  // 				registered: {
            // any: true,
            // alopu: true
  // 				}
  // 			}
  // 			// set loggedIn status for this userAgent
  // 			if(loggedIn){
  // 				s.getsmart(store, 'state.entity.loggedIn.'+s.getsmart(store, 'state.userAgent', ''), false)
  // 			}
        // res.set(CJSON.parse(CJSON.stringify(args.entity)), {merge: true})
        // .then(()=>{
        // 	args.feedback = {
        // 		message: `Welcome ${args.entity.alopu.username}. You have successfully signed up with your Alopu acccount`,
        // 		color: 'positive',
        // 		timeout: 2000,
        // 	}
        // 	store.dispatch('switchUserSuccess', args)
        // })
        // .catch(err=>{
        // 	console.error('there was an error processing a your login attempt', err)
        // 	args.feedback = {
        // 		message: `There was an error logging in with your Alopu account`,
        // 		color: 'negative',
        // 		timeout: 4000,
        // 	}
        // 	store.dispatch('switchUserFailure', args)
        // })
  // 		})
  // 	}
  // 	// FOUND ALOPU LINKED NATIVE ACCOUNT
  // 	else if(res.size > 0){
  // 		if(res.size > Infinity){
  // 			// handle multiple linked accounts
  // 		} else {
  // 			args.entity = res.docs[0].data()
  // 			if(args.entity.alopu){
  // 				if(args.entity.alopu.tokens){
  // 					args.entity.alopu.tokens.push(args.token)
  // 				}
  // 			}
  // 			// set loggedIn status for this userAgent
  // 			if(loggedIn){
  // 				s.getsmart(store, 'state.entity.loggedIn.'+s.getsmart(store, 'state.userAgent', ''), false)
  // 			}
  // 			var id = s.gosmart(args, 'entity.firestore.id', s.getsmart(args, 'entity.ids.id-firestore', undefined))
  // 			if(id){
  // 				let ref = things.doc(id)
  // 				ref.set(CJSON.parse(CJSON.stringify(args.entity)), {merge: true})
  // 				.then(()=>{
  // 					args.feedback = {
  // 						message: `Welcome back ${args.entity.username}. You have successfully logged in with your Alopu acccount`,
  // 						color: 'positive',
  // 						timeout: 2000,
  // 					}
  // 					store.dispatch('switchUserSuccess', args)
  // 				})
  // 				.catch(err=>{
  // 					console.error('there was an error processing a Alopu login attempt', err)
  // 					args.feedback = {
  // 						message: `There was an error logging in via your Alopu account`,
  // 						color: 'negative',
  // 						timeout: 4000,
  // 					}
  // 					store.dispatch('switchUserFailure', args)
  // 				})
  // 			}

  // 		}
  // 	}
  // })
  // .catch(err=>{
  // 	console.error('There was an error logging in via your Alopu account: ', err)
  // 	args.feedback = {
  // 		message: `There was an error logging in via your Alopu account`,
  // 		color: 'negative',
  // 		timeout: 4000,
  // 	}
  // 	store.dispatch('switchUserFailure', args)

  // })
