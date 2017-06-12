$(document).on('ready',function(){

  var growRoom = new Growroom({
    height: 1.8,
    width: 3.5,
    depth: 2
  })
  growRoom.renderRoom("#default", window)
  growRoom.lights.Green720W.createDiodes()

})
function Diode(props){
  this.wavelength = props.wavelength
  this.colour = props.colour
  this.ratio = props.ratio
  this.angle = props.angle
  this.par = props.par
  this.ammount = props.ammount
}
function Growroom(dimensions){
  this.height = dimensions.height
  this.width = dimensions.width
  this.depth = dimensions.depth
  this.lights = {
    Green720W : {
      // DIMENSIONS
      height         : .06,
      width          : .83,
      depth          : .26,
      leds           : {
        ammount : 144,
        types   : [
          {
            wavelength  : 440,
            colour      : "blue",
            angle       : 140,
            ratio       : 12.5,
            // cannot access the parent object to work out the ammount for each diode off the bat
            // ammount     : function(){
            //   console.log(this)
            //   return Math.round(this)
            // }
          },
          {
            wavelength  : 460,
            colour      : "blue",
            angle       : 140,
            ratio       : 12.5,
            // cannot access the parent object to work out the ammount for each diode off the bat
            // ammount     : function(){
            //   console.log(this)
            //   return Math.round(this)
            // }
          },
          {
            wavelength  : 630,
            colour      : "red",
            angle       : 120,
            ratio       : 32.5,
            // cannot access the parent object to work out the ammount for each diode off the bat
            // ammount     : function(){
            //   console.log(this)
            //   return Math.round(this)
            // }
          },
          {
            wavelength  : 660,
            colour      : "red",
            angle       : 120,
            ratio       : 32.5,
            // cannot access the parent object to work out the ammount for each diode off the bat
            // ammount     : function(){
            //   console.log(this)
            //   return Math.round(this)
            // }
          },
          {
            wavelength  : 800,
            colour      : "red",
            angle       : 120,
            ratio       : 1,
            // cannot access the parent object to work out the ammount for each diode off the bat
            // ammount     : function(){
            //   console.log(this)
            //   return Math.round(this)
            // }
          },
          {
            wavelength  : undefined,
            temperature : 5500,
            colour      : "white",
            angle       : 120,
            ratio       : 9,
            // cannot access the parent object to work out the ammount for each diode off the bat
            // ammount     : function(){
            //   console.log(this)
            //   return Math.round(this)
            // }
          },

        ],
        diodes  : [

        ]
      },
      createDiodes : function(){
        var numOfTypes = this.leds.ammount
        var currentType = 0
        var quotaFilled = 0
        for(i = 0; i < this.leds.ammount;i++){
          // console.log(i)
          // console.log(Math.round((this.leds.types[currentType].ratio / 100)*numOfTypes)+quotaFilled)
          if (i == Math.round((this.leds.types[currentType].ratio / 100)*numOfTypes)+quotaFilled){
            quotaFilled += Math.round((this.leds.types[currentType].ratio / 100)*numOfTypes)
            currentType ++
            // console.log(quotaFilled)
            // console.log("incremented")
            // console.log(quotaFilled)

          }
          var diode = new Diode({
            wavelength  : this.leds.types[currentType].wavelength,
            colour      : this.leds.types[currentType].colour,
            angle       : this.leds.types[currentType].angle,
            ratio       : this.leds.types[currentType].ratio,
            par         : this.leds.types[currentType].par,
            ammount     : Math.round((this.leds.types[currentType].ratio / 100)*numOfTypes)
          })
          this.leds.diodes.push(diode)
          // var diode = null
          // console.log(this.leds.diodes[i])
        }
        // console.log(this.leds.diodes)
      }
    }
  }
  this.faces = {

  }

  // trying to get constructor to work
  // this.diode = function(props){
  //   this.wavelength = props.wavelength
  //   this.colour = props.colour
  //   this.ratio = props.ratio
  //   this.angle = props.angle
  //   this.par = props.par
  // }

  this.dimensions = function(){
    return {
      height: this.height,
      width: this.width,
      depth: this.depth
    }
  }
  this.renderRoom = function(roomId, scene){
    if(scene){
      if (scene.innerWidth >= 1250 & scene.innerWidth < 1500){
        this.setPx(70, roomId, scene)
        console.log(this)
      } else if (scene.innerWidth >= 1500){
        this.setPx(60, roomId, scene)
      }
      else {
        this.setPx(80, roomId, scene)
      }
    }
  }
  this.setPx = function(ratio, roomId, scene){

    $(roomId+">#front").css("width", (ratio/100)*scene.innerWidth+"px")
    $(roomId+">#front").css("min-width", (ratio/100)*scene.innerWidth+"px")
    this.widthPx = scene.innerWidth*(ratio/100)
    this.heightPx = this.widthPx*(this.height/this.width)
    $(roomId+">#front").css("height", this.heightPx+"px")
    this.depthPx = this.widthPx*(this.depth/this.width)

    // Sets scene css for the .tent div container which should be modified to be a "scene" object with perspective and tent rotation linked to mouse dragging
    $("#default").css({
      "perspective" : "800px",
      "width"       : this.widthPx+"px",
      "height"      : this.heightPx+"px"
    })

    $(roomId+">#back").css("width", (ratio/100)*scene.innerWidth+"px")
    $(roomId+">#back").css("min-width", (ratio/100)*scene.innerWidth+"px")
    $(roomId+">#back").css("height", this.heightPx+"px")
    $(roomId+">#back").css("transform", "translateZ(-"+this.depthPx+"px)")

    // Sets the left wall dimensions
    $(roomId+">#left").css("width", this.depthPx+"px")
    $(roomId+">#left").css("min-width", this.depthPx+"px")
    $(roomId+">#left").css("height", this.heightPx+"px")
    $(roomId+">#left").css({
      "transform" : "rotateY(-90deg) translate3d(-"+this.depthPx/2+"px, 0px, "+this.widthPx/2+"px)"
    })

    // Sets the right wall dimensions
    $(roomId+">#right").css("width", this.depthPx+"px")
    $(roomId+">#right").css("min-width", this.depthPx+"px")
    $(roomId+">#right").css("height", this.heightPx+"px")
    $(roomId+">#right").css({
      "transform" : "rotateY(-90deg) translate3d(-"+this.depthPx/2+"px, 0px, -"+this.widthPx/2+"px)"
    })

    // Sets the floor wall dimensions
    $(roomId+">#bottom").css("width", this.widthPx+"px")
    $(roomId+">#bottom").css("min-width", this.widthPx+"px")
    $(roomId+">#bottom").css("height", this.depthPx+"px")
    $(roomId+">#bottom").css({
      "transform" : "rotateX(-90deg) translate3d(0px, "+(this.depthPx/2)+"px, "+((this.depthPx/2)-((this.depthPx-this.heightPx)/2))+"px)"
    })

    $(roomId+" #Green720W #front").css({
      "width"   : (this.lights["Green720W"].width/this.width)*this.widthPx,
      "height"  : (this.lights["Green720W"].height/this.height)*this.heightPx,
      "background-color" : "green"
    })

    // this.lights.light1 = new Photon.Light()
    // this.lights.light1.moveTo(0,1000,-200)
    //
    // this.faces.all = new Photon.FaceGroup(
    //   $('#default')[0],
    //   [
    //     $(".wall#floor")[0],
    //     $(".wall#leftWall")[0],
    //     $(".wall#rightWall")[0],
    //     $(".wall#backWall")[0]
    //   ],
    //   maxShade    = .5,
    //   maxTint     = 1,
    //   isBackFaced = true
    // )
    // this.faces.all.render(this.lights.light1, true, true)

  }
}

var cube = function(props){
  this.id = props.id
  this.height = props.height
  this.width = props.width
  this.depth = props.depth
  this.pxr = props.pxr
  if (props.scene.type == "window"){
    if (props.ratio){
      this.pxr = (props.scene.scene.innerWidth*(props.ratio/100))/this.width
      this.widthPx = this.pxr*this.width
    }
    else  {
      this.pxr = props.scene.scene.innerWidth/this.width
      this.widthPx = this.pxr*this.width
    }
    this.heightPx = this.pxr*this.height
    this.depthPx = this.pxr*this.depth

  } else if (props.scene.type == "object") {
    this.widthPx = props.pxr*this.width
    this.heightPx = props.pxr*this.height
    this.depthPx = props.pxr*this.depth
  }


}
