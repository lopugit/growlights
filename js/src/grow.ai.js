$(document).on('ready',function(){

	var mainScene = new Scene({
		render			: true,
		heightRatio	: 70,
		perspective	: 1200,
		id					: "scene",
		type				: "object"
	})
	var growRoom = new Growroom({
    height				: 1.8,
    width					: 3.5,
    depth					: 2,
		ratio					: 80,
		render				: true,
		id						: "growRoom",
		class					: 'tent',
		scene					: mainScene,
		position			: {x:0,y:0,z:0,rx:0}
  })
	var green360Wtemplate = {
		width			:	1.2,
		height		: .02,
		depth			: .05,
		id				: "green360W1",
		name			:	"Mars Green 360W",
		class 		: 'growlight',
		group			: 'lights',
		scene			: growRoom.scene,
		sizeSelf	: true,
		// position	: {
		// 	x				: growRoom.width/2,
		// 	y				: growRoom.height-(growRoom.height/3),
		// 	z				: growRoom.depth/2
		// },
		position	: {
			x				: growRoom.width/2,
			y				: 2,
			z				: growRoom.depth/2,
			rx			: 90,
			ry			: 90,
			type		: "center"
		},

		parent			: growRoom.object,
		leds				: {
			ammount			:	48,
			types				: [
				{
					nm		:	440,
					angle	:	140,
					ratio	: 12.5,
					colour: "blue",
					lux		: "X"
				},
				{
					nm		:	460,
					angle	:	140,
					ratio	: 12.5,
					colour: "blue",
					lux		: "X"
				},
				{
					nm		:	630,
					angle	:	120,
					ratio	: 32.5,
					colour: "red",
					lux		: "X"
				},
				{
					nm		:	660,
					angle	:	120,
					ratio	: 32.5,
					colour: "blue",
					lux		: "X"
				},
				{
					nm		:	730,
					angle	:	120,
					ratio	: 1,
					colour: "infra-red",
					lux		: "X"
				},
				{
					temperature		:	5500,
					angle					:	120,
					ratio					: 9,
					colour				: "white",
					lux						: "X"
				}
			],
			layout			: {
				// zPadding			: 0.035,
				// xPadding			: .015,
				// The constructor auto calculates x/zNum from ammount/x/zNum
				zNum					: 1,
				xNum					: 24,
				width					: 0.01,
				depth					: 0.01,
			},
			makeDiodes 	: true
		}
	}
	growRoom.lights.push(
		new GrowLight(green360Wtemplate)
	)

	green360Wtemplate.position.y = 1
	green360Wtemplate.position.ry = 0

	// green360Wtemplate.position.x = (growRoom.width/4)*3
	green360Wtemplate.id = "green360W2"
	growRoom.lights.push(
		new GrowLight(green360Wtemplate)
	)
	// growRoom.renderCoverage({
	// 	resolution: 0.2,
	// 	includeY	: false,
	// 	squareSize: .01,
	// 	yPlane		: 0.35,
	// 	sides			: ["front"],
	// 	calcLumens: false,
	// 	position	: {
	// 		type	: 'center'
	// 	}
	// })
	growRoom.renderCoverage({
		resolution: 0.2,
		squareSize: 0.2,
		includeY	: false,
		type			: '3d',
		// sides			: ["bottom", "front"],
		class 		: "floorGrid",
		yPlane		: 0.1,
		position	: {
			type: 'center'
		}
	})

	// //console.log("scene pxr = "+mainScene.pxr)
	// var light = new Photon.Light();


})

