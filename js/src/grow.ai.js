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
    function() {
        console.log("ran")
    }
})

storage.createCollection('growlights', GrowLightSchema)

var growlighttt = storage.growlights.add()

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
        random = []
        number = 0
        while (random.length < numOfTypes) {
            // console.log(random.length+" random.length and "+numOfTypes+" this.leds.ammount");
            if (random.indexOf(number) < 0) {
                random.push(number)
            }
            number = Math.ceil(Math.random() * numOfTypes - 1)
        }
        for (var i = 0; i < this.leds.ammount; i++) {
            // if(i == 0){
            // 	console.log("random list of diodes is");
            // 	console.log(random);
            // }
            //console.log("do we for some reason use the same i here: "+i)
            // console.log("i equals: ");
            // console.log(i);
            // console.log("and the ammount of diodes of the current Type we need is: ");
            // console.log(Math.round((this.leds.types[currentType].ratio / 100)*numOfTypes)+quotaFilled)
            if (i == Math.round((this.leds.types[currentType].ratio / 100) * numOfTypes) + quotaFilled) {
                // console.log("quotaFilled: ");
                // console.log(quotaFilled);
                // console.log("if i and that number equal, we go to the next type");
                quotaFilled += Math.round((this.leds.types[currentType].ratio / 100) * numOfTypes)
                currentType++
                // console.log("quotaFilled: ");
                // console.log(quotaFilled);

                // //console.log(quotaFilled)
                // //console.log("incremented")
                // //console.log(quotaFilled)

            }
            var position = {
                    x: 0,
                    y: 0,
                    z: 0
                }
                // console.log("this is the layout: ")
                // console.log(this.leds.layout)
            for (z = 0; z < this.leds.layout.zNum; z++) {
                // console.log(random[i]+" random[i]")
                if ((random[i] < (this.leds.layout.xNum * z) + this.leds.layout.xNum)) {
                    position = {
                        x: ((((this.leds.layout.xNum * (z + 1)) - (random[i]) - 1) * this.leds.layout.xPadding) + this.leds.layout.xOffset),
                        z: (z * this.leds.layout.zPadding) + this.leds.layout.zOffset,
                        y: 0,
                        num: random[i]
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
                wavelength: this.leds.types[currentType].nm || this.leds.types[currentType].nm,
                nm: this.leds.types[currentType].nm || this.leds.types[currentType].wavelength,
                temperature: this.leds.types[currentType].temperature,
                colour: this.leds.types[currentType].colour,
                angle: this.leds.types[currentType].angle,
                ratio: this.leds.types[currentType].ratio,
                par: this.leds.types[currentType].par,
                id: "diodeC" + i + "d" + random[i] + "x" + Math.round(position.x / this.leds.layout.xPadding) + "z" + Math.round(position.z / this.leds.layout.zPadding),
                ammount: Math.round((this.leds.types[currentType].ratio / 100) * numOfTypes),
                position: position,
                parent: this.object,
                type: '3d',
                // sides				: ['front', 'bottom'],
                sizeSelf: false,
                width: this.leds.layout.width,
                depth: this.leds.layout.depth,
                height: this.leds.layout.height || this.leds.layout.width,
            })
            this.leds.diodes[random[i]] = led
                // var diode = null
                // //console.log(this.leds.diodes[i])
        }
        //console.log(this.leds.diodes)
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
        //console.log("making diodes")
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
        //console.log(props.sizeSelf+" is sizeSelf before making diode cubes");
        //console.log(props.sizeSelf | true)
        // console.log("do we get stuck making Cubes() in Diodes()? no")
        // console.log("do we include the right scene and pxr?")
        // console.log(props.parent.scene);
        // console.log(props.parent.scene.pxr);
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
    // console.log('hoo')
    // console.log(props);

    var lightHeight = props.diode.position.oy - props.y
    if (lightHeight < 0) {
        // lightHeight = lightHeight*-1
        return 0
    }
    // console.log("height to use" );
    // console.log(lightHeight)
    // console.log(getTanDeg(props.diode.angle/2))
    // var lightHorizontal = getTanDeg(props.diode.angle/2)*lightHeight
    var lightCrowZ = Math.sqrt(Math.pow(props.diode.position.oz - props.z, 2))
    var lightCrowX = Math.sqrt(Math.pow(props.diode.position.ox - props.x, 2))
    var lightCrow = Math.sqrt(Math.pow(lightCrowZ, 2) * Math.pow(lightCrowX, 2))
        // console.log("light crow:");
        // console.log(lightCrow)
    var angleFromLed = Math.atan(lightCrow / lightHeight)
        // console.log("light height")
        // console.log(lightHeight);
        // console.log(angleFromLed);
        // console.log((angleFromLed*180)/Math.PI)

    // var constantOfProportionality = 0.14729
    var constantOfProportionality = 2.56
    this.energyAtPoint = function(h, x, y) {

        var lmpsqm = constantOfProportionality * ((Math.pow(h, 1 + 3.8317)) / Math.pow(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(h, 2)), 3 + 3.8317))
            // console.log("lumens per square metre at");
            // console.log(lmpsqm)
        return lmpsqm
    }
    return this.energyAtPoint(lightHeight, lightCrow, 0)
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