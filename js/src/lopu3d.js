// 3D LIBRARY STUFF
function Scene(props) {
    jsonConcat(this, props)
    this.ratio = props.ratio || 90
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
    this.unit = props.unit || "m"
    this.id = props.id || "scene" + Math.ceil(Math.random() * 100)
    this.containerId = props.containerId || "sceneContainer" + Math.ceil(Math.random() * 100)
    this.sizeType = props.sizeType || "window"
    this.type = props.type || '3d'
    this.pxr = props.pxr
    this.objects = props.objects || {}
    this.render = props.render || true
    this.renderCss = function() {
        $("#" + this.id).css(this.css)
    }
    this.addRootObject = function(object) {
        if (object.id) {
            this.objects[object.id] = object
        }
        if (this.sizeType == "window") {
            if (this.objects[object.id] !== undefined) {
                this.pxr = (window.innerWidth * (this.objects[object.id].ratio / 100)) / this.objects[object.id].width
                this.objects[object.id].object = new Cube({
                    height: this.objects[object.id].height,
                    width: this.objects[object.id].width,
                    depth: this.objects[object.id].depth,
                    unit: this.objects[object.id].unit,
                    ratio: this.objects[object.id].ratio,
                    id: this.objects[object.id].id,
                    render: true,
                    pxr: this.pxr,
                    unit: object.unit | this.unit,
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
    this.clear = function(props) {
        this.pxr = undefined
        $('#' + this.id).html('')
    }
    if (this.sizeType == "window") {
        if (this.type == '3d') {
            this.css = {
                perspective: this.perspective + "px"
            }
        } else if (this.type == '2d') {
            this.css = {

            }
        }
    } else if (this.sizeType == ("object" || "element")) {
        if (this.type == '3d') {
            this.css = {
                perspective: this.perspective + "px"
            }
        } else if (this.type == '2d') {
            this.css = {

            }
        }
    }
    if (this.render) {
        this.renderCss()
    }


}



function Element(props) {

}

Element.prototype = {
    initialize: function(props) {
        if (!props) var props = {}

        this.id = props.id
        this.class = props.class
        this.height = props.height
        this.width = props.width
        this.css = props.css
        this.position = props.position
        this.render = props.render
        this.renderState = props.renderState

    },

    draw: function() {

    }
}

function Cube(props) {
    jsonConcat(this, props)
    this.id = props.id
    this.class = props.class
    this.height = props.height || 0
    this.width = props.width || 0
    this.depth = props.depth || 0
    this.unit = props.unit || "cm"
    this.scene = props.scene || props.parent.scene
    this.ratio = props.ratio || this.scene.ratio || 90
    this.sides = props.sides || [
        "front",
        "back",
        "left",
        "right",
        "bottom",
        "top"
    ]
    this.faces = {}
    this.position = {
        x: 0,
        y: 0,
        z: 0,
        rx: 0,
        ry: 0,
        rz: 0,
        unit: "m"
    }
    jsonConcat(this.position, props.position)
    if (props.type !== 'group') {
        this.sizeSelf = props.sizeSelf || true
    } else {
        this.sizeSelf = false
    }
    this.render = props.render
    if (this.render == undefined) {
        this.render = true
    }
    this.data = props.data
    this.zIndex = props.zIndex
    this.labels = props.labels || []
    this.minPxWidth = props.minPxWidth
    this.datas = props.datas
    if (this.position.rx == undefined) {
        this.position.rx = 0
    }
    if (this.position.ry == undefined) {
        this.position.ry = 0
    }
    if (this.position.rz == undefined) {
        this.position.rz = 0
    }
    if (!props.position) {
        props.position = {}
    }
    this.position.unit = props.position.unit || this.unit || "cm"
    this.parent = props.parent
    this.group = props.group
    this.children = []
    this.type = props.type || '3d'
    this.svg = props.svg
    this.addChild = function(child) {
        this.children.push(child)
    }
    this.Face = function(props) {
        this.side = props.side
        this.id = props.id || uuidv4()
        this.uuid = props.uuid || uuidv4()
        this.class = props.side
        this.parent = props.parent
        this.features = props.features
        this.type = props.type || '3d'
        this.unit = props.unit
        this.unitScale = props.unitScale
        this.pxr = props.pxr
        if (this.side == "front") {
            // if(props.height !== 'auto')
            this.height = props.height
            this.width = props.width
            this.heightPx = Math.ceil((props.height / this.unitScale) * this.pxr)
            this.widthPx = Math.ceil((props.width / this.unitScale) * this.pxr)
            this.css = {
                "width": this.widthPx + "px",
                "height": this.heightPx + "px"
            }
        } else if (this.side == "back") {
            // if(props.height !== 'auto')
            this.height = props.height
            this.width = props.width
            this.heightPx = Math.ceil((props.height / this.unitScale) * this.pxr)
            this.widthPx = Math.ceil((props.width / this.unitScale) * this.pxr)
            this.css = {
                "width": this.widthPx + "px",
                "height": this.heightPx + "px",
                "transform": "translate3d(0px, 0px, -" + ((props.depth / this.unitScale) * this.pxr) + "px)"
            }
        } else if (this.side == "right") {
            // if(props.height !== 'auto')
            this.height = props.height
            this.width = props.depth
            this.heightPx = Math.ceil((props.height / this.unitScale) * this.pxr)
            this.widthPx = Math.ceil((props.depth / this.unitScale) * this.pxr)
            this.css = {
                "width": this.widthPx + "px",
                "height": this.heightPx + "px",
                "transform": "rotateY(90deg)  translate3d(" + (this.widthPx) / 2 + "px, 0px, " + ((props.width / this.unitScale) * this.pxr) / 2 + "px)"
            }
        } else if (this.side == "left") {
            // if(props.height !== 'auto')
            this.height = props.height
            this.width = props.depth
            this.heightPx = Math.ceil((props.height / this.unitScale) * this.pxr)
            this.widthPx = Math.ceil((props.depth / this.unitScale) * this.pxr)
            this.css = {
                "width": this.widthPx + "px",
                "height": this.heightPx + "px",
                "transform": "rotateY(-90deg)  translate3d(-" + (this.widthPx) / 2 + "px, 0px, " + ((props.width / this.unitScale) * this.pxr) / 2 + "px)"
            }
        } else if (this.side == "bottom") {
            // if(props.height !== 'auto')
            this.height = props.depth
            this.width = props.width
            this.heightPx = Math.ceil((props.depth / this.unitScale) * this.pxr)
            this.widthPx = Math.ceil((props.width / this.unitScale) * this.pxr)
            this.css = {
                "width": this.widthPx + "px",
                "height": this.heightPx + "px",
                "transform": "rotateX(-90deg) translate3d(0px, " + (0.5 * (this.heightPx)) + "px, " + (((((props.depth / this.unitScale) / 2) - (props.height / this.unitScale)) * this.pxr) * -1) + "px)"
                    // "transform": "rotateX(-90deg) translate3d(0px, " + (0.5 * (this.heightPx)) + "px, 0px)"
            }
        } else if (this.side == "top") {
            // if(props.height !== 'auto')
            this.height = props.depth
            this.width = props.width
            this.heightPx = Math.ceil((props.depth / this.unitScale) * this.pxr)
            this.widthPx = Math.ceil((props.width / this.unitScale) * this.pxr)
            this.css = {
                "width": this.widthPx + "px",
                "height": this.heightPx + "px",
                "transform": "rotateX(-90deg) translate3d(0px, " + 0.5 * (this.heightPx) + "px, " + (Math.ceil((((props.depth / this.unitScale) / 2)) * this.pxr) * -1) + "px)"
                    // "transform": "rotateX(-90deg) translate3d(0px, " + 0.5 * (this.heightPx) + "px, 0px)"
            }
        }
        this.addFeature = function(props) {
            this.features.push(feature)
        }
    }
    this.createFaces = function() {
        if (this.type == '2d') {
            if (this.sides.length > 0) {
                var newFace = new this.Face({
                    side: this.sides[0],
                    height: this.height,
                    width: this.width,
                    depth: this.depth,
                    unit: this.unit,
                    unitScale: this.unitScale,
                    pxr: this.scene.pxr,
                    type: '2d'
                })
                this.faces[this.sides[0]] = newFace
            }

        } else if (this.type == '3d') {
            for (var f = 0; f < this.sides.length; f++) {
                var newFace = new this.Face({
                    side: this.sides[f],
                    height: this.height,
                    width: this.width,
                    depth: this.depth,
                    unit: this.unit,
                    unitScale: this.unitScale,
                    pxr: this.scene.pxr,
                    parent: this
                })
                this.faces[this.sides[f]] = newFace
            }
        } else if (this.type == 'custom') {
            for (i = 0; i < this.sides.length; i++) {
                var newFace = new this.Face({
                    side: this.sides[i],
                    height: this.height,
                    width: this.width,
                    depth: this.depth,
                    unit: this.unit,
                    unitScale: this.unitScale,
                    pxr: this.scene.pxr,
                    parent: this
                })
                this.faces[this.sides[i]] = newFace
            }
        } else if (this.type == 'svg') {

        }
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
        if (this.group) {
            if (this.group.positioner) {
                if ($("#" + this.scene.id + parentId + " #" + this.group.id + "-positioner").length < 1) {
                    this.group.positioner = {}
                    this.group.positioner.object = new Cube({
                            sides: [],
                            id: this.group.id + "-positioner",
                            class: this.group.class + '-group-positioner group-positioner',
                            parent: this.parent,
                            scene: this.scene,
                            type: 'group'
                        })
                        // var $groupElementPositioner = $('<div>', {
                        //     id: this.group.id + "positioner",
                        //     class: this.group.class + '-group-positioner'
                        // })
                        // $("#" + this.scene.id + sceneId).append($groupElementPositioner).scene

                    this.group.object = new Cube({
                            sides: [],
                            id: this.group.id,
                            class: this.group.class + ' group',
                            parent: this.group.positioner.object,
                            scene: this.group.positioner.object.scene,
                            type: 'group'
                        })
                        // var $groupElement = $('<div>', {
                        //     id: this.group.id,
                        //     class: this.group.class + ' group'
                        // })
                        // $("#" + this.scene.id + parentId + " #" + this.group.id + "-positioner").append($groupElement)

                }
                // var $element = $('<div>', {
                //     id: this.id,
                //     class: this.class + ' dObject'
                // })
                // $("#" + this.scene.id + parentId + " #" + this.group.id + "-positioner #" + this.group.id).append($element)

            } else if ($("#" + this.scene.id + parentId + " #" + this.group.id).length < 1) {
                this.group.object = new Cube({
                    sides: [],
                    id: this.group.id,
                    class: this.group.class + ' group',
                    parent: this.parent,
                    scene: this.scene,
                    type: 'group'
                })

                // var $groupElement = $('<div>', {
                //     id: this.group.id,
                //     class: this.group.class + ' group'
                // })
                // $("#" + this.scene.id + parentId).append($groupElement)

                // var $element = $('<div>', {
                //     id: this.id,
                //     class: this.class + ' dObject'
                // })
                // $("#" + this.scene.id + parentId + " #" + this.group.id).append($element)
            }
            var $element = $('<div>', {
                id: this.id,
                class: this.class + ' dObject'
            })
            $("#" + this.scene.id + parentId + " #" + this.group.id).append($element)


        } else {
            var $element = $('<div>', {
                id: this.id,
                class: this.class + ' dObject'
            })
            $("#" + this.scene.id + parentId).append($element)
        }
        if (this.datas) {
            for (data in this.datas) {
                $("#" + this.scene.id + parentId + " #" + this.id).attr('data-' + this.datas[data].property, this.datas[data].value)
            }
        }
        if (this.type == '2d') {
            if (this.sides.length > 0) {

                var $faceParent = $('<div>', {
                    id: this.faces[this.sides[0]].id + "Parent",
                    class: 'faceParent ' + this.sides[0] + "Parent"
                })
                $("#" + this.scene.id + parentId + " #" + this.id).append($faceParent)
                    // $("#" + this.scene.id + parentId + " #" + this.id + " > #" +this.faces[this.sides[0]].id + "Parent").css(this.faces[this.sides[0]].css)
                var $face = $('<div>', {
                    id: this.faces[this.sides[0]].id,
                    class: 'face ' + this.sides[0]
                })
                $("#" + this.scene.id + parentId + " #" + this.id + " > #" + this.faces[this.sides[0]].id + "Parent").append($face)
                $("#" + this.scene.id + parentId + " #" + this.id + " > #" + this.faces[this.sides[0]].id + "Parent" + " #" + this.faces[this.sides[0]].id).css(this.faces[this.sides[0]].css)
            }

        } else if (this.type == '3d') {
            for (var l = 0; l < this.sides.length; l++) {
                var $faceParent = $('<div>', {
                    id: this.faces[this.sides[l]].id + "Parent",
                    class: 'faceParent ' + this.sides[l] + "Parent"
                })
                $("#" + this.scene.id + parentId + " #" + this.id).append($faceParent)
                    // $("#" + this.scene.id + parentId + " #" + this.id + " > #" +this.faces[this.sides[l]].id + "Parent").css(this.faces[this.sides[l]].css)
                var $face = $('<div>', {
                    id: this.faces[this.sides[l]].id,
                    class: 'face ' + this.sides[l]
                })
                $("#" + this.scene.id + parentId + " #" + this.id + " > #" + this.faces[this.sides[l]].id + "Parent").append($face)
                $("#" + this.scene.id + parentId + " #" + this.id + " > #" + this.faces[this.sides[l]].id + "Parent" + " #" + this.faces[this.sides[l]].id).css(this.faces[this.sides[l]].css)
            }
        } else if (this.type == 'svg') {
            var $svg = $(SVG('svg'))
                .attr("class", 'wavelengthSvg')
                .attr('id', uuidv4())
            svgCss = {
                height: (this.height / this.unitScale) * this.scene.pxr
            }
            $("#" + this.scene.id + parentId + " #" + this.id).append($svg)
            $("#" + this.scene.id + parentId + " #" + this.id + " #" + $svg[0].id).css(svgCss)
            var pointsStr = ''
            for (point in this.svg.points) {
                pointsStr += Math.floor((this.svg.points[point].x / this.unitScale) * this.scene.pxr) + ',' + Math.floor((this.svg.points[point].y / this.unitScale) * this.scene.pxr) + ' '
            }
            var $polygon = $(SVG('polygon'))

            $polygon
                .attr('class', 'wavelengthPolygon ' + this.svg.class)
                .attr('id', uuidv4())
                .attr('points', pointsStr)
            this.svg.elem = {
                element: $svg,
                polygon: $polygon
            }
            $("#" + this.scene.id + parentId + " #" + this.id + " #" + $svg[0].id).append($polygon)

        }

        if (this.sizeSelf) {
            $("#" + this.scene.id + parentId + " #" + this.id).css({
                width: this.widthPx,
                height: this.heightPx
            })
        }
        if (this.position) {
            this.updateUnitScale()

            if (this.parent) {
                if (this.position.type == "center") {
                    var adjustX = Math.ceil(this.widthPx / 2)
                    adjustY = Math.ceil(this.heightPx / -2)
                    adjustZ = Math.ceil(this.depthPx / 2)
                    this.position.ox = ((this.parent.position.ox / this.parent.position.unitScale) + ((this.position.x / this.position.unitScale) - (this.width / this.unitScale) / 2)) * this.position.unitScale
                    this.position.oy = ((this.parent.position.oy / this.parent.position.unitScale) + ((this.position.y / this.position.unitScale) - (this.height / this.unitScale) / 2)) * this.position.unitScale
                    this.position.oz = ((this.parent.position.oz / this.parent.position.unitScale) + ((this.position.z / this.position.unitScale) - (this.depth / this.unitScale) / 2)) * this.position.unitScale

                } else {
                    var adjustX = 0
                    adjustY = 0
                    adjustZ = 0
                    this.position.ox = ((this.parent.position.ox / this.parent.position.unitScale) + (this.position.x / this.position.unitScale)) * this.position.unitScale
                    this.position.oy = ((this.parent.position.oy / this.parent.position.unitScale) + (this.position.y / this.position.unitScale)) * this.position.unitScale
                    this.position.oz = ((this.parent.position.oz / this.parent.position.unitScale) + (this.position.z / this.position.unitScale)) * this.position.unitScale
                }
                if (this.position.z < 0) {
                    this.transformString = "translate3d(" + Math.ceil((((this.position.x / this.position.unitScale) * this.scene.pxr)) - adjustX) + "px," + Math.ceil(((this.position.y / this.position.unitScale) * this.scene.pxr) + adjustY) * -1 + "px," + Math.ceil((((this.position.z / this.position.unitScale) * this.scene.pxr) - adjustZ) * -1) + "px) rotateX(" + this.position.rx + "deg) rotateY(" + this.position.ry + "deg) rotateZ(" + this.position.rz + "deg)"
                    $("#" + this.scene.id + " #" + this.id).css({
                        transform: this.transformString
                    })

                } else {
                    if (this.parent.id) {
                        var parentId = ' #' + this.parent.id
                    } else {
                        var parentId = ''
                    }
                    this.transformString = "translate3d(" + Math.ceil((((this.position.x / this.position.unitScale) * this.scene.pxr)) - adjustX) + "px," + Math.ceil(((this.position.y / this.position.unitScale) * this.scene.pxr) + adjustY) * -1 + "px," + Math.ceil((((this.position.z / this.position.unitScale) * this.scene.pxr) - adjustZ) * -1) + "px) rotateX(" + this.position.rx + "deg) rotateY(" + this.position.ry + "deg) rotateZ(" + this.position.rz + "deg)"
                    $("#" + this.scene.id + parentId + " #" + this.id).css({
                        transform: this.transformString
                    })
                }
            } else {
                this.position.ox = this.position.x
                this.position.oy = this.position.y
                this.position.oz = this.position.z
                this.transformString = "translate3d(" + Math.ceil((((this.position.x / this.position.unitScale) * this.scene.pxr))) + "px," + Math.ceil((this.position.y / this.position.unitScale) * this.scene.pxr) + "px," + Math.ceil((((this.position.z / this.position.unitScale) * this.scene.pxr))) + "px) rotateX(" + this.position.rx + "deg) rotateY(" + this.position.ry + "deg) rotateZ(" + this.position.rz + "deg)"
                $("#" + this.scene.id + " #" + this.id).css({
                    transform: this.transformString
                })
            }
        }
        if (this.zIndex) {
            $("#" + this.id).css({
                "z-index": this.zIndex
            })
        }
        if (this.style) {
            if (this.faces) {
                // this.faces.forEach((face, index) => {
                //     var d3Face = d3.select($("#" + this.id + ">#" + face.name).get())
                //     for (var style in face.styles) {
                //         d3Face
                //             .transition()
                //             .duration(400)
                //             .attr(style.style, style.value)
                //     }
                // })
            }
        }
    }
    this.moveTo = function(props) {
        var newX = props.x || this.position.x
        newY = props.y || this.position.y
        newZ = props.z || this.position.z
        this.position.unit = props.unit || this.position.unit
        this.updateUnitScale()
        this.position.x = newX
        this.position.y = newY
        this.position.z = newZ
        if (this.position.type == 'center') {
            var adjustX = Math.ceil((this.width / this.unitScale) / 2)
            adjustY = Math.ceil((this.height / this.unitScale) / -2)
            adjustZ = Math.ceil((this.depth / this.unitScale) / 2)
        } else {
            var adjustX = 0
            adjustY = 0
            adjustZ = 0
        }
        if (this.parent) {
            this.position.ox = ((this.parent.position.ox / this.parent.position.unitScale) + ((this.position.x / this.position.unitScale) - adjustX)) * this.position.unitScale
            this.position.oy = ((this.parent.position.oy / this.parent.position.unitScale) + ((this.position.y / this.position.unitScale) - adjustY)) * this.position.unitScale
            this.position.oz = ((this.parent.position.oz / this.parent.position.unitScale) + ((this.position.z / this.position.unitScale) - adjustZ)) * this.position.unitScale
        } else {
            this.position.ox = this.position.x
            this.position.oy = this.position.y
            this.position.oz = this.position.z
        }
        var transformString = "translate3d(" + Math.ceil((((this.position.x / this.position.unitScale) * this.scene.pxr)) - (adjustX * this.scene.pxr)) + "px," + Math.ceil(((this.position.y / this.position.unitScale) * this.scene.pxr) + (adjustY * this.scene.pxr)) * -1 + "px," + Math.ceil((((this.position.z / this.position.unitScale) * this.scene.pxr) - (adjustZ * this.scene.pxr)) * -1) + "px) rotateX(" + this.position.rx + "deg) rotateY(" + this.position.ry + "deg) rotateZ(" + this.position.rz + "deg)"
        var object = d3.select($('#' + this.id).get(0))
        var transInter = d3.interpolateString(this.transformString, transformString)
        this.transformString = transformString
        object
            .transition()
            .duration(800)
            .styleTween('transform', function(d) {
                return transInter
            })

    }
    this.updateUnitScale = function() {
        if (this.position.unit == "m") {
            this.position.unitScale = 1
        } else if (this.position.unit == "cm") {
            this.position.unitScale = 100
        } else if (this.position.unit == "mm") {
            this.position.unitScale = 1000
        } else if (this.position.unit == "um") {
            this.position.unitScale = 10000
        } else {
            this.position.unitScale = 1
        }
    }
    this.setUnitScale = function(props) {
        if (this.unit == "m") {
            this.unitScale = 1
        } else if (this.unit == "cm") {
            this.unitScale = 100
        } else if (this.unit == "mm") {
            this.unitScale = 1000
        } else if (this.unit == "um") {
            this.unitScale = 10000
        } else {
            this.unitScale = 1
        }
    }
    this.setPxs = function(props) {
        if (!props) {
            var props = {}
        }
        if (this.width == 0) {
            this.widthPx = 1
        } else {

            this.widthPx = Math.ceil(this.scene.pxr * (this.width / this.unitScale))
        }
        if (this.depth == 0) {
            this.depthPx = 0
        } else {

            this.depthPx = Math.ceil(this.scene.pxr * (this.depth / this.unitScale))
        }
        if (this.height == 0) {
            this.heightPx = 0
        } else {

            this.heightPx = Math.ceil(this.scene.pxr * (this.height / this.unitScale))
        }

    }

    this.setUnitScale()
    var windowWidthPxRatioed = (window.innerWidth * (this.ratio / 100))
    var windowWidthPx = window.innerWidth * .8
    var normalWidth = (this.width / this.unitScale)
    var sceneObjectWidth = ($("#" + this.scene.id).width() * (this.ratio / 100))
    if (this.scene == undefined) {} else if (this.scene.sizeType == "window") {
        // thought this catered for widths an units that change between 1.2 ~ 0.8
        // ie the change between >1 and <1 but we don't need it
        if (normalWidth >= 1) {
            if (this.scene.pxr == undefined) {
                this.scene.pxr = windowWidthPxRatioed / normalWidth
                if (this.minPxWidth) {
                    if (this.scene.pxr * normalWidth < this.minPxWidth) {
                        this.scene.pxr = this.minPxWidth / normalWidth
                    }
                }
                if (this.scene.pxr * normalWidth > windowWidthPxRatioed) {
                    this.scene.pxr = windowWidthPxRatioed / normalWidth
                }
            }
        } else if (normalWidth < 1) {
            if (this.scene.pxr == undefined) {
                this.scene.pxr = windowWidthPxRatioed * normalWidth
                if (this.minPxWidth) {
                    if (this.scene.pxr * normalWidth < this.minPxWidth) {
                        this.scene.pxr = this.minPxWidth / normalWidth
                    }
                }
                if (this.scene.pxr * normalWidth > windowWidthPxRatioed) {
                    this.scene.pxr = windowWidthPxRatioed / normalWidth
                }
            }

        }

        this.setPxs()
        this.createFaces()

    } else if (this.scene.sizeType == "object") {
        /*
            @param windowWidthPX is the normalised window width according to the set scene ratio
        */
        if (this.scene.pxr == undefined) {
            if (normalWidth >= 1) {
                this.scene.pxr = sceneObjectWidth / normalWidth
                    /*
                        First we check if the @param minPxWidth minimum pixel width is less than 
                        the @param window.innerWidth
                        window width * the special ratio
                    */
                if (this.minPxWidth && this.minPxWidth < windowWidthPxRatioed) {
                    /*
                        If it is, we then check if the currently set scene pxr and
                        @param this.scene.pxr * @param (this.width/this.unitScale)
                        is greater than the @param minPxWidth
                        If so, we need to change the scene pxr accordingly
                    */
                    if (this.scene.pxr * normalWidth > this.minPxWidth) {
                        /*
                            If the object would have been rendered larger than our @param minPxWidth
                            We recalculate the scene pxr as @param minPxWidth divided by the @param normalised object width
                        */
                        this.scene.pxr = this.minPxWidth / normalWidth
                    }
                }
                /*
                    Then we do a final check to see if the current @param this.scene.pxr * the @param (this.width/this.unitScale)
                    object noramlised width is greater than the current @param window.innerWidth, if so, the object would have been 
                    rendered larger than the window could have accomodated
                */
                if (this.scene.pxr * normalWidth >= windowWidthPx) {
                    /*
                        Since the object would have been rendered too large, we change the @param scene.pxr to basically
                        the @param winddow.innerWidth * @param (this.ratio/100) / @param (this.width/this.unitScale) which
                        means our object cannot be rendered larger than the scene
                    */
                    this.scene.pxr = windowWidthPx / normalWidth
                }

            } else if (normalWidth < 1) {
                this.scene.pxr = sceneObjectWidth / (normalWidth)
                    /*
                        First we check if the @param minPxWidth minimum pixel width is less than 
                        the @param window.innerWidth
                        window width * the special ratio
                    */
                if (this.minPxWidth && this.minPxWidth < windowWidthPxRatioed) {
                    /*
                        If it is, we then check if the currently set scene pxr and
                        @param this.scene.pxr * @param (this.width/this.unitScale)
                        is greater than the @param minPxWidth
                        If so, we need to change the scene pxr accordingly
                    */
                    if (this.scene.pxr * normalWidth > this.minPxWidth) {
                        /*
                            If the object would have been rendered larger than our @param minPxWidth
                            We recalculate the scene pxr as @param minPxWidth divided by the normalised object width
                        */
                        this.scene.pxr = this.minPxWidth / normalWidth
                    }
                }
                /*
                    Then we do a final check to see if the current @param this.scene.pxr * the @param (this.width/this.unitScale)
                    object noramlised width is greater than the current @param window.innerWidth, if so, the object would have been 
                    rendered larger than the window could have accomodated
                */
                if (this.scene.pxr * normalWidth >= windowWidthPx) {
                    /*
                        Since the object would have been rendered too large, we change the @param scene.pxr to basically
                        the @param winddow.innerWidth * @param (this.ratio/100) / @param (this.width/this.unitScale) which
                        means our object cannot be rendered larger than the scene
                    */
                    this.scene.pxr = windowWidthPx / normalWidth
                }
            }
        } else if (this.scene.pxr * normalWidth >= windowWidthPxRatioed) {
            if (normalWidth >= 1) {
                if (this.minPxWidth && this.minPxWidth < windowWidthPxRatioed) {
                    if (this.scene.pxr * normalWidth > this.minPxWidth) {
                        this.scene.pxr = this.minPxWidth / normalWidth
                    }
                }
                /*
                    Then we do a final check to see if the current @param this.scene.pxr * the @param (this.width/this.unitScale)
                    object noramlised width is greater than the current @param window.innerWidth, if so, the object would have been 
                    rendered larger than the window could have accomodated
                */
                if (this.scene.pxr * normalWidth >= windowWidthPx) {
                    /*
                        Since the object would have been rendered too large, we change the @param scene.pxr to basically
                        the @param winddow.innerWidth * @param (this.ratio/100) / @param (this.width/this.unitScale) which
                        means our object cannot be rendered larger than the scene
                    */
                    this.scene.pxr = windowWidthPx / normalWidth
                }
            } else if (normalWidth < 1) {
                if (this.minPxWidth && this.minPxWidth < windowWidthPxRatioed) {
                    if (this.scene.pxr * normalWidth > this.minPxWidth) {
                        this.scene.pxr = this.minPxWidth / normalWidth
                    }
                }
                /*
                    Then we do a final check to see if the current @param this.scene.pxr * the @param (this.width/this.unitScale)
                    object noramlised width is greater than the current @param window.innerWidth, if so, the object would have been 
                    rendered larger than the window could have accomodated
                */
                if (this.scene.pxr * normalWidth >= windowWidthPx) {
                    /*
                        Since the object would have been rendered too large, we change the @param scene.pxr to basically
                        the @param winddow.innerWidth * @param (this.ratio/100) / @param (this.width/this.unitScale) which
                        means our object cannot be rendered larger than the scene
                    */
                    this.scene.pxr = windowWidthPx / normalWidth
                }
            }
        }
        this.setPxs()
        this.createFaces()
    }
    if (this.parent) {
        this.parent.children.push(this)
    }
    if (this.render) {
        this.draw()
    }
    if (this.data) {
        if (this.data.link) {
            var str = '<a href=' + this.data.link + '>' + this.data.text + '</a>'
        } else if (this.data.do) {
            // var str = '<div onclick=' + this.data.do + '>' + this.data.text + '</div>'
            $('#' + this.id)
                .attr('onclick', this.data.do)
                .append(this.data.text)
        } else if (this.data) {
            $('#' + this.id).append(this.data.text)
        }
    }
}

function Lopu3d(props) {
    this.units = ["km", "m", "cm", "mm", "um", "miles", "ft", "inches", ]
    this.unitScale = function(unit) {
        if (unit == 'm') {
            return 1
        } else if (unit == 'cm') {
            return 100
        } else if (unit == 'cm') {
            return 100
        } else if (unit == 'mm') {
            return 1000
        } else if (unit == 'um') {
            return 10000
        } else if (unit == 'ft') {
            return 3.28084
        } else if (unit == 'inches') {
            return 39.3701
        } else {
            return 1
        }
    }
    this.unitScaleR = function(fromUnit, toUnit) {

    }
    this.convertAreaScale = function(fromUnit, toUnit) {
        var ret = 0
        if (toUnit == "m") {
            for (unit in this.units) {
                if (this.units[unit] == toUnit) {
                    ret = this.unitScale(fromUnit) * this.unitScale(fromUnit)
                    return ret
                }
            }
        }
    }
    this.scene = Scene
    this.cube = Cube
    this.ai = this
}

function Polygon(props) {

}

function Group(props) {

}

var lopu3d = new Lopu3d()