// 3D LIBRARY STUFF
function Scene(props){

  this.ratio = props.ratio || 100
	// Makes our heightRatio either equal to a pixel ratio if height is
	// undefined but width in some real life unit is defined, or if both
	// height and width are defined, we use their ratio as is logical
	if(props.height == undefined){
		this.heightRatio = props.heightRatio || 75
	} else {
		this.heightRatio = props.height/props.width
	}
	this.perspective = props.perspective || 800
	this.height = props.height
	this.width = props.width
	this.id = props.id || "scene"
	this.containerId = props.containerId || "sceneContainer"
	this.type = props.type || "window"
	this.unit = props.unit || "m"
	this.pxr = props.pxr
	this.objects = props.objects || {}
	this.render = function(){
		$("#"+this.id).css(this.css)
	}
	this.addRootObject = function(object){
		if(object.id){
			this.objects[object.id] = object
		}
		if(this.type == "window"){
			if(this.objects[object.id] !== undefined){
				this.pxr = (window.innerWidth*(this.objects[object.id].ratio/100))/this.objects[object.id].width
				this.objects[object.id].object = new Cube({
						height    : this.objects[object.id].height,
						width     : this.objects[object.id].width,
						depth     : this.objects[object.id].depth,
						ratio     : this.objects[object.id].ratio,
						id        : this.objects[object.id].id,
						render		: true,
						pxr				: this.pxr,
						scene			: {type: "window", id:"scene"}
					})
			}
		}
		if(this.objects[object.id].render == true){
			if(this.objects[object.id].sceneObjectId == undefined){

				this.objects[object.id].object.render({
					pxr				: this.pxr
				})
			}
		}
	}
	if (this.type == "window"){
    // this.widthPx = window.innerWidth*this.ratio/100
		// this.heightPx = window.innerWidth*this.heightRatio/100
		this.css = {
			// width					:	this.widthPx+"px",
			// height				: this.heightPx+"px",
			perspective		: this.perspective+"px"
		}
		// if(props.render == true){
		// 	this.render()
		// }
  }
	else if (this.type == ("object" || "element")){
		// this.widthPx = $("#"+this.id)[0].offsetWidth*this.ratio/100,
		// this.heightPx = this.widthPx*this.heightRatio/100,
		this.css = {
			// width					:	this.widthPx+"px",
			// height				: this.heightPx+"px",
			perspective		: this.perspective+"px"
		}
		if(props.render == (true || undefined)){
			this.render()
		}
	}


}
function Cube(props){
  this.id = props.id
	this.class = props.class+" dObject"
  this.height = props.height
  this.width = props.width
  this.depth = props.depth
  this.scene = props.scene || props.parent.scene
  this.ratio = props.ratio || 100
  this.sides = props.sides || [
    "front",
    "back",
    "left",
    "right",
    "bottom",
    "top"
  ]
  this.faces = {}
	this.position = props.position || {x:0,y:0,z:0,rx:0,ry:0,rz:0}
	if(this.position.rx == undefined){
		this.position.rx = 0
	}
	if(this.position.ry == undefined){
		this.position.ry = 0
	}
	if(this.position.rz == undefined){
		this.position.rz = 0
	}
	this.parent = props.parent
	this.group = props.group
	this.sizeSelf = props.sizeSelf
	if(this.sizeSelf == undefined){
		this.sizeSelf = true
	}
	this.render = props.render || true
	this.type = props.type || '3d'
  this.Face = function(props){
    this.side = props.side
		this.id = props.side
		this.parent = props.parent
		this.features = props.features
		this.type = props.type || '3d'
    var pxr = props.pxr
    if (this.side == "front") {
      this.height = props.height
      this.width = props.width
      this.heightPx = props.height*pxr
      this.widthPx = props.width*pxr
      this.css = {
        "width"   : this.widthPx+"px",
        "height"  : this.heightPx+"px"
      }
    }
    else if (this.side == "back"){
      this.height = props.height
      this.width = props.width
      this.heightPx = props.height*pxr
      this.widthPx = props.width*pxr
      this.css = {
        "width"     : this.widthPx+"px",
        "height"    : this.heightPx+"px",
        "transform" : "translate3d(0px, 0px, -"+ (props.depth*pxr) +"px)"
      }
    }
    else if (this.side == "left"){
      this.height = props.height
      this.width = props.depth
      this.heightPx = props.height*pxr
      this.widthPx = props.depth*pxr
      this.css = {
        "width"     : this.widthPx+"px",
        "height"    : this.heightPx+"px",
        "transform" : "rotateY(90deg)  translate3d("+ (this.widthPx)/2 +"px, 0px, "+ (props.width*pxr)/2 +"px)"
      }
    }
    else if (this.side == "right"){
      this.height = props.height
      this.width = props.depth
      this.heightPx = props.height*pxr
      this.widthPx = props.depth*pxr
      this.css = {
        "width"     : this.widthPx+"px",
        "height"    : this.heightPx+"px",
        "transform" : "rotateY(-90deg)  translate3d(-"+ (this.widthPx)/2 +"px, 0px, "+ (props.width*pxr)/2 +"px)"
      }
    }
    else if (this.side == "bottom"){
      this.height = props.depth
      this.width = props.width
      this.heightPx = props.depth*pxr
      this.widthPx = props.width*pxr
      this.css = {
        "width"     : this.widthPx+"px",
        "height"    : this.heightPx+"px",
        "transform" : "rotateX(-90deg) translate3d(0px, "+ 0.5*(this.heightPx) +"px, "+ (((props.height*pxr)/2)-1) +"px)"
      }
    }
    else if (this.side == "top"){
      this.height = props.depth
      this.width = props.width
      this.heightPx = Math.round(props.depth*pxr)
      this.widthPx = Math.round(props.width*pxr)
      this.css = {
        "width"     : this.widthPx+"px",
        "height"    : this.heightPx+"px",
        "transform" : "rotateX(-90deg) translate3d(0px, "+ 0.5*(this.heightPx) +"px, -"+ (Math.round(props.height*pxr))/2 +"px)"
      }
    }
		this.addFeature = function(props){
			// this.features.push()
		}
  }
  this.createFaces = function(){
		if(this.type == '2d'){
			var newFace = new this.Face({
				side      : 'front',
				height    : this.height,
				width     : this.width,
				depth     : this.depth,
				pxr       : this.scene.pxr,
				type			: '2d'
			})
			this.faces['front'] = newFace

		}
		else if (this.type == '3d') {
			for(var f=0;f<this.sides.length;f++){
				// console.log("f is "+f+"for counting faces");
				var newFace = new this.Face({
					side      : this.sides[f],
					height    : this.height,
					width     : this.width,
					depth     : this.depth,
					pxr       : this.scene.pxr,
					parent		: this
				})
				this.faces[this.sides[f]] = newFace
			}
		}
		else if (this.type == 'custom'){
			//console.log(":yep");
			//console.log(this.sides)
			for(i=0;i<this.sides.length;i++){
				var newFace = new this.Face({
					side      : this.sides[i],
					height    : this.height,
					width     : this.width,
					depth     : this.depth,
					pxr       : this.scene.pxr,
					parent		: this
				})
				//console.log()
				this.faces[this.sides[i]] = newFace
			}
		}
    // //console.log(this.faces)
  }
  this.draw = function(props){
		/* PURE HTML
		var element = document.createElement('DIV')
		element.setAttribute('id', this.id)
		element.setAttribute('class', this.class)
		document.getElementById(this.scene.id).appendChild(element)
		*/
		/* JQUERY	*/

		// If the cube has a parent object, we make the parent object string to select the parent later
		if(this.parent !== undefined){
			var parentId = " #"+this.parent.id
		}
		else {
			var parentId = ''
		}
		// If the cube is part of a group, we check if the group exists, if not, we make the group div and append our new object
		// In the group, if it exists we just append the new object
		if(this.group !== undefined){
			if($("#"+this.scene.id+parentId+" > #"+this.group).length < 1){
				//console.log("The group "+this.group+" doesn't exist yet, let's manifest it")
				var $groupElement = $('<div>', {id:this.group, class:'group'})
				$("#"+this.scene.id+parentId).append($groupElement)
				var $element = $('<div>', {id:this.id, class:this.class})
				$("#"+this.scene.id+parentId+" #"+this.group).append($element)
			}
			else {
				//console.log("the group already exists and we just append object")
				//console.log(this)
				var $element = $('<div>', {id:this.id, class:this.class})
				//console.log(parentId)
				$("#"+this.scene.id+parentId+" #"+this.group).append($element)
			}
		}
		else {
			var $element = $('<div>', {id:this.id,class: this.class})
			$("#"+this.scene.id+parentId).append($element)
		}
		if(this.type == '2d'){
			var $face = $('<div>', {id:'front',class: 'face'})
			$("#"+this.scene.id+" #"+this.id).append($face)
			//console.log("SO THIS SHOULD NOT EVEN RUN")
      $("#"+this.scene.id+parentId+" #"+this.id+" > #"+this.sides[0]).css(this.faces['front'].css)

		}
		else if (this.type == '3d'){
			for(var l=0;l<this.sides.length;l++){
				//console.log(this.id)
				//console.log(this.sides)
				//console.log(this.faces)
				//console.log("this is what we're doing now with 3d, figuring out why it loops forever when making groups or deciding how to use a group")
				//console.log(i)
				// console.log("l equals: "+l+" to count the sides");

				var $face = $('<div>', {id:this.sides[l],class: 'face'})
				$("#"+this.scene.id+parentId+" #"+this.id).append($face)
				$("#"+this.scene.id+parentId+" #"+this.id+" > #"+this.sides[l]).css(this.faces[this.sides[l]].css)
			}
		}
		//console.log("this is this")
		//console.log(this);

		if(this.sizeSelf == true){
			//console.log("SHOULD ONLY SIZE SELF TWICE")
			//console.log("sizing self "+this.widthPx)
			$("#"+this.scene.id+parentId+" #"+this.id).css({
				width				: this.widthPx,
				height			: this.heightPx
			})
		}
		// //console.log("we do this when position = ")
		// //console.log(this.position)
		if(this.position !== undefined){
			if(this.parent !== undefined){
				// //console.log(this.position)
				if(this.position.type == "center"){
					// //console.log("yay")
					var adjustX = Math.round(this.widthPx/2)
							adjustY = Math.round(this.heightPx/-2)
							adjustZ = Math.round(this.depthPx/2)
				}
				else {
					var adjustX = 0
							adjustY = 0
							adjustZ = 0
				}

				if(this.position.z<0){
					// //console.log()
					$("#"+this.scene.id+" #"+this.id).css({
						transform: "translate3d("+Math.round(((this.position.x*this.scene.pxr))-adjustX)+"px,"+Math.round((this.position.y*this.scene.pxr)+adjustY)*-1+"px,"+Math.round(((this.position.z*this.scene.pxr)-adjustZ)*-1)+"px) rotateX("+this.position.rx+"deg) rotateY("+this.position.ry+"deg) rotateZ("+this.position.rz+"deg)"
					})
					// console.log("translate3d("+Math.round(((this.position.x*this.scene.pxr))-adjustX)+"px,"+Math.round((this.position.y*this.scene.pxr)+adjustY)*-1+"px,"+Math.round(((this.position.z*this.scene.pxr)-adjustZ)*-1)+"px) rotateX("+this.position.rx+"deg) rotateY("+this.position.ry+"deg) rotateZ("+this.position.rz+"deg)")

				}
				else {
					// //console.log("this should run when setting light css")
					// //console.log(this.position.x+" "+this.scene.pxr)
					// //console.log(this.position.x*this.scene.pxr)
					// //console.log(adjustX)
					//console.log(this.id +" is the id we want")
					if(this.parent.id !== undefined){
						var parentId = ' #'+this.parent.id
					}
					else {
						var parentId = ''
					}
					//console.log("#"+this.scene.id+parentId+" #"+this.id);
					$("#"+this.scene.id+parentId+" #"+this.id).css({
						transform: "translate3d("+Math.round(((this.position.x*this.scene.pxr))-adjustX)+"px,"+Math.round((this.position.y*this.scene.pxr)+adjustY)*-1+"px,"+Math.round(((this.position.z*this.scene.pxr)-adjustZ)*-1)+"px) rotateX("+this.position.rx+"deg) rotateY("+this.position.ry+"deg) rotateZ("+this.position.rz+"deg)"
					})
					//console.log("does this work?");
					//console.log(this.position.x*this.scene.pxr)
					// console.log(this.id)
					// console.log("translate3d("+(((this.position.x*this.scene.pxr))-adjustX)+"px,"+((this.position.y*this.scene.pxr)+adjustY)*-1+"px,"+(((this.position.z*this.scene.pxr)-adjustZ)*-1)+"px) rotateX("+this.position.rx+"deg) rotateY("+this.position.ry+"deg) rotateZ("+this.position.rz+"deg)")
				}
			}
			else {
				// //console.log("we are running this")
				$("#"+this.scene.id+" #"+this.id).css({
					transform: "translate3d("+Math.round(((this.position.x*this.scene.pxr)))+"px,"+Math.round(this.position.y*this.scene.pxr)+"px,"+Math.round(((this.position.z*this.scene.pxr)))+"px) rotateX("+this.position.rx+"deg) rotateY("+this.position.ry+"deg) rotateZ("+this.position.rz+"deg)",
				})
				console.log("translate3d("+Math.round(((this.position.x*this.scene.pxr)))+"px,"+Math.round(this.position.y*this.scene.pxr)+"px,"+Math.round(((this.position.z*this.scene.pxr)))+"px) rotateX("+this.position.rx+"deg) rotateY("+this.position.ry+"deg) rotateZ("+this.position.rz+"deg)")
			}
		}
  }
	// console.log("The scene is ")
	// console.log(this.scene);
	if(this.scene == undefined){
	}
	else if (this.scene.type == "window"){
		// thought this catered for widths an units that change between 1.2 ~ 0.8
		// ie the change between >1 and <1 but we don't need it
		if(this.width >= 1){
			if(this.scene.pxr == undefined){
				this.scene.pxr = (window.innerWidth*(this.ratio/100))/this.width
			}
		}
		else if (this.width < 1){
			if(this.scene.pxr == undefined){
				this.scene.pxr = (window.innerWidth*(this.ratio/100))*this.width
			}
		}
    this.widthPx = this.scene.pxr*this.width
    this.heightPx = this.scene.pxr*this.height
    this.depthPx = this.scene.pxr*this.depth
		this.createFaces()

  }
  else if (this.scene.type == "object") {
		// console.log(this.scene.pxr+" should not equal undefined");
		// console.log("and "+this.width+" should be less than 1 for diodes");
		if(this.width >= 1){
			if(this.scene.pxr == undefined){
				this.scene.pxr = ($("#"+this.scene.id)[0].offsetWidth*(this.ratio/100))/this.width
			}
		}
		else if (this.width < 1){
			if(this.scene.pxr == undefined){
				this.scene.pxr = ($("#"+this.scene.id)[0].offsetWidth*(this.ratio/100))*this.width
			}
		}
    this.widthPx = this.scene.pxr*this.width
    this.heightPx = this.scene.pxr*this.height
    this.depthPx = this.scene.pxr*this.depth
		this.createFaces()
  }
	if(this.render == true){
		//console.log('rendering')
		this.draw()
	}


}
function Growroom(props){
  this.height = props.height
  this.width = props.width
  this.depth = props.depth
	this.ratio = props.ratio || 100
	this.id = props.id || "defaultRoom"
	this.class = props.class || 'tent'
	this.scene = props.scene
	this.render = props.render || true
	this.lights = props.lights || []
	this.position = props.position || {x:0,y:0,z:0}
	this.object = new Cube({
		height		: this.height,
		width			: this.width,
		depth			: this.depth,
		ratio			: this.ratio,
		scene			:	this.scene,
		id				: this.id,
		class 		: this.class,
		sizeSelf	: props.sizeSelf || true,
		position	: this.position || {x:0,y:0,z:0}
	})
	this.coverage = []
	this.addLight = function(props){
		//something
	}
	// Returns height, width, depth in an object
	this.dimensions = function(){
		return {
			height: this.height,
			width: this.width,
			depth: this.depth
		}
	}
	this.addChildObject = function(props){

	}
	this.renderCoverage = function(props){
		/* include @param-object faces to be calculated
		* include @param-interger resolution which is the size of the squares that will be evaluated
		* include @param-array[string] lights which is an array of light id's you want to calculate the coverage for
		*/
		props.class = props.class || 'floorCoverage'
		this.coverage[props.class] = []
		if(props.yPlane == undefined){
			props.yPlane = 0.02
		}
		props.includeY == props.includeY || false
		for(var x=0;x<Math.floor(this.width/props.resolution);x++){
			for(var z=0;z<Math.floor(this.depth/props.resolution);z++){
				var position = {}
				position.type = props.position.type || 'normal'
				if(props.position !== undefined){
					if(props.position.type == 'center'){
						position.x = ((x*props.resolution)+props.resolution/2)+((this.width)-(Math.floor(this.width/props.resolution)*props.resolution))/2
						if(props.includeY == false){
							position.y = props.yPlane || 0.02
						}
						position.z = ((z*props.resolution)+(props.resolution/2))+((this.depth)-(Math.floor(this.depth/props.resolution)*props.resolution))/2
					}
					else {
						// props.position.xOffset = ((this.width)-(Math.floor(this.width/props.resolution)*props.resolution))/2
						position.x = (x*props.resolution)
						position.z = (z*props.resolution)
						position.y = props.yPlane
					}
				}
				if(props.includeY == true){
					for(var y=0;y<Math.floor(this.height/props.resolution);y++){
						if(position.type == 'center'){
							position.y = ((y*props.resolution)+(props.resolution*.12)/2)
						} else {
							position.y = (y*props.resolution)+props.yPlane
						}
						var coverageSquare = new Cube({
							width			: props.squareSize || 0.05,
							height		: props.squareSize || 0.05,
							depth			: props.squareSize || 0.05,
							sides			: props.sides,
							group			: 'coverage',
							class 		: props.class || 'floorCoverage',
							id				: (props.class+Math.round(Math.random()*1000)+"R" || 'floorCoverage')+'X'+x+"Y"+y+"Z"+z+Math.round(Math.random()*1000)+"R",
							parent		: this.object,
							position	: position

						})
						coverageSquare.lightSources = []
						this.coverage[props.class].push(coverageSquare)
					}
				}
				else {
					var coverageSquare = new Cube({
						width			: props.squareSize || props.resolution || 0.05,
						height		: props.squareSize || props.resolution || 0.05,
						depth			: props.squareSize || props.resolution || 0.05,
						sides			: props.sides || ["bottom","front","top","left","right","back"],
						group			: 'coverage',
						class 		: props.class || 'floorCoverage',
						id				:  (props.class+Math.round(Math.random()*1000)+"R" || 'floorCoverage')+'X'+x+"Y"+Math.round(position.y)+"Z"+z+Math.round(Math.random()*100),
						parent		: this.object,
						position	: position
					})
					coverageSquare.lightSources = []
					this.coverage[props.class].push(coverageSquare)

				}
			}
		}
		if(props.calcLumens !== false){

			for(var point=0; point<this.coverage[props.class].length;point++){
				this.coverage[props.class][point].lumensPsqm = 0
				// console.log(this.coverage.length);
				for(var light=0;light<this.lights.length;light++){
					// console.log(this.lights);
					// console.log(light)
					// console.log("this is the ammount of lights we do")
					for(var diode=0;diode<this.lights[light].leds.diodes.length;diode++){
						// if(this.lights[light].position.type ){
						//
						// }
						// console.log(this.lights.length);
						var tempDiode = this.lights[light].leds.diodes[diode]
						// console.log(this.coverage[props.class][point])
						if(this.coverage[props.class][point].position.type == 'center'){
							// console.log("it was center");
							var result = CoverageAt({
								diode	: tempDiode,
								x			: this.coverage[props.class][point].position.x,
								y			: this.coverage[props.class][point].position.y,
								z			: this.coverage[props.class][point].position.z,

							})
							this.coverage[props.class][point].lightSources.push(tempDiode)
							// console.log(this.coverage[props.class][point].lumens);
							// console.log(result);
							// console.log(result)
							this.coverage[props.class][point].lumensPsqm += result
							// console.log(this.coverage[props.class][point].lumens);
							// console.log(this.coverage[props.class][point].lightSources)
						}
						else {
							// console.log("It wasn't!");
							var results = []
							for(var num=0;num<4;num++){
								if(num==0){
									var xAdjustment = (this.coverage[props.class][point].width/2)
									var zAdjustment = (this.coverage[props.class][point].depth/2)
								}
								else if(num==1){
									var xAdjustment = (this.coverage[props.class][point].width/2)*-1
									var zAdjustment = (this.coverage[props.class][point].depth/2)
								}
								else if(num==2){
									var xAdjustment = (this.coverage[props.class][point].width/2)
									var zAdjustment = (this.coverage[props.class][point].depth/2)*-1
								}
								else if(num==3){
									var xAdjustment = (this.coverage[props.class][point].width/2)*-1
									var zAdjustment = (this.coverage[props.class][point].depth/2)*-1
								}
								results.push(CoverageAt({
									diode	: tempDiode,
									x			: this.coverage[props.class][point].position.x+xAdjustment,
									y			: this.coverage[props.class][point].position.y,
									z			: this.coverage[props.class][point].position.z+zAdjustment,
								}))
							}
							// console.log(results);
							var averageOf = (results.reduce((a,b)=> a+b, 0))/results.length
							// console.log(averageOf)
							// console.log(this.coverage[props.class][point]);
							this.coverage[props.class][point].lightSources.push(tempDiode)
							this.coverage[props.class][point].lumensPsqm += averageOf
							if(this.coverage[props.class][point].id == 'floorGridX5Y0Z3'){
								console.log(this.coverage[props.class][point].lumensPsqm);
								// console.log(this.coverage[props.class][point]);
								// console.log(this.coverage[props.class[point]])
							}
						}
					}
					this.coverage[props.class][point].lumens = this.coverage[props.class][point].lumensPsqm * ((this.coverage[props.class][point].width * this.coverage[props.class][point].depth))
					// console.log(this.coverage[props.class][point]);
				}
				// console.log("the point we want")
				// console.log(this.coverage[props.class][point])
				var str ='<div class="floorGridData" id="'+this.coverage[props.class][point].id+'data" style="transform: rotateX(90deg) translate3d(0px, -'+40*2+'px, -16px)"><div class="data">Lux: '+Math.round(this.coverage[props.class][point].lumensPsqm)+'</div><div class="data">Lumens: '+Math.round(this.coverage[props.class][point].lumens)+'</div></div>'
				// var html = $.parseHtml(str)

				// var $dataElement = $('<div>', {id:this.coverage[props.class][point].id+"data", class:'floorGridData'})
				$("#"+this.coverage[props.class][point].id+' #'+this.coverage[props.class][point].sides[0]).append(str)
				// this.coverage[props.class][point]
			}
			var highestNum = 0
			for(var point=0; point<this.coverage[props.class].length;point++){
				// console.log(this.coverage)
				if(this.coverage[props.class][point].lumensPsqm > highestNum){
					// console.log(this.coverage[props.class][point]);
					highestNum = this.coverage[props.class][point].lumensPsqm
				}
				// console.log("highest number");
				// console.log(highestNum)
			}
			for(var point=0; point<this.coverage[props.class].length;point++){
				if(this.coverage[props.class][point].id == 'floorGridX5Y0Z3'){
					console.log("the second round");
					console.log(this.coverage[props.class][point].lumensPsqm);
					console.log(this.coverage[props.class][point].lumensPsqm/(highestNum*2));
					// console.log(this.coverage[props.class][point]);
					// console.log(this.coverage[props.class[point]])
				}

				$('#'+this.coverage[props.class][point].scene.id+' #'+this.coverage[props.class][point].id+' .face').css({
					// background	: '#ffffff',
					opacity: this.coverage[props.class][point].lumensPsqm/(highestNum*2)
				})
				// console.log("highest number");
				// console.log(highestNum)
			}
		}



	}
	if(props.defaultLight !== true){
		this.lights = props.lights || []
	}
	else if (props.defaultLight == true){
		this.lights = props.lights || [
			green360W =	new GrowLight({
				width			:	.83,
				height		: .06,
				depth			: .26,
				id				: "green360W",
				name			:	"Mars Green 360W",
				scene			: this.scene,
				render		: props.renderLights || true,
				sizeSelf	: true,
				position	: {
					x				: this.width/2,
					y				: this.height-(this.height/3),
					z				: this.depth/2
				},
				parent		: this.object,
				leds			: {
					types		: [
						{
							nm		: 440,
							angle	: 140,

						}
					]
				}
			})
		]
	}
	if(props.lights !== undefined){
		for(i=0;i<props.lights.length;i++){
			this.lights[props.lights[i].id] = props.lights[i]
		}
	}
}
var GrowLightSchema = new Schema({
	height: {type: Number, default: 0.06},
	width: {type: Number, default: 0.83},
	depth: {type: Number, default: 0.26},
	function(){
		console.log("ran")
	}
})

