$(document).ready(function(){
	console.log(navHeight);
	var navHeight = $('nav').css('height');
	$('body').css({paddingTop: navHeight, paddingBottom: 0});
	console.log(navHeight);
	// window.onscroll(function(){
	// 	if (navHeight !== $('nav').css('height')) {
	// 		$('body').css({paddingTop: navHeight, paddingBottom: 0});
	// 	}
	// });

	// $(".intro-text-title").typed({
  //   strings: ["Welcome to the LED Grow Light revolution."],
  //   typeSpeed: 0
  // });
	// $(".intro-text-subtitle").typed({
  //   strings: ["Let's get started."],
  //   typeSpeed: 0
  // });
	$(".intro-text").typed({
    strings: ["Welcome to the revolution,^700 \n we'll help work out what LEDs you need."],
    typeSpeed: 5
  });

	// $('.front-page-likes').on('click')
});
