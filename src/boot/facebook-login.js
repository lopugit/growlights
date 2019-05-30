// import something here
let smarts = require('smarts')()
window.fbAsyncInit = function() {
	FB.init(
    {
      appId      : smarts.getsmart(window, 'env.fbAppId', undefined),
      cookie     : true,  // enable cookies to allow the server to access the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.8' // use graph api version 2.8
    }
  );
};
(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

import fbSignInButton from 'vue-facebook-signin-button'

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  // something to do
  Vue.use(fbSignInButton)
}