storage.createCollection('growlights', GrowLightSchema)

var growlighttt = storage.growlights.add()



function GrowLight(props){
	// Object.assign(this, new GrowLightSchema({
	//
	// }))
	this.height = props.height || 0.06
	this.width = props.width || .83
	this.depth = props.depth || .26
	this.leds = props.leds
	if(this.leds !== undefined){
		if(this.leds.layout.xNum !== undefined && this.leds.layout.zNum == undefined){
			this.leds.layout.zNum = this.leds.ammount/this.leds.layout.xNum
		}
		else if((this.leds.layout.xNum == undefined && this.leds.layout.zNum) !== undefined){
			this.leds.layout.xNum = this.leds.ammount/this.leds.layout.zNum
		}
		else if(this.leds.layout.xNum && this.leds.layout.zNum !== undefined){
			if(this.leds.layout.xNum * this.leds.layout.zNum == this.leds.ammount){
				// Great
			}
			/*
			* Some argument for if xNum * yNum of diodes does not equal the ammount of leds, which it should
			*/
			else {
				// If the number of LEDS that span the light width wise is greater than the ammount of leds on the light.. obviously something's wrong
				if(this.leds.layout.xNum > this.leds.ammount){
					if(this.leds.layout.zNum >! this.leds.ammount){
						this.leds.layout.xNum = this.leds.ammount/this.leds.layout.zNum
					}
				}
				// Do this at some other stage
			}
			/*
			*/
		}
		if((this.leds.width && this.leds.depth) == undefined){
			if((this.leds.layout.xNum && this.leds.layout.zNum) !== undefined){
				if((this.leds.layout.xPadding && this.leds.layout.zPadding) !== undefined){
					this.leds.width = this.leds.layout.xPadding * (this.leds.layout.xNum-1)
					this.leds.layout.xOffset = (this.width-this.leds.width)/2
					this.leds.depth = this.leds.layout.zPadding * (this.leds.layout.zNum-1)
					this.leds.layout.zOffset = (this.depth-this.leds.depth)/2
				} else {
					this.leds.layout.xPadding = this.width/(this.leds.layout.xNum+1)
					this.leds.layout.zPadding = this.depth/(this.leds.layout.zNum+1)
					this.leds.width = this.leds.layout.xPadding * (this.leds.layout.xNum-1)
					this.leds.layout.xOffset = (this.width-this.leds.width)/2
					this.leds.depth = this.leds.layout.zPadding * (this.leds.layout.zNum-1)
					this.leds.layout.zOffset = (this.depth-this.leds.depth)/2
					// console.log("here's the goodies")
					// console.log(this.leds)
				}
			}
		}
		//console.log(this.leds)
	}

	this.switches = props.switches
	this.fans = props.fans
	this.name = props.name || "Growlight"
	this.id = props.id || "defaultLight"
	this.class = props.class || 'growlight'
	this.render = props.render || false
	this.scene = props.scene || {type: "window", object: window}
	this.position = props.position || {x:0,y:0,z:0}
	if(this.position.type == 'center'){
		this.position.lx = this.position.x - this.width/2
		this.position.lz = this.position.z - this.depth/2
		this.position.ly = this.position.y - this.height/2
	}

	this.group = props.group
	this.object = new Cube({
		height		: this.height,
		width			: this.width,
		depth			: this.depth,
		render		: this.render,
		id				: this.id,
		scene			: this.scene,
		position	: this.position,
		parent		: props.parent,
		sizeSelf	: props.sizeSelf,
		class 		: props.class,
		group			: props.group
	})
	this.makeDiodes = function(){
		this.leds.diodes = []
		var numOfTypes = this.leds.ammount
				currentType = 0
				quotaFilled = 0
				random			= []
				number 			= 0
		while(random.length < numOfTypes){
			// console.log(random.length+" random.length and "+numOfTypes+" this.leds.ammount");
			if(random.indexOf(number) < 0){
				random.push(number)
			}
			number = Math.ceil(Math.random()*numOfTypes-1)
		}
		for(var i=0;i<this.leds.ammount;i++){
			// if(i == 0){
			// 	console.log("random list of diodes is");
			// 	console.log(random);
			// }
			//console.log("do we for some reason use the same i here: "+i)
			// console.log("i equals: ");
			// console.log(i);
			// console.log("and the ammount of diodes of the current Type we need is: ");
			// console.log(Math.round((this.leds.types[currentType].ratio / 100)*numOfTypes)+quotaFilled)
			if (i == Math.round((this.leds.types[currentType].ratio / 100)*numOfTypes)+quotaFilled){
				// console.log("quotaFilled: ");
				// console.log(quotaFilled);
				// console.log("if i and that number equal, we go to the next type");
				quotaFilled += Math.round((this.leds.types[currentType].ratio / 100)*numOfTypes)
				currentType ++
				// console.log("quotaFilled: ");
				// console.log(quotaFilled);

				// //console.log(quotaFilled)
				// //console.log("incremented")
				// //console.log(quotaFilled)

			}
			var position = {x:0,y:0,z:0}
			// console.log("this is the layout: ")
			// console.log(this.leds.layout)
			for(z=0;z<this.leds.layout.zNum;z++){
				// console.log(random[i]+" random[i]")
				if((random[i] < (this.leds.layout.xNum*z)+this.leds.layout.xNum)){
					position = {
						x		: ((((this.leds.layout.xNum*(z+1)) - (random[i])-1)*this.leds.layout.xPadding)+this.leds.layout.xOffset),
						z		: (z*this.leds.layout.zPadding)+this.leds.layout.zOffset,
						y		: 0,
						num	: random[i]
					}
					position.ox = this.position.lx + position.x
					position.oy = this.position.ly + position.y
					position.oz = this.position.lz + position.z
					// if(position.x < .2){
					// 	console.log("a small position: ");
					// }
					// console.log("set position to: ")
					// console.log(position)
					break
				}
			}
			// console.log("We get stuck on diode/i #: ")
			// console.log(i);
			// console.log("do we get stuck making Diodes() in Growlight()?")
			// console.log("diode"+i+"X"+Math.round(position.x/this.leds.layout.xPadding)+"Z"+Math.round(position.z/this.leds.layout.zPadding))
			var led = new Diode({
				wavelength  : this.leds.types[currentType].nm || this.leds.types[currentType].nm,
				nm					: this.leds.types[currentType].nm || this.leds.types[currentType].wavelength,
				temperature	: this.leds.types[currentType].temperature,
				colour      : this.leds.types[currentType].colour,
				angle       : this.leds.types[currentType].angle,
				ratio       : this.leds.types[currentType].ratio,
				par         : this.leds.types[currentType].par,
				id					: "diodeC"+i+"d"+random[i]+"x"+Math.round(position.x/this.leds.layout.xPadding)+"z"+Math.round(position.z/this.leds.layout.zPadding),
				ammount     : Math.round((this.leds.types[currentType].ratio / 100)*numOfTypes),
				position		: position,
				parent			: this.object,
				type				: '3d',
				// sides				: ['front', 'bottom'],
				sizeSelf		: false,
				width				: this.leds.layout.width,
				depth				: this.leds.layout.depth,
				height				: this.leds.layout.height || this.leds.layout.width,
			})
			this.leds.diodes[random[i]] = led
			// var diode = null
			// //console.log(this.leds.diodes[i])
		}
		//console.log(this.leds.diodes)
	}
	this.getPosition = function(i){
		if((this.leds.x*100/this.leds.padding.x)*(this.leds.z*100/this.leds.padding.z)){

		}
		for(x=0;x<this.leds.x*100/this.leds.padding.x;x++){
			for(z=0;z<this.leds.z;z++){

			}
		}
	}
	if(props.makeDiodes || props.leds.makeDiodes == true){
		//console.log("making diodes")
		this.makeDiodes()
	}
}
function Diode(props){
  this.wavelength = props.wavelength
	this.nm = props.nm
	this.temperature = props.temperature
  this.colour = props.colour
  this.ratio = props.ratio
  this.angle = props.angle || 120
  this.par = props.par
	this.lumens = props.lumens
  this.ammount = props.ammount || 1
	this.position = props.position
	this.parent = props.parent
	this.id = props.id
	//console.log(props.sizeSelf+" is sizeSelf before making diode cubes");
	//console.log(props.sizeSelf | true)
	// console.log("do we get stuck making Cubes() in Diodes()? no")
	// console.log("do we include the right scene and pxr?")
	// console.log(props.parent.scene);
	// console.log(props.parent.scene.pxr);
	this.object = props.object || new Cube({
		width			: props.width || .002,
		height		: props.height || .002,
		depth			: props.depth || .002,
		position	: props.position,
		id				: props.id,
		class 		: props.class || 'diode',
		group			: props.group || 'diodes',
		type			: props.type || '3d',
		sides			: props.sides || ['front','bottom'],
		parent		: props.parent,
		scene			: props.parent.scene || props.scene,
		sizeSelf	: props.sizeSelf || false
	})
	this.hitsSpot = function(props){
		/*
		Takes as input coordinates x1,y1,z2 of the point we are calculating where light will hit,
		and also coordinates x2, y2, z2 of the source of the light. If not supplied we check
		if this.coordinates exists and use those values
		*/

	}
}
function getTanDeg(deg){
	var rad = deg*Math.PI/180
	return Math.tan(rad)
}
function CoverageAt(props){
	/**
	Input
	Coverage area as @props.length x @props.width
	And the X, Y and H coordinates of the light above that plane
	*/
	/* Not needed any more
	Output:
	Then produces a grid of data filled with all the radiation levels at those points
	*/
	// console.log('hoo')
	// console.log(props);

	var lightHeight = props.diode.position.oy - props.y
	if(lightHeight < 0){
		// lightHeight = lightHeight*-1
		return 0
	}
	// console.log("height to use" );
	// console.log(lightHeight)
	// console.log(getTanDeg(props.diode.angle/2))
	// var lightHorizontal = getTanDeg(props.diode.angle/2)*lightHeight
	var lightCrowZ = Math.sqrt(Math.pow(props.diode.position.oz-props.z, 2))
	var lightCrowX = Math.sqrt(Math.pow(props.diode.position.ox-props.x, 2))
	var lightCrow = Math.sqrt(Math.pow(lightCrowZ, 2)*Math.pow(lightCrowX, 2))
	// console.log("light crow:");
	// console.log(lightCrow)
	var angleFromLed = Math.atan(lightCrow/lightHeight)
	// console.log("light height")
	// console.log(lightHeight);
	// console.log(angleFromLed);
	// console.log((angleFromLed*180)/Math.PI)

	// var constantOfProportionality = 0.14729
	var constantOfProportionality = 2.56
	this.energyAtPoint = function(h,x,y){

		var lmpsqm = constantOfProportionality*((Math.pow(h, 1+3.8317))/Math.pow(Math.sqrt(Math.pow(x,2)+Math.pow(y,2)+Math.pow(h,2)), 3+3.8317))
		// console.log("lumens per square metre at");
		// console.log(lmpsqm)
		return lmpsqm
	}
	return this.energyAtPoint(lightHeight,lightCrow,0)
	// this.resolution = props.resolution || 10
	// this.lightSources = props.lightSources
	// // Loops over all light sources
	// for(l=0;l<this.lightSources.length;l++){
	// 	if(this.lightSources[l].type == "led"){
	// 		// Loops over every square in the grid by looping over every horizontal oblong, and every vertical square in that oblong. Allows us to keep track of which square we're at
	// 		for(x=0;x<Math.round(this.width/this.resolution);x++){
	// 			for(y=0;y<Math.round(this.height/this.resolution);y++){
	// 				for(z=0;Math.round(this.depth/this.resolution);z++){
	// 					// Loops over every diode in the given LED
	// 					for(i=0;i<this.lightSources[l].leds.diodes.length;i++){
	// 						var diodePosition = this.lightSources[l].getPosition(i)
	// 						if(this.lightSources[l].leds.diodes[i].hitsSpot({
	// 							x1		: x*this.resolution,
	// 							y1		: y*this.resolution,
	// 							z1		: z*this.resolution
	// 						})){
	//
	// 						}
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}
	// }


}
function Plant(props){
	const SVG_NS = "http://www.w3.org/2000/svg";
	const MAX_FLOWER_AGE = 8;
	const MAX_GROWTH_TICKS = 10;
	const BRANCH_COLOR = "rgb(139, 221, 35)";

	// from http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
	function shadeRGBColor(color, percent) {
	  var f = color.split(","),
	    t = percent < 0 ? 0 : 255,
	    p = percent < 0 ? percent * -1 : percent,
	    R = parseInt(f[0].slice(4)),
	    G = parseInt(f[1]),
	    B = parseInt(f[2]);
	  return (
	    "rgb(" +
	    (Math.round((t - R) * p) + R) +
	    "," +
	    (Math.round((t - G) * p) + G) +
	    "," +
	    (Math.round((t - B) * p) + B) +
	    ")"
	  );
	}

	(() => {
	  const maxDepth = 8, trunkWidth = 10, trunkLength = 100;
	  const branchShrinkage = 0.7;
	  const maxAngleDelta = Math.PI / 1.6;
	  const delay = 600;
	  const svg = document.getElementById("svg");

	  const scaleIncrement = 0.1;
	  const flowerSize = 10.0;
	  const dropIncrement = 2.0;
	  const rotateIncrement = Math.PI * 2;

	  let wind = 0;
	  const windIncrement = 1;
	  const maxWind = 2.0;

	  const createFlower = ({ x, y, idx }) => {
	    let telomeres = MAX_FLOWER_AGE;
	    let growthPhase = 0;
	    let attached = true;
	    let hangPhase = 1;
	    let scale = 0.5;
	    let rotation = 0;
	    const element = document.createElementNS(SVG_NS, "use");
	    element.setAttribute("href", "#flower");
	    element.setAttribute("style", "z-index: -1");

	    const flower = {
	      idx,

	      grow() {
	        growthPhase += 1;
	        scale += scaleIncrement * Math.random();
	      },

	      drop() {
	        y += dropIncrement * Math.random();
	        x += dropIncrement * (Math.random() - 0.5) + wind;
	        rotation += rotateIncrement * (Math.random() - 0.5);
	      },

	      transform() {
	        const radius = scale * flowerSize / 2;
	        element.setAttribute(
	          "transform",
	          `translate(${x - radius},${y - radius}) scale(${scale}) rotate(${rotation})`
	        );
	      },

	      step() {
	        if (y >= window.innerHeight - 2 * flowerSize) {
	          telomeres -= 1;
	        } else if (growthPhase >= MAX_GROWTH_TICKS) {
	          if (attached) {
	            attached = Math.random() < Math.pow(0.9999, hangPhase);
	            hangPhase += 0.00001;
	          } else {
	            this.drop();
	          }
	        } else {
	          this.grow();
	        }

	        this.transform();

	        return telomeres;
	      },

	      delete() {
	        svg.removeChild(element);
	      }
	    };

	    flower.transform();

	    // pick a random branch so it looks like the flowers are falling through them
	    const { childNodes } = svg;
	    const randomBranch =
	      childNodes[Math.floor(Math.random() * childNodes.length)];
	    svg.insertBefore(element, randomBranch);

	    return flower;
	  };

	  const animateFlowers = branchEndings => {
	    const branchesInUse = {};
	    let flowers = [];

	    const findFreeBranchIdx = () => {
	      for (let i = 0; i < branchEndings.length; i++) {
	        const idx = Math.floor(Math.random() * branchEndings.length);
	        if (!branchesInUse[idx]) {
	          branchesInUse[idx] = true;
	          return idx;
	        }
	      }

	      return -1;
	    };

	    const attachFlower = () => {
	      const idx = findFreeBranchIdx();
	      if (idx >= 0) {
	        const branch = branchEndings[idx];
	        flowers.push(createFlower(Object.assign({}, branch, { idx })));
	      }
	    };

	    const tick = () => {
	      flowers = flowers.reduce((acc, flower) => {
	        if (flower.step() > 0) {
	          return acc.concat([flower]);
	        } else {
	          console.log("deleting flower", flower.idx);
	          flower.delete();
	          delete branchesInUse[flower.idx];
	          return acc;
	        }
	      }, []);

	      Array(5).fill().forEach(() => {
	        if (Math.random() < 0.02) {
	          attachFlower();
	        }
	      });

	      if (Math.random() < 0.02) {
	        wind = Math.min(
	          maxWind,
	          wind + (Math.random() * 2 - 1) * windIncrement
	        );
	        wind = Math.max(-maxWind, wind);
	      }

	      requestAnimationFrame(tick);
	    };

	    requestAnimationFrame(tick);
	  };

	  const wrap = a => (Array.isArray(a) ? a : [a]);
	  const flatten = a => {
	    if (!Array.isArray(a)) {
	      return a;
	    }

	    const [left, right] = a;
	    return wrap(left).concat(wrap(right));
	  };

	  const drawBranch = (
	    x1,
	    y1,
	    length,
	    angle,
	    depth,
	    branchWidth,
	    branchColor
	  ) => {
	    const x2 = x1 + length * Math.cos(angle);
	    const y2 = y1 + length * Math.sin(angle);

	    const line = document.createElementNS(SVG_NS, "line");
	    const style = `stroke:${branchColor};stroke-width:${branchWidth};z-index:1;`;

	    line.setAttribute("x1", x1);
	    line.setAttribute("x2", x2);
	    line.setAttribute("y1", y1);
	    line.setAttribute("y2", y2);
	    line.setAttribute("style", style);

	    svg.appendChild(line);

	    const newDepth = depth - 1;
	    if (newDepth <= 0) {
	      return Promise.resolve({ x: x2, y: y2 });
	    }

	    const newBranchWidth = branchWidth * branchShrinkage;
	    const newBranchColor = shadeRGBColor(branchColor, 0.04);

	    return Promise.map([-1, 1], direction => {
	      const newAngle =
	        angle + maxAngleDelta * (Math.random() * 0.5 * direction);
	      const newLength =
	        length * (branchShrinkage + Math.random() * (1.0 - branchShrinkage));

	      return new Promise(resolve => {
	        setTimeout(
	          () =>
	            resolve(
	              drawBranch(
	                x2,
	                y2,
	                newLength,
	                newAngle,
	                newDepth,
	                newBranchWidth,
	                newBranchColor
	              )
	            ),
	          delay
	        );
	      });
	    }).then(flatten);
	  };

	  // returns a promise that resolves to an array of the positions of the branches
	  const drawTree = (maxDepth, trunkWidth) => {
	    return drawBranch(
	      Math.floor(window.innerWidth / 2),
	      Math.floor(window.innerHeight / 1.02),
	      60,
	      -Math.PI / 2,
	      maxDepth,
	      trunkWidth,
	      BRANCH_COLOR
	    );
	  };

	  const init = () => {
	    svg.setAttribute("width", window.innerWidth);
	    svg.setAttribute("height", window.innerHeight);
	    drawTree(maxDepth, trunkWidth).then(animateFlowers);
	  };

	  init();
	})();
}

