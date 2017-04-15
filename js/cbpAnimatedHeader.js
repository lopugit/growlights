/**
 * cbpAnimatedHeader.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
 $(document).ready(function(){
 		var navHeight;
		var docElem = document.documentElement,
			header = document.querySelector( '.navbar-fixed-top' ),
			didScroll = false,
			changeHeaderOn = 300;

		navHeight = $('.navbar-fixed-top').outerHeight();
		$('body').css({marginTop: navHeight, paddingTop: '15px'});
		
		function init() {
			window.addEventListener( 'scroll', function( event ) {
				if( !didScroll ) {
					didScroll = true;
					setTimeout( scrollPage, 250 );
				}

			
			}, false );
		}

		$('nav a').on('click', function(){
			$('.navbar-collapse').removeClass('in');
		});

		function scrollPage() {
			var sy = scrollY();
			if ( sy >= changeHeaderOn ) {
				classie.add( header, 'navbar-shrink' );
			}
			else {
				classie.remove( header, 'navbar-shrink' );
			}
			didScroll = false;
		}

		function scrollY() {
			return window.pageYOffset || docElem.scrollTop;
		}

		init();

});