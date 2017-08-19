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
            this.lights.push(props.light)
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
        if (!props.yPlane) {
            props.yPlane = 0
        }
        for (var x = 0; x < Math.floor(this.width / props.resolution); x++) {
            for (var z = 0; z < Math.floor(this.depth / props.resolution); z++) {
                if (props.includeY) {
                    for (var yHere = 0; yHere < Math.floor(this.height / props.resolution); yHere++) {
                        var y = yHere
                        var position = {}
                        position.type = props.position.type || 'normal'
                        if (props.position) {
                            if (props.position.type == 'center') {
                                position.x = ((x * props.resolution) + props.resolution / 2) + ((this.width) - (Math.floor(this.width / props.resolution) * props.resolution)) / 2
                                if (!props.includeY) {
                                    position.y = props.yPlane + (props.resolution / 2)
                                }
                                position.z = ((z * props.resolution) + (props.resolution / 2)) + ((this.depth) - (Math.floor(this.depth / props.resolution) * props.resolution)) / 2
                            } else {
                                position.x = (x * props.resolution)
                                position.z = (z * props.resolution)
                                position.y = props.yPlane
                            }
                        }

                        if (position.type == 'center') {
                            position.y = ((y * props.resolution) + (props.resolution) / 2)
                        } else {
                            position.y = (y * props.resolution) + props.yPlane
                        }
                        // var objectPosition = (function() { return position })
                        var coverageSquare = new Cube({
                            width: props.squareSize || 0.05,
                            height: props.squareSize || 0.05,
                            depth: props.squareSize || 0.05,
                            sides: props.sides || ["bottom", "front", "top", "left", "right", "back"],
                            group: 'coverage',
                            class: props.class || 'floorCoverage',
                            id: (props.class + Math.round(Math.random() * 1000) + "R" || 'floorCoverage') + 'X' + x + "Y" + y + "Z" + z + Math.round(Math.random() * 1000) + "R",
                            parent: this.object,
                            position: position,
                            // position: objectPosition(),
                            type: props.type || '3d'

                        })
                        coverageSquare.lightSources = []
                        this.coverage[props.class].push(coverageSquare)
                    }
                } else {
                    var position = {}
                    position.type = props.position.type || 'normal'
                    if (props.position) {
                        if (props.position.type == 'center') {
                            position.x = ((x * props.resolution) + props.resolution / 2) + ((this.width) - (Math.floor(this.width / props.resolution) * props.resolution)) / 2
                            if (!props.includeY) {
                                position.y = props.yPlane + (props.resolution / 2)
                            }
                            position.z = ((z * props.resolution) + (props.resolution / 2)) + ((this.depth) - (Math.floor(this.depth / props.resolution) * props.resolution)) / 2
                        } else {
                            position.x = (x * props.resolution)
                            position.z = (z * props.resolution)
                            position.y = props.yPlane
                        }
                    }
                    // var objectPosition = (function() { return position })
                    var coverageSquare = new Cube({
                        width: props.squareSize || props.resolution || 0.05,
                        height: props.squareSize || props.resolution || 0.05,
                        depth: props.squareSize || props.resolution || 0.05,
                        sides: props.sides || ["bottom", "front", "top", "left", "right", "back"],
                        group: 'coverage',
                        class: props.class || 'floorCoverage',
                        id: (props.class + Math.round(Math.random() * 1000) + "R" || 'floorCoverage') + 'X' + x + "Y" + Math.round(position.y) + "Z" + z + Math.round(Math.random() * 100),
                        parent: this.object,
                        position: position,
                        // position: objectPosition(),
                        type: props.type || '3d'
                    })
                    coverageSquare.lightSources = []
                    this.coverage[props.class].push(coverageSquare)

                }
            }
        }
        if (props.calcLumens !== false) {
            for (var point = 0; point < this.coverage[props.class].length; point++) {
                this.coverage[props.class][point].lumensPsqm = 0
                for (var light = 0; light < this.lights.length; light++) {
                    // console.log("this is the current light.id")
                    // console.log(this.lights[light].id)
                    // console.log("these are the led diodes of the current light")
                    // console.log(this.lights[light].leds.diodes[0].parent.id)
                    // console.log(this.lights[light].leds.diodes)

                    this.lights[light].leds.diodes.forEach((index, diode) => {
                            // console.log("light number")
                            // console.log(light);
                            // console.log("actual diode")
                            // console.log(index.parent.id)
                            // console.log("this is the current light.id")
                            // console.log(this.lights[light].id)
                            // console.log("diode number");
                            // console.log(diode);
                            // if(this.lights[light].position.type ){
                            //
                            // }
                            // console.log({
                            //     diode: tempDiode,
                            //     x: this.coverage[props.class][point].position.x,
                            //     y: this.coverage[props.class][point].position.y,
                            //     z: this.coverage[props.class][point].position.z,

                            // })
                            var thisDiode = diode
                            if (this.coverage[props.class][point].position.type == 'center') {
                                if (this.coverage[props.class][point].id.indexOf('X1Y1Z0') >= 0) {
                                    var tempDiode = this.lights[light].leds.diodes[thisDiode]
                                        // console.log("this is the y position we use to calculate the coverage")
                                        // console.log(this.coverage[props.class][point]);
                                    var position = this.coverage[props.class][point].position
                                        // console.log("why the y in the position always the same")
                                        // console.log(position);
                                    var result = CoverageAt({
                                        diode: tempDiode,
                                        x: position.x,
                                        y: position.y,
                                        z: position.z,

                                    })


                                    // console.log("we are on light # " + light)
                                    // console.log("the diode we're calculating the light strength from is")
                                    // console.log(tempDiode.parent.id);
                                    // console.log("the old lumensPsqm at the point is: ")
                                    // console.log(this.coverage[props.class][point].position);
                                    // console.log(this.coverage[props.class][point].lumensPsqm);
                                    this.coverage[props.class][point].lightSources.push(tempDiode)
                                    this.coverage[props.class][point].lumensPsqm += result
                                        // console.log("the result was: " + result);
                                        // console.log("so the new lumensPsqm is");
                                        // console.log(this.coverage[props.class][point].lumensPsqm);
                                } else {
                                    var tempDiode = this.lights[light].leds.diodes[thisDiode]
                                        // console.log("this is the y position we use to calculate the coverage")
                                        // console.log(this.coverage[props.class][point]);
                                    var position = this.coverage[props.class][point].position
                                        // console.log("why the y in the position always the same")
                                        // console.log(position);
                                    var result = CoverageAt({
                                        diode: tempDiode,
                                        x: position.x,
                                        y: position.y,
                                        z: position.z,

                                    })

                                    this.coverage[props.class][point].lightSources.push(tempDiode)
                                    this.coverage[props.class][point].lumensPsqm += result
                                }
                                // console.log("what are these results")
                                // console.log(result)

                            } else {

                                var tempDiode = this.lights[light].leds.diodes[thisDiode]
                                    // console.log("this is the y position we use to calculate the coverage")
                                    // console.log(this.coverage[props.class][point]);
                                var position = this.coverage[props.class][point].position
                                    // console.log("why the y in the position always the same")
                                    // console.log(position);
                                var result = CoverageAt({
                                    diode: tempDiode,
                                    x: position.x,
                                    y: position.y,
                                    z: position.z,

                                })

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
                                var averageOf = (results.reduce((a, b) => a + b, 0)) / results.length
                                this.coverage[props.class][point].lightSources.push(tempDiode)

                                this.coverage[props.class][point].lumensPsqm += averageOf
                            }
                        })
                        // for (var diode = 0; diode < this.lights[light].leds.diodes.length; diode++) {}
                    this.coverage[props.class][point].lumens = this.coverage[props.class][point].lumensPsqm * ((this.coverage[props.class][point].width * this.coverage[props.class][point].depth))
                }
                var str = '<div class="floorGridData" id="' + this.coverage[props.class][point].id + 'data"><div class="data">Lux: ' + Math.round(this.coverage[props.class][point].lumensPsqm) + '</div><div class="data">Lumens: ' + Math.round(this.coverage[props.class][point].lumens) + '</div></div>'
                    // var html = $.parseHtml(str)

                // var $dataElement = $('<div>', {id:this.coverage[props.class][point].id+"data", class:'floorGridData'})
                $("#" + this.coverage[props.class][point].id).append(str)
                    // this.coverage[props.class][point]
            }
            var highestNum = 0
            for (var point = 0; point < this.coverage[props.class].length; point++) {
                if (this.coverage[props.class][point].lumensPsqm > highestNum) {
                    highestNum = this.coverage[props.class][point].lumensPsqm
                }
            }
            for (var point = 0; point < this.coverage[props.class].length; point++) {
                if (highestNum > 0) {
                    // console.log(this.coverage[props.class][point].id)
                    if (this.coverage[props.class][point].id.indexOf('X1Y1Z0') >= 0) {
                        // console.log("we are on light # " + light)
                        // console.log("this is where we set the opacity")
                        // console.log(this.coverage[props.class][point].position);
                        // console.log(this.coverage[props.class][point].lumensPsqm);
                    }

                    $('#' + this.coverage[props.class][point].scene.id + ' #' + this.coverage[props.class][point].id + ' .face').css({
                        // background	: '#ffffff',
                        opacity: this.coverage[props.class][point].lumensPsqm / (highestNum * 2)
                    })
                } else {
                    $('#' + this.coverage[props.class][point].scene.id + ' #' + this.coverage[props.class][point].id + ' .face').css({
                        // background	: '#ffffff',
                        opacity: 1
                    })

                }
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

function GrowLight(props) {
    // Object.assign(this, new GrowLightSchema({
    //
    // }))
    this.height = props.height || 0.06
    this.width = props.width || .83
    this.depth = props.depth || .26
    this.leds = props.leds
    if (this.leds !== undefined) {
        if (this.leds.layout.xNum !== undefined && this.leds.layout.zNum == undefined) {
            this.leds.layout.zNum = this.leds.ammount / this.leds.layout.xNum
        } else if ((this.leds.layout.xNum == undefined && this.leds.layout.zNum) !== undefined) {
            this.leds.layout.xNum = this.leds.ammount / this.leds.layout.zNum
        } else if (this.leds.layout.xNum && this.leds.layout.zNum !== undefined) {
            if (this.leds.layout.xNum * this.leds.layout.zNum == this.leds.ammount) {
                // Great
            }
            /*
             * Some argument for if xNum * yNum of diodes does not equal the ammount of leds, which it should
             */
            else {
                // If the number of LEDS that span the light width wise is greater than the ammount of leds on the light.. obviously something's wrong
                if (this.leds.layout.xNum > this.leds.ammount) {
                    if (this.leds.layout.zNum > !this.leds.ammount) {
                        this.leds.layout.xNum = this.leds.ammount / this.leds.layout.zNum
                    }
                }
                // Do this at some other stage
            }
            /*
             */
        }
        if ((this.leds.width && this.leds.depth) == undefined) {
            if ((this.leds.layout.xNum && this.leds.layout.zNum) !== undefined) {
                if ((this.leds.layout.xPadding && this.leds.layout.zPadding) !== undefined) {
                    this.leds.width = this.leds.layout.xPadding * (this.leds.layout.xNum - 1)
                    this.leds.layout.xOffset = (this.width - this.leds.width) / 2
                    this.leds.depth = this.leds.layout.zPadding * (this.leds.layout.zNum - 1)
                    this.leds.layout.zOffset = (this.depth - this.leds.depth) / 2
                } else {
                    this.leds.layout.xPadding = this.width / (this.leds.layout.xNum + 1)
                    this.leds.layout.zPadding = this.depth / (this.leds.layout.zNum + 1)
                    this.leds.width = this.leds.layout.xPadding * (this.leds.layout.xNum - 1)
                    this.leds.layout.xOffset = (this.width - this.leds.width) / 2
                    this.leds.depth = this.leds.layout.zPadding * (this.leds.layout.zNum - 1)
                    this.leds.layout.zOffset = (this.depth - this.leds.depth) / 2
                }
            }
        }
    }

    this.switches = props.switches
    this.fans = props.fans
    this.name = props.name || "Growlight"
    this.id = props.id || "defaultLight"
    this.class = props.class || 'growlight'
    this.render = props.render || false
    this.scene = props.scene || {
        type: "window",
        object: window
    }
    this.position = props.position || {
        x: 0,
        y: 0,
        z: 0
    }
    if (this.position.type == 'center') {
        this.position.lx = this.position.x - this.width / 2
        this.position.lz = this.position.z - this.depth / 2
        this.position.ly = this.position.y - this.height / 2
    }

    this.group = props.group
    this.object = new Cube({
        height: this.height,
        width: this.width,
        depth: this.depth,
        render: this.render,
        id: this.id,
        scene: this.scene,
        position: this.position,
        parent: props.parent,
        sizeSelf: props.sizeSelf,
        class: props.class,
        group: props.group
    })
    this.makeDiodes = function() {
        this.leds.diodes = []
        var numOfTypes = this.leds.ammount
        currentType = 0
        quotaFilled = 0
        randomLedPositions = []
        number = 0
        while (randomLedPositions.length < numOfTypes) {
            if (randomLedPositions.indexOf(number) < 0) {
                randomLedPositions.push(number)
                this.leds.diodes.push(undefined)
            }
            number = Math.ceil(Math.random() * numOfTypes - 1)
        }
        console.log(randomLedPositions)
        for (var i = 0; i < this.leds.ammount; i++) {
            // if(i == 0){
            // }
            if (i == Math.round((this.leds.types[currentType].ratio / 100) * numOfTypes) + quotaFilled) {
                quotaFilled += Math.round((this.leds.types[currentType].ratio / 100) * numOfTypes)
                currentType++


            }
            var position = {
                    x: 0,
                    y: 0,
                    z: 0
                }
                // Loops through all possible z axis positions of a diode and places
                // the diode at an x position inside a z position group of options which matches the randomLedPosition[i] spot
            for (z = 0; z < this.leds.layout.zNum; z++) {
                if ((randomLedPositions[i] < (this.leds.layout.xNum * z) + this.leds.layout.xNum)) {
                    position = {
                        x: ((((this.leds.layout.xNum * (z + 1)) - (randomLedPositions[i]) - 1) * this.leds.layout.xPadding) + this.leds.layout.xOffset),
                        z: (z * this.leds.layout.zPadding) + this.leds.layout.zOffset,
                        y: 0
                    }
                    position.ox = this.position.lx + position.x
                    position.oy = this.position.ly + position.y
                    position.oz = this.position.lz + position.z
                    var led = new Diode({
                            wavelength: this.leds.types[currentType].nm || this.leds.types[currentType].nm,
                            nm: this.leds.types[currentType].nm || this.leds.types[currentType].wavelength,
                            temperature: this.leds.types[currentType].temperature,
                            colour: this.leds.types[currentType].colour,
                            angle: this.leds.types[currentType].angle,
                            ratio: this.leds.types[currentType].ratio,
                            par: this.leds.types[currentType].par,
                            id: "diodeC" + i + "d" + randomLedPositions[i] + "x" + Math.round(position.x / this.leds.layout.xPadding) + "z" + Math.round(position.z / this.leds.layout.zPadding),
                            ammount: Math.round((this.leds.types[currentType].ratio / 100) * numOfTypes),
                            position: position,
                            parent: this.object,
                            type: '3d',
                            // sides				: ['front', 'bottom'],
                            sizeSelf: false,
                            width: this.leds.layout.width,
                            depth: this.leds.layout.depth,
                            height: this.leds.layout.height || this.leds.layout.width,
                            number: randomLedPositions[i]
                        })
                        // console.log("this is the diode that's about to be pushed")
                        // console.log(led);
                    this.leds.diodes[randomLedPositions[i]] = led
                        // console.log("this is the diode in the diode array after it's been pushed")
                        //     // console.log(this.leds.diodes[randomLedPositions[i]]);
                        // console.log(this.leds.diodes[randomLedPositions[i]].parent.id);

                    break
                }
            }
            // var diode = null
        }
        console.log("this is the diode array");
        console.log(this.leds.diodes);

    }
    this.getPosition = function(i) {
        if ((this.leds.x * 100 / this.leds.padding.x) * (this.leds.z * 100 / this.leds.padding.z)) {

        }
        for (x = 0; x < this.leds.x * 100 / this.leds.padding.x; x++) {
            for (z = 0; z < this.leds.z; z++) {

            }
        }
    }
    if (props.makeDiodes || props.leds.makeDiodes == true) {
        this.makeDiodes()
    }
}

function Diode(props) {
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
    this.number = props.number
    this.object = props.object || new Cube({
        width: props.width || .002,
        height: props.height || .002,
        depth: props.depth || .002,
        position: props.position,
        id: props.id,
        class: props.class || 'diode',
        group: props.group || 'diodes',
        type: props.type || '3d',
        sides: props.sides || ['front', 'bottom'],
        parent: props.parent,
        scene: props.parent.scene || props.scene,
        sizeSelf: props.sizeSelf || false
    })
    this.hitsSpot = function(props) {
        /*
        Takes as input coordinates x1,y1,z2 of the point we are calculating where light will hit,
        and also coordinates x2, y2, z2 of the source of the light. If not supplied we check
        if this.coordinates exists and use those values
        */

    }
}

function getTanDeg(deg) {
    var rad = deg * Math.PI / 180
    return Math.tan(rad)
}

function CoverageAt(props) {
    /**
    Input
    Coverage area as @props.length x @props.width
    And the X, Y and H coordinates of the light above that plane
    */
    /* Not needed any more
    Output:
    Then produces a grid of data filled with all the radiation levels at those points
    */
    this.energyAtPoint = function(x, y, z) {
        var lmpsqm = constantOfProportionality * ((Math.pow(y, 1 + 3.8317)) / Math.pow(Math.sqrt(Math.pow(x, 2) + Math.pow(z, 2) + Math.pow(y, 2)), 3 + 3.8317))
        return lmpsqm
    }
    var lightHeight = props.diode.position.oy - props.y
    if (lightHeight < 0) {
        return 0
    } else {
        var lightCrowZ = props.diode.position.oz - props.z
        var lightCrowX = props.diode.position.ox - props.x
            // var lightCrow = Math.sqrt(Math.pow(lightCrowZ, 2) * Math.pow(lightCrowX, 2))
            // var angleFromLed = Math.atan(lightCrow / lightHeight)
            // var constantOfProportionality = 2.56
        var constantOfProportionality = 10

        return this.energyAtPoint(lightCrowX, lightHeight, lightCrowZ)
    }


}

function Plant(props) {
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
        const maxDepth = 8,
            trunkWidth = 10,
            trunkLength = 100;
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

        const createFlower = ({
            x,
            y,
            idx
        }) => {
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
            const {
                childNodes
            } = svg;
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
                    flowers.push(createFlower(Object.assign({}, branch, {
                        idx
                    })));
                }
            };

            const tick = () => {
                flowers = flowers.reduce((acc, flower) => {
                    if (flower.step() > 0) {
                        return acc.concat([flower]);
                    } else {
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
                return Promise.resolve({
                    x: x2,
                    y: y2
                });
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
                60, -Math.PI / 2,
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

var GrowLightSchema = new Schema({
    height: {
        type: Number,
        default: 0.06
    },
    width: {
        type: Number,
        default: 0.83
    },
    depth: {
        type: Number,
        default: 0.26
    },
    function() {}
})

storage.createCollection('growlights', GrowLightSchema)

var growlighttt = storage.growlights.add()