// const SVG_NS = "http://www.w3.org/2000/svg";
// const MAX_FLOWER_AGE = 8;
// const MAX_GROWTH_TICKS = 55;
// const BRANCH_COLOR = "rgb(139, 221, 35)";
//
// // from http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
// function shadeRGBColor(color, percent) {
//   var f = color.split(","),
//     t = percent < 0 ? 0 : 255,
//     p = percent < 0 ? percent * -1 : percent,
//     R = parseInt(f[0].slice(4)),
//     G = parseInt(f[1]),
//     B = parseInt(f[2]);
//   return (
//     "rgb(" +
//     (Math.round((t - R) * p) + R) +
//     "," +
//     (Math.round((t - G) * p) + G) +
//     "," +
//     (Math.round((t - B) * p) + B) +
//     ")"
//   );
// }
//
// (() => {
//   const maxDepth = 10, trunkWidth = 20, trunkLength = 100;
//   const branchShrinkage = 0.7;
//   const maxAngleDelta = Math.PI / 1.6;
//   const delay = 1000;
//   const svg = document.getElementById("svg");
//
//   const scaleIncrement = 0.1;
//   const flowerSize = 10.0;
//   const dropIncrement = 2.0;
//   const rotateIncrement = Math.PI * 2;
//
//   let wind = 0;
//   const windIncrement = 1;
//   const maxWind = 2.0;
//
//   const createFlower = ({ x, y, idx }) => {
//     let telomeres = MAX_FLOWER_AGE;
//     let growthPhase = 0;
//     let attached = true;
//     let hangPhase = 1;
//     let scale = 0.5;
//     let rotation = 0;
//     const element = document.createElementNS(SVG_NS, "use");
//     element.setAttribute("href", "#flower");
//     element.setAttribute("style", "z-index: -1");
//
//     const flower = {
//       idx,
//
//       grow() {
//         growthPhase += 1;
//         scale += scaleIncrement * Math.random();
//       },
//
//       drop() {
//         y += dropIncrement * Math.random();
//         x += dropIncrement * (Math.random() - 0.5) + wind;
//         rotation += rotateIncrement * (Math.random() - 0.5);
//       },
//
//       transform() {
//         const radius = scale * flowerSize / 2;
//         element.setAttribute(
//           "transform",
//           `translate(${x - radius},${y - radius}) scale(${scale}) rotate(${rotation})`
//         );
//       },
//
//       step() {
//         if (y >= window.innerHeight - 2 * flowerSize) {
//           telomeres -= 1;
//         } else if (growthPhase >= MAX_GROWTH_TICKS) {
//           if (attached) {
//             attached = Math.random() < Math.pow(0.9999, hangPhase);
//             hangPhase += 0.00001;
//           } else {
//             this.drop();
//           }
//         } else {
//           this.grow();
//         }
//
//         this.transform();
//
//         return telomeres;
//       },
//
//       delete() {
//         svg.removeChild(element);
//       }
//     };
//
//     flower.transform();
//
//     // pick a random branch so it looks like the flowers are falling through them
//     const { childNodes } = svg;
//     const randomBranch =
//       childNodes[Math.floor(Math.random() * childNodes.length)];
//     svg.insertBefore(element, randomBranch);
//
//     return flower;
//   };
//
//   const animateFlowers = branchEndings => {
//     const branchesInUse = {};
//     let flowers = [];
//
//     const findFreeBranchIdx = () => {
//       for (let i = 0; i < branchEndings.length; i++) {
//         const idx = Math.floor(Math.random() * branchEndings.length);
//         if (!branchesInUse[idx]) {
//           branchesInUse[idx] = true;
//           return idx;
//         }
//       }
//
//       return -1;
//     };
//
//     const attachFlower = () => {
//       const idx = findFreeBranchIdx();
//       if (idx >= 0) {
//         const branch = branchEndings[idx];
//         flowers.push(createFlower(Object.assign({}, branch, { idx })));
//       }
//     };
//
//     const tick = () => {
//       flowers = flowers.reduce((acc, flower) => {
//         if (flower.step() > 0) {
//           return acc.concat([flower]);
//         } else {
//           console.log("deleting flower", flower.idx);
//           flower.delete();
//           delete branchesInUse[flower.idx];
//           return acc;
//         }
//       }, []);
//
//       Array(5).fill().forEach(() => {
//         if (Math.random() < 0.02) {
//           attachFlower();
//         }
//       });
//
//       if (Math.random() < 0.02) {
//         wind = Math.min(
//           maxWind,
//           wind + (Math.random() * 2 - 1) * windIncrement
//         );
//         wind = Math.max(-maxWind, wind);
//       }
//
//       requestAnimationFrame(tick);
//     };
//
//     requestAnimationFrame(tick);
//   };
//
//   const wrap = a => (Array.isArray(a) ? a : [a]);
//   const flatten = a => {
//     if (!Array.isArray(a)) {
//       return a;
//     }
//
//     const [left, right] = a;
//     return wrap(left).concat(wrap(right));
//   };
//
//   const drawBranch = (
//     x1,
//     y1,
//     length,
//     angle,
//     depth,
//     branchWidth,
//     branchColor
//   ) => {
//     const x2 = x1 + length * Math.cos(angle);
//     const y2 = y1 + length * Math.sin(angle);
//
//     const line = document.createElementNS(SVG_NS, "line");
//     const style = `stroke:${branchColor};stroke-width:${branchWidth};z-index:1;`;
//
//     line.setAttribute("x1", x1);
//     line.setAttribute("x2", x2);
//     line.setAttribute("y1", y1);
//     line.setAttribute("y2", y2);
//     line.setAttribute("style", style);
//
//     svg.appendChild(line);
//
//     const newDepth = depth - 1;
//     if (newDepth <= 0) {
//       return Promise.resolve({ x: x2, y: y2 });
//     }
//
//     const newBranchWidth = branchWidth * branchShrinkage;
//     const newBranchColor = shadeRGBColor(branchColor, 0.04);
//
//     return Promise.map([-1, 1], direction => {
//       const newAngle =
//         angle + maxAngleDelta * (Math.random() * 0.5 * direction);
//       const newLength =
//         length * (branchShrinkage + Math.random() * (1.0 - branchShrinkage));
//
//       return new Promise(resolve => {
//         setTimeout(
//           () =>
//             resolve(
//               drawBranch(
//                 x2,
//                 y2,
//                 newLength,
//                 newAngle,
//                 newDepth,
//                 newBranchWidth,
//                 newBranchColor
//               )
//             ),
//           delay
//         );
//       });
//     }).then(flatten);
//   };
//
//   // returns a promise that resolves to an array of the positions of the branches
//   const drawTree = (maxDepth, trunkWidth, trunkLength) => {
//     return drawBranch(
//       Math.floor(window.innerWidth / 2),
//       Math.floor(window.innerHeight / 1.02),
//       60,
//       trunkLength,
//       maxDepth,
//       trunkWidth,
//       BRANCH_COLOR
//     );
//   };
//
//   const init = () => {
//     svg.setAttribute("width", window.innerWidth);
//     svg.setAttribute("height", window.innerHeight);
//     drawTree(maxDepth, trunkWidth, trunkLength).then(animateFlowers);
//   };
//
//   init();
// })();
