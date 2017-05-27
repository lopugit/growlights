$(document).ready(function(){

  // Cache selectors
  var lastId,
      topMenu = $(".flex-nav-menu"),
      topMenuHeight = topMenu.outerHeight(),
      // All list items
      menuItems = topMenu.find("a"),
      // Anchors corresponding to menu items
      scrollItems = menuItems.map(function(){
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
      });


  // Bind click handler to menu items
  // so we can get a fancy scroll animation
  menuItems.click(function(e){
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
    $('html, body').stop().animate({ 
        scrollTop: offsetTop
    }, 300);
    e.preventDefault();
  });  

  
  // function setSize() {    
  //   var navHeight = $("#navmenu").outerHeight(true);
  //   var fromTop = $(window).scrollTop()+navHeight; 
  //   $("nav div a").css({"height" : navHeight + "px","line-height" : navHeight + "px"});
  // };

  // function changeSize() {
  //   var action = 220;    
  //   var navHeight = $("#navmenu").outerHeight(true);
  //   var fromTop = $(window).scrollTop()+navHeight; 


  //   if (fromTop > action) {
  //     $("nav li").addClass("top-menu-collapsed");
  //   }
  //   else if (fromTop <= action) {
  //     $("nav li").removeClass("top-menu-collapsed");
  //   };

  //   $("nav div a").css({"height" : navHeight + "px","line-height" : navHeight + "px"});
  //  }; 

  function changeActiveMenu() {
    var navHeight = $(".flex-nav-menu").outerHeight(true);
    var fromTop = $(window).scrollTop()+navHeight;
    // console.log(fromTop);
    if (fromTop > 200) {
      $('nav').removeClass('opaque')
    };
    if (fromTop <= 200) {
      $('nav').addClass('opaque')
    };
    var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
    });

    cur = cur[cur.length-1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
       lastId = id;
       // Set/remove active class
       menuItems
         .parent().removeClass("active")
         .end().filter("[href='#"+id+"']").parent().addClass("active");
    }; 
  };

  // setSize();
  changeActiveMenu();

  $(window).scroll(function(){    
    // var navHeight = $("#navmenu").outerHeight(true);
    // var fromTop = $(this).scrollTop()+navHeight; 
    changeActiveMenu();

    // changeSize();
    // setTimeout(changeSize,200);
    // setTimeout(function() {topMenuHeight = topMenu.outerHeight()},150);
    

  });
});