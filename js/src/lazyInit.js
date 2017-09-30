$('document').ready(function(){
    var myLazyLoad = new LazyLoad({
		callback_processed: function(){
			$(window).trigger('scroll');
		}
	});
})