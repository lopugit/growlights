// 3D LIBRARY STUFF
function Scene(props) {

    this.ratio = props.ratio || 100
        // Makes our heightRatio either equal to a pixel ratio if height is
        // undefined but width in some real life unit is defined, or if both
        // height and width are defined, we use their ratio as is logical
    if (props.height == undefined) {
        this.heightRatio = props.heightRatio || 75
    } else {
        this.heightRatio = props.height / props.width
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
    this.render = function() {
        $("#" + this.id).css(this.css)
    }
    this.addRootObject = function(object) {
        if (object.id) {
            this.objects[object.id] = object
        }
        if (this.type == "window") {
            if (this.objects[object.id] !== undefined) {
                this.pxr = (window.innerWidth * (this.objects[object.id].ratio / 100)) / this.objects[object.id].width
                this.objects[object.id].object = new Cube({
                    height: this.objects[object.id].height,
                    width: this.objects[object.id].width,
                    depth: this.objects[object.id].depth,
                    ratio: this.objects[object.id].ratio,
                    id: this.objects[object.id].id,
                    render: true,
                    pxr: this.pxr,
                    scene: {
                        type: "window",
                        id: "scene"
                    }
                })
            }
        }
        if (this.objects[object.id].render == true) {
            if (this.objects[object.id].sceneObjectId == undefined) {

                this.objects[object.id].object.render({
                    pxr: this.pxr
                })
            }
        }
    }
    if (this.type == "window") {
        // this.widthPx = window.innerWidth*this.ratio/100
        // this.heightPx = window.innerWidth*this.heightRatio/100
        this.css = {
                // width					:	this.widthPx+"px",
                // height				: this.heightPx+"px",
                perspective: this.perspective + "px"
            }
            // if(props.render == true){
            // 	this.render()
            // }
    } else if (this.type == ("object" || "element")) {
        // this.widthPx = $("#"+this.id)[0].offsetWidth*this.ratio/100,
        // this.heightPx = this.widthPx*this.heightRatio/100,
        this.css = {
            // width					:	this.widthPx+"px",
            // height				: this.heightPx+"px",
            perspective: this.perspective + "px"
        }
        if (props.render == (true || undefined)) {
            this.render()
        }
    }


}

function Cube(props) {
    this.id = props.id
    this.class = props.class + " dObject"
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
    this.position = props.position || {
        x: 0,
        y: 0,
        z: 0,
        rx: 0,
        ry: 0,
        rz: 0
    }
    if (this.position.rx == undefined) {
        this.position.rx = 0
    }
    if (this.position.ry == undefined) {
        this.position.ry = 0
    }
    if (this.position.rz == undefined) {
        this.position.rz = 0
    }
    this.parent = props.parent
    this.group = props.group
    this.sizeSelf = props.sizeSelf
    if (this.sizeSelf == undefined) {
        this.sizeSelf = true
    }
    this.render = props.render || true
    this.type = props.type || '3d'
    this.Face = function(props) {
        this.side = props.side
        this.id = props.side
        this.parent = props.parent
        this.features = props.features
        this.type = props.type || '3d'
        var pxr = props.pxr
        if (this.side == "front") {
            this.height = props.height
            this.width = props.width
            this.heightPx = props.height * pxr
            this.widthPx = props.width * pxr
            this.css = {
                "width": this.widthPx + "px",
                "height": this.heightPx + "px"
            }
        } else if (this.side == "back") {
            this.height = props.height
            this.width = props.width
            this.heightPx = props.height * pxr
            this.widthPx = props.width * pxr
            this.css = {
                "width": this.widthPx + "px",
                "height": this.heightPx + "px",
                "transform": "translate3d(0px, 0px, -" + (props.depth * pxr) + "px)"
            }
        } else if (this.side == "left") {
            this.height = props.height
            this.width = props.depth
            this.heightPx = props.height * pxr
            this.widthPx = props.depth * pxr
            this.css = {
                "width": this.widthPx + "px",
                "height": this.heightPx + "px",
                "transform": "rotateY(90deg)  translate3d(" + (this.widthPx) / 2 + "px, 0px, " + (props.width * pxr) / 2 + "px)"
            }
        } else if (this.side == "right") {
            this.height = props.height
            this.width = props.depth
            this.heightPx = props.height * pxr
            this.widthPx = props.depth * pxr
            this.css = {
                "width": this.widthPx + "px",
                "height": this.heightPx + "px",
                "transform": "rotateY(-90deg)  translate3d(-" + (this.widthPx) / 2 + "px, 0px, " + (props.width * pxr) / 2 + "px)"
            }
        } else if (this.side == "bottom") {
            this.height = props.depth
            this.width = props.width
            this.heightPx = props.depth * pxr
            this.widthPx = props.width * pxr
            this.css = {
                "width": this.widthPx + "px",
                "height": this.heightPx + "px",
                "transform": "rotateX(-90deg) translate3d(0px, " + 0.5 * (this.heightPx) + "px, " + (((props.height * pxr) / 2) - 1) + "px)"
            }
        } else if (this.side == "top") {
            this.height = props.depth
            this.width = props.width
            this.heightPx = Math.round(props.depth * pxr)
            this.widthPx = Math.round(props.width * pxr)
            this.css = {
                "width": this.widthPx + "px",
                "height": this.heightPx + "px",
                "transform": "rotateX(-90deg) translate3d(0px, " + 0.5 * (this.heightPx) + "px, -" + (Math.round(props.height * pxr)) / 2 + "px)"
            }
        }
        this.addFeature = function(props) {
            // this.features.push()
        }
    }
    this.createFaces = function() {
        if (this.type == '2d') {
            var newFace = new this.Face({
                side: 'front',
                height: this.height,
                width: this.width,
                depth: this.depth,
                pxr: this.scene.pxr,
                type: '2d'
            })
            this.faces['front'] = newFace

        } else if (this.type == '3d') {
            for (var f = 0; f < this.sides.length; f++) {
                // console.log("f is "+f+"for counting faces");
                var newFace = new this.Face({
                    side: this.sides[f],
                    height: this.height,
                    width: this.width,
                    depth: this.depth,
                    pxr: this.scene.pxr,
                    parent: this
                })
                this.faces[this.sides[f]] = newFace
            }
        } else if (this.type == 'custom') {
            //console.log(":yep");
            //console.log(this.sides)
            for (i = 0; i < this.sides.length; i++) {
                var newFace = new this.Face({
                        side: this.sides[i],
                        height: this.height,
                        width: this.width,
                        depth: this.depth,
                        pxr: this.scene.pxr,
                        parent: this
                    })
                    //console.log()
                this.faces[this.sides[i]] = newFace
            }
        }
        // //console.log(this.faces)
    }
    this.draw = function(props) {
            /* PURE HTML
            var element = document.createElement('DIV')
            element.setAttribute('id', this.id)
            element.setAttribute('class', this.class)
            document.getElementById(this.scene.id).appendChild(element)
            */
            /* JQUERY	*/

            // If the cube has a parent object, we make the parent object string to select the parent later
            if (this.parent !== undefined) {
                var parentId = " #" + this.parent.id
            } else {
                var parentId = ''
            }
            // If the cube is part of a group, we check if the group exists, if not, we make the group div and append our new object
            // In the group, if it exists we just append the new object
            if (this.group !== undefined) {
                if ($("#" + this.scene.id + parentId + " > #" + this.group).length < 1) {
                    //console.log("The group "+this.group+" doesn't exist yet, let's manifest it")
                    var $groupElement = $('<div>', {
                        id: this.group,
                        class: 'group'
                    })
                    $("#" + this.scene.id + parentId).append($groupElement)
                    var $element = $('<div>', {
                        id: this.id,
                        class: this.class
                    })
                    $("#" + this.scene.id + parentId + " #" + this.group).append($element)
                } else {
                    //console.log("the group already exists and we just append object")
                    //console.log(this)
                    var $element = $('<div>', {
                            id: this.id,
                            class: this.class
                        })
                        //console.log(parentId)
                    $("#" + this.scene.id + parentId + " #" + this.group).append($element)
                }
            } else {
                var $element = $('<div>', {
                    id: this.id,
                    class: this.class
                })
                $("#" + this.scene.id + parentId).append($element)
            }
            if (this.type == '2d') {
                var $face = $('<div>', {
                    id: 'front',
                    class: 'face'
                })
                $("#" + this.scene.id + " #" + this.id).append($face)
                    //console.log("SO THIS SHOULD NOT EVEN RUN")
                $("#" + this.scene.id + parentId + " #" + this.id + " > #" + this.sides[0]).css(this.faces['front'].css)

            } else if (this.type == '3d') {
                for (var l = 0; l < this.sides.length; l++) {
                    //console.log(this.id)
                    //console.log(this.sides)
                    //console.log(this.faces)
                    //console.log("this is what we're doing now with 3d, figuring out why it loops forever when making groups or deciding how to use a group")
                    //console.log(i)
                    // console.log("l equals: "+l+" to count the sides");

                    var $face = $('<div>', {
                        id: this.sides[l],
                        class: 'face'
                    })
                    $("#" + this.scene.id + parentId + " #" + this.id).append($face)
                    $("#" + this.scene.id + parentId + " #" + this.id + " > #" + this.sides[l]).css(this.faces[this.sides[l]].css)
                }
            }
            //console.log("this is this")
            //console.log(this);

            if (this.sizeSelf == true) {
                //console.log("SHOULD ONLY SIZE SELF TWICE")
                //console.log("sizing self "+this.widthPx)
                $("#" + this.scene.id + parentId + " #" + this.id).css({
                    width: this.widthPx,
                    height: this.heightPx
                })
            }
            // //console.log("we do this when position = ")
            // //console.log(this.position)
            if (this.position !== undefined) {
                if (this.parent !== undefined) {
                    // //console.log(this.position)
                    if (this.position.type == "center") {
                        // //console.log("yay")
                        var adjustX = Math.round(this.widthPx / 2)
                        adjustY = Math.round(this.heightPx / -2)
                        adjustZ = Math.round(this.depthPx / 2)
                    } else {
                        var adjustX = 0
                        adjustY = 0
                        adjustZ = 0
                    }

                    if (this.position.z < 0) {
                        // //console.log()
                        $("#" + this.scene.id + " #" + this.id).css({
                                transform: "translate3d(" + Math.round(((this.position.x * this.scene.pxr)) - adjustX) + "px," + Math.round((this.position.y * this.scene.pxr) + adjustY) * -1 + "px," + Math.round(((this.position.z * this.scene.pxr) - adjustZ) * -1) + "px) rotateX(" + this.position.rx + "deg) rotateY(" + this.position.ry + "deg) rotateZ(" + this.position.rz + "deg)"
                            })
                            // console.log("translate3d("+Math.round(((this.position.x*this.scene.pxr))-adjustX)+"px,"+Math.round((this.position.y*this.scene.pxr)+adjustY)*-1+"px,"+Math.round(((this.position.z*this.scene.pxr)-adjustZ)*-1)+"px) rotateX("+this.position.rx+"deg) rotateY("+this.position.ry+"deg) rotateZ("+this.position.rz+"deg)")

                    } else {
                        // //console.log("this should run when setting light css")
                        // //console.log(this.position.x+" "+this.scene.pxr)
                        // //console.log(this.position.x*this.scene.pxr)
                        // //console.log(adjustX)
                        //console.log(this.id +" is the id we want")
                        if (this.parent.id !== undefined) {
                            var parentId = ' #' + this.parent.id
                        } else {
                            var parentId = ''
                        }
                        //console.log("#"+this.scene.id+parentId+" #"+this.id);
                        $("#" + this.scene.id + parentId + " #" + this.id).css({
                                transform: "translate3d(" + Math.round(((this.position.x * this.scene.pxr)) - adjustX) + "px," + Math.round((this.position.y * this.scene.pxr) + adjustY) * -1 + "px," + Math.round(((this.position.z * this.scene.pxr) - adjustZ) * -1) + "px) rotateX(" + this.position.rx + "deg) rotateY(" + this.position.ry + "deg) rotateZ(" + this.position.rz + "deg)"
                            })
                            //console.log("does this work?");
                            //console.log(this.position.x*this.scene.pxr)
                            // console.log(this.id)
                            // console.log("translate3d("+(((this.position.x*this.scene.pxr))-adjustX)+"px,"+((this.position.y*this.scene.pxr)+adjustY)*-1+"px,"+(((this.position.z*this.scene.pxr)-adjustZ)*-1)+"px) rotateX("+this.position.rx+"deg) rotateY("+this.position.ry+"deg) rotateZ("+this.position.rz+"deg)")
                    }
                } else {
                    // //console.log("we are running this")
                    $("#" + this.scene.id + " #" + this.id).css({
                        transform: "translate3d(" + Math.round(((this.position.x * this.scene.pxr))) + "px," + Math.round(this.position.y * this.scene.pxr) + "px," + Math.round(((this.position.z * this.scene.pxr))) + "px) rotateX(" + this.position.rx + "deg) rotateY(" + this.position.ry + "deg) rotateZ(" + this.position.rz + "deg)",
                    })
                    console.log("translate3d(" + Math.round(((this.position.x * this.scene.pxr))) + "px," + Math.round(this.position.y * this.scene.pxr) + "px," + Math.round(((this.position.z * this.scene.pxr))) + "px) rotateX(" + this.position.rx + "deg) rotateY(" + this.position.ry + "deg) rotateZ(" + this.position.rz + "deg)")
                }
            }
        }
        // console.log("The scene is ")
        // console.log(this.scene);
    if (this.scene == undefined) {} else if (this.scene.type == "window") {
        // thought this catered for widths an units that change between 1.2 ~ 0.8
        // ie the change between >1 and <1 but we don't need it
        if (this.width >= 1) {
            if (this.scene.pxr == undefined) {
                this.scene.pxr = (window.innerWidth * (this.ratio / 100)) / this.width
            }
        } else if (this.width < 1) {
            if (this.scene.pxr == undefined) {
                this.scene.pxr = (window.innerWidth * (this.ratio / 100)) * this.width
            }
        }
        this.widthPx = this.scene.pxr * this.width
        this.heightPx = this.scene.pxr * this.height
        this.depthPx = this.scene.pxr * this.depth
        this.createFaces()

    } else if (this.scene.type == "object") {
        // console.log(this.scene.pxr+" should not equal undefined");
        // console.log("and "+this.width+" should be less than 1 for diodes");
        if (this.width >= 1) {
            if (this.scene.pxr == undefined) {
                this.scene.pxr = ($("#" + this.scene.id)[0].offsetWidth * (this.ratio / 100)) / this.width
            }
        } else if (this.width < 1) {
            if (this.scene.pxr == undefined) {
                this.scene.pxr = ($("#" + this.scene.id)[0].offsetWidth * (this.ratio / 100)) * this.width
            }
        }
        this.widthPx = this.scene.pxr * this.width
        this.heightPx = this.scene.pxr * this.height
        this.depthPx = this.scene.pxr * this.depth
        this.createFaces()
    }
    if (this.render == true) {
        //console.log('rendering')
        this.draw()
    }


}

function Growroom(props) {
    this.height = props.height
    this.width = props.width
    this.depth = props.depth
    this.ratio = props.ratio || 100
    this.id = props.id || "defaultRoom"
    this.class = props.class || 'tent'
    this.scene = props.scene
    this.render = props.render || true
    this.lights = props.lights || []
    this.position = props.position || {
        x: 0,
        y: 0,
        z: 0
    }
    this.object = new Cube({
        height: this.height,
        width: this.width,
        depth: this.depth,
        ratio: this.ratio,
        scene: this.scene,
        id: this.id,
        class: this.class,
        sizeSelf: props.sizeSelf || true,
        position: this.position || {
            x: 0,
            y: 0,
            z: 0
        }
    })
    this.coverage = []
    this.addLight = function(props) {
            //something
        }
        // Returns height, width, depth in an object
    this.dimensions = function() {
        return {
            height: this.height,
            width: this.width,
            depth: this.depth
        }
    }
    this.addChildObject = function(props) {

    }
    this.renderCoverage = function(props) {
        /* include @param-object faces to be calculated
         * include @param-interger resolution which is the size of the squares that will be evaluated
         * include @param-array[string] lights which is an array of light id's you want to calculate the coverage for
         */
        props.class = props.class || 'floorCoverage'
        this.coverage[props.class] = []
        if (props.yPlane == undefined) {
            props.yPlane = 0.02
        }
        props.includeY == props.includeY || false
        for (var x = 0; x < Math.floor(this.width / props.resolution); x++) {
            for (var z = 0; z < Math.floor(this.depth / props.resolution); z++) {
                var position = {}
                position.type = props.position.type || 'normal'
                if (props.position !== undefined) {
                    if (props.position.type == 'center') {
                        position.x = ((x * props.resolution) + props.resolution / 2) + ((this.width) - (Math.floor(this.width / props.resolution) * props.resolution)) / 2
                        if (props.includeY == false) {
                            position.y = props.yPlane || 0.02
                        }
                        position.z = ((z * props.resolution) + (props.resolution / 2)) + ((this.depth) - (Math.floor(this.depth / props.resolution) * props.resolution)) / 2
                    } else {
                        // props.position.xOffset = ((this.width)-(Math.floor(this.width/props.resolution)*props.resolution))/2
                        position.x = (x * props.resolution)
                        position.z = (z * props.resolution)
                        position.y = props.yPlane
                    }
                }
                if (props.includeY == true) {
                    for (var y = 0; y < Math.floor(this.height / props.resolution); y++) {
                        if (position.type == 'center') {
                            position.y = ((y * props.resolution) + (props.resolution * .12) / 2)
                        } else {
                            position.y = (y * props.resolution) + props.yPlane
                        }
                        var coverageSquare = new Cube({
                            width: props.squareSize || 0.05,
                            height: props.squareSize || 0.05,
                            depth: props.squareSize || 0.05,
                            sides: props.sides,
                            group: 'coverage',
                            class: props.class || 'floorCoverage',
                            id: (props.class + Math.round(Math.random() * 1000) + "R" || 'floorCoverage') + 'X' + x + "Y" + y + "Z" + z + Math.round(Math.random() * 1000) + "R",
                            parent: this.object,
                            position: position

                        })
                        coverageSquare.lightSources = []
                        this.coverage[props.class].push(coverageSquare)
                    }
                } else {
                    var coverageSquare = new Cube({
                        width: props.squareSize || props.resolution || 0.05,
                        height: props.squareSize || props.resolution || 0.05,
                        depth: props.squareSize || props.resolution || 0.05,
                        sides: props.sides || ["bottom", "front", "top", "left", "right", "back"],
                        group: 'coverage',
                        class: props.class || 'floorCoverage',
                        id: (props.class + Math.round(Math.random() * 1000) + "R" || 'floorCoverage') + 'X' + x + "Y" + Math.round(position.y) + "Z" + z + Math.round(Math.random() * 100),
                        parent: this.object,
                        position: position
                    })
                    coverageSquare.lightSources = []
                    this.coverage[props.class].push(coverageSquare)

                }
            }
        }
        if (props.calcLumens !== false) {

            for (var point = 0; point < this.coverage[props.class].length; point++) {
                this.coverage[props.class][point].lumensPsqm = 0
                    // console.log(this.coverage.length);
                for (var light = 0; light < this.lights.length; light++) {
                    // console.log(this.lights);
                    // console.log(light)
                    // console.log("this is the ammount of lights we do")
                    for (var diode = 0; diode < this.lights[light].leds.diodes.length; diode++) {
                        // if(this.lights[light].position.type ){
                        //
                        // }
                        // console.log(this.lights.length);
                        var tempDiode = this.lights[light].leds.diodes[diode]
                            // console.log(this.coverage[props.class][point])
                        if (this.coverage[props.class][point].position.type == 'center') {
                            // console.log("it was center");
                            var result = CoverageAt({
                                diode: tempDiode,
                                x: this.coverage[props.class][point].position.x,
                                y: this.coverage[props.class][point].position.y,
                                z: this.coverage[props.class][point].position.z,

                            })
                            this.coverage[props.class][point].lightSources.push(tempDiode)
                                // console.log(this.coverage[props.class][point].lumens);
                                // console.log(result);
                                // console.log(result)
                            this.coverage[props.class][point].lumensPsqm += result
                                // console.log(this.coverage[props.class][point].lumens);
                                // console.log(this.coverage[props.class][point].lightSources)
                        } else {
                            // console.log("It wasn't!");
                            var results = []
                            for (var num = 0; num < 4; num++) {
                                if (num == 0) {
                                    var xAdjustment = (this.coverage[props.class][point].width / 2)
                                    var zAdjustment = (this.coverage[props.class][point].depth / 2)
                                } else if (num == 1) {
                                    var xAdjustment = (this.coverage[props.class][point].width / 2) * -1
                                    var zAdjustment = (this.coverage[props.class][point].depth / 2)
                                } else if (num == 2) {
                                    var xAdjustment = (this.coverage[props.class][point].width / 2)
                                    var zAdjustment = (this.coverage[props.class][point].depth / 2) * -1
                                } else if (num == 3) {
                                    var xAdjustment = (this.coverage[props.class][point].width / 2) * -1
                                    var zAdjustment = (this.coverage[props.class][point].depth / 2) * -1
                                }
                                results.push(CoverageAt({
                                    diode: tempDiode,
                                    x: this.coverage[props.class][point].position.x + xAdjustment,
                                    y: this.coverage[props.class][point].position.y,
                                    z: this.coverage[props.class][point].position.z + zAdjustment,
                                }))
                            }
                            // console.log(results);
                            var averageOf = (results.reduce((a, b) => a + b, 0)) / results.length
                                // console.log(averageOf)
                                // console.log(this.coverage[props.class][point]);
                            this.coverage[props.class][point].lightSources.push(tempDiode)
                            this.coverage[props.class][point].lumensPsqm += averageOf
                            if (this.coverage[props.class][point].id == 'floorGridX5Y0Z3') {
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
                var str = '<div class="floorGridData" id="' + this.coverage[props.class][point].id + 'data" style="transform: rotateX(90deg) translate3d(0px, -' + 40 * 2 + 'px, -16px)"><div class="data">Lux: ' + Math.round(this.coverage[props.class][point].lumensPsqm) + '</div><div class="data">Lumens: ' + Math.round(this.coverage[props.class][point].lumens) + '</div></div>'
                    // var html = $.parseHtml(str)

                // var $dataElement = $('<div>', {id:this.coverage[props.class][point].id+"data", class:'floorGridData'})
                $("#" + this.coverage[props.class][point].id + ' #' + this.coverage[props.class][point].sides[0]).append(str)
                    // this.coverage[props.class][point]
            }
            var highestNum = 0
            for (var point = 0; point < this.coverage[props.class].length; point++) {
                // console.log(this.coverage)
                if (this.coverage[props.class][point].lumensPsqm > highestNum) {
                    // console.log(this.coverage[props.class][point]);
                    highestNum = this.coverage[props.class][point].lumensPsqm
                }
                // console.log("highest number");
                // console.log(highestNum)
            }
            for (var point = 0; point < this.coverage[props.class].length; point++) {
                if (this.coverage[props.class][point].id == 'floorGridX5Y0Z3') {
                    console.log("the second round");
                    console.log(this.coverage[props.class][point].lumensPsqm);
                    console.log(this.coverage[props.class][point].lumensPsqm / (highestNum * 2));
                    // console.log(this.coverage[props.class][point]);
                    // console.log(this.coverage[props.class[point]])
                }

                $('#' + this.coverage[props.class][point].scene.id + ' #' + this.coverage[props.class][point].id + ' .face').css({
                        // background	: '#ffffff',
                        opacity: this.coverage[props.class][point].lumensPsqm / (highestNum * 2)
                    })
                    // console.log("highest number");
                    // console.log(highestNum)
            }
        }



    }
    if (props.defaultLight !== true) {
        this.lights = props.lights || []
    } else if (props.defaultLight == true) {
        this.lights = props.lights || [
            green360W = new GrowLight({
                width: .83,
                height: .06,
                depth: .26,
                id: "green360W",
                name: "Mars Green 360W",
                scene: this.scene,
                render: props.renderLights || true,
                sizeSelf: true,
                position: {
                    x: this.width / 2,
                    y: this.height - (this.height / 3),
                    z: this.depth / 2
                },
                parent: this.object,
                leds: {
                    types: [{
                        nm: 440,
                        angle: 140,

                    }]
                }
            })
        ]
    }
    if (props.lights !== undefined) {
        for (i = 0; i < props.lights.length; i++) {
            this.lights[props.lights[i].id] = props.lights[i]
        }
    }
}