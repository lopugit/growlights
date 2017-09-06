function Grow(props) {

    this.calls = []
    this.call = function(props) {
        if (!props) var props = {}
        return {
            id: uuidv4(),
            time: new Date.now(),
            context: props.context,
            state: props.state
        }
    }
    this.energyAt = function(props) {
        var cumulativeEnergy = 0
        var curDiode = props.diode
        if (curDiode) {
            if (props.target) {
                xNormal = (props.target.x / l3.ai.unitScale(props.target.unit)) + (curDiode.position.sox / curDiode.position.unitScale)
                zNormal = (props.target.z / l3.ai.unitScale(props.target.unit)) + (curDiode.position.soz / curDiode.position.unitScale)
                yNormal = (curDiode.parent.hangHeight / curDiode.parent.unitScale)
                cumulativeEnergy += curDiode[props.lightUnit] *
                    (
                        Math.pow(yNormal, 1 + 3.8317) /
                        Math.pow(
                            Math.sqrt(
                                Math.pow(xNormal, 2) +
                                Math.pow(zNormal, 2) +
                                Math.pow(yNormal, 2)
                            ),
                            3 + 3.8317
                        )
                    )
            }

        }
        return cumulativeEnergy
    }
    this.calculateCoverage = function(props) {
        var _this = {
            id: props.id || uuidv4(),
            uuid: uuidv4()
        }
        if (!props) var props = {}
        if (props.lights) {} else if (!props.lightSources) {
            console.error("you need to include an array of lights")
            return false
        }
        _this.lightSources = props.lights || props.lightSources
        if (props.render)
            if (!props.scene) console.error("you need to include a l3 scene if you want to render the map")
        _this.scene = props.scene
        _this.ratio = props.scene.ratio || props.ratio
        _this.coverageMaps = props.coverageMaps || []
        _this.lightSources.forEach((lightSource, index) => {
            var curLightSource = lightSource
                // if(!curLightSource.object){
                //     curLightSource.renderObject({
                //         scene: _this.scene,

            //     })
            // }
            if (curLightSource.leds)
                curLightSource.makeDiodes({ render: false })

        })
        _this.unit = "cm"
        if (props.frontOn) {
            _this.frontOn = true
            var globFace = "front"
            posAdjY = "z"
            posAdjZ = "y"
            labelRotationNormal = 0
        } else {
            var globFace = "bottom"
            posAdjY = "y"
            posAdjZ = "z"
            labelRotationNormal = -90

        }
        if (_this.coverageMaps.length > 0) {
            _this.coverageMaps.forEach((coverageMapIter, index) => {
                var coverageMap = coverageMapIter
                if (!coverageMap.position) coverageMap.position = {}
                coverageMap = returnJsonConcat(coverageMap, {
                    map: [],
                    unit: coverageMap.unit || 'cm',
                    width: coverageMap.width || 0,
                    depth: coverageMap.depth || 0,
                    height: coverageMap.height || coverageMap.depth || 0,
                    xResolution: coverageMap.xResolution || coverageMap.resolution || coverageMap.width || 0,
                    zResolution: coverageMap.zResolution || coverageMap.resolution || coverageMap.depth || 0,
                    yResolution: coverageMap.yResolution || coverageMap.resolution || coverageMap.zResolution || 0,
                    type: coverageMap.type || '2d',
                    id: coverageMap.id || uuidv4(),
                    lumensMax: 0,
                    luxMax: 0,
                    photonsMax: 0,
                    ppfdMax: 0,
                    wattageMax: 0,
                    wattagePsqmMax: 0,
                    lumensTotal: 0,
                    luxTotal: 0,
                    photonsTotal: 0,
                    ppfdTotal: 0,
                    wattageTotal: 0,
                    wattagePsqmTotal: 0,
                    lumensAvg: 0,
                    luxAvg: 0,
                    photonsAvg: 0,
                    ppfdAvg: 0,
                    wattageAvg: 0,
                    wattagePsqmAvg: 0,
                    object: {},
                    position: {
                        x: coverageMap.position.x || 0,
                        y: coverageMap.position.y || 0,
                        z: coverageMap.position.z || 0,
                        unit: coverageMap.position.unit || coverageMap.unit || "cm",
                        rx: coverageMap.position.rx || 0,
                        ry: coverageMap.position.ry || 0,
                        rz: coverageMap.position.rz || 0,
                    }
                })
                coverageMap.width = (Math.floor(coverageMap.width / coverageMap.xResolution)) * coverageMap.xResolution
                coverageMap.depth = (Math.floor(coverageMap.depth / coverageMap.zResolution)) * coverageMap.zResolution
                coverageMap.height = (Math.floor(coverageMap.height / coverageMap.yResolution)) * coverageMap.yResolution
                coverageMap.area = (coverageMap.width * coverageMap.depth).toFixed(2)
                coverageMap.object = new Cube({
                    width: coverageMap.width,
                    height: coverageMap.height,
                    depth: coverageMap.depth,
                    unit: coverageMap.unit,
                    type: 'canvas',
                    scene: _this.scene,
                    id: coverageMap.id + "object",
                    canvas: {
                        type: 'rects',
                        rects: coverageMap.map,
                        size: {
                            height: true,
                            width: true,
                            inherit: true
                        },
                        pxRects: [],
                        render: false
                    },
                    group: {
                        id: 'coverageMaps' + _this.uuid,
                        class: 'coverageMaps ' + _this.scene.theme
                    },
                    class: 'coverageMap ' + _this.scene.theme,
                    position: {
                        x: coverageMap.position.x,
                        y: coverageMap.position.y,
                        z: coverageMap.position.z,
                        // type: 'center',
                        unit: coverageMap.unit
                    },
                    ratio: _this.scene.ratio || _this.ratio || props.mapRatio || 88
                })
                if (props.dimensionLabels) {
                    coverageMap.object.children.push(
                        new Cube({
                            width: coverageMap.width,
                            height: 5,
                            sides: [],
                            unit: coverageMap.unit,
                            id: uuidv4(),
                            class: 'coverageMapFullLabel width ',
                            data: {
                                text: '<div class="data">' + coverageMap.width + coverageMap.unit + '</div>'
                            },
                            parent: coverageMap.object,
                            position: {
                                rx: labelRotationNormal,
                                y: coverageMap.resolution / 3,
                                unit: coverageMap.unit
                            }

                        }),
                        new Cube({
                            height: coverageMap.depth,
                            width: 5,
                            sides: [],
                            unit: coverageMap.unit,
                            id: uuidv4() + "coverageMapLabel",
                            class: 'coverageMapFullLabel depth ',
                            data: {
                                text: '<div class="data">' + coverageMap.depth + coverageMap.unit + '</div>'
                            },
                            parent: coverageMap.object,
                            position: {
                                rx: labelRotationNormal,
                                x: -(coverageMap.resolution / 2),
                                z: 0,
                                y: 0,
                                unit: coverageMap.unit
                            }

                        })

                    )
                }
                for (var x = 0; x <= coverageMap.width - coverageMap.xResolution; x += coverageMap.xResolution) {
                    var curX = x
                    for (var z = 0; z <= coverageMap.depth - coverageMap.zResolution; z += coverageMap.zResolution) {
                        var curZ = z
                        if (coverageMap.type == '3d') {
                            for (var y = 0; y <= coverageMap.height - coverageMap.yResolution; y += coverageMap.yResolution) {
                                var curY = y
                                    // make a cube of coverage points data
                            }
                        } else {
                            var area = (coverageMap.xResolution * coverageMap.zResolution)
                            var coverageMapSquare = {
                                width: coverageMap.xResolution,
                                depth: coverageMap.zResolution,
                                height: coverageMap.yResolution,
                                unit: coverageMap.unit,
                                position: {
                                    x: curX + (coverageMap.xResolution / 2),
                                    z: curZ + (coverageMap.zResolution / 2),
                                    y: 0,
                                    // y: -coverageMap.height,
                                    unit: coverageMap.unit,
                                    type: 'center'
                                },
                                type: '2d',
                                lumens: 0,
                                lux: 0,
                                photons: 0,
                                ppfd: 0,
                                wattage: 0,
                                wattagePsqm: 0,
                                area: area,
                                areaNormalised: area / l3.ai.convertAreaScale(coverageMap.unit, "m")
                            }
                            if (_this.frontOn) { var zOffset = 0 } else { var zOffset = coverageMap.zResolution / 2 }
                            coverageMapSquare.rect = {
                                width: coverageMapSquare.width,
                                depth: coverageMapSquare.depth,
                                height: coverageMapSquare.height,
                                unit: coverageMapSquare.unit,
                                position: {
                                    x: coverageMapSquare.position.x - (coverageMap.xResolution / 2),
                                    y: coverageMapSquare.position[posAdjY] - (coverageMap.yResolution / 2),
                                    z: coverageMapSquare.position[posAdjZ] - zOffset,
                                    unit: coverageMapSquare.position.unit
                                }
                            }
                            coverageMap.map.push(coverageMapSquare)
                        }
                    }
                }
                _this.lightSources.forEach((lightSource, index) => {
                    var curLightSource = lightSource
                    coverageMap.hangHeight = curLightSource.hangHeight
                    coverageMap.map.forEach((curSquare, index) => {
                        curLightSource.leds.diodes.forEach((curDiode, index2) => {
                            curSquare.lux += this.energyAt({
                                lightUnit: "lux",
                                target: {
                                    x: ((curSquare.position.x)) - (coverageMap.width / 2),
                                    z: ((curSquare.position.z)) - (coverageMap.depth / 2),
                                    unit: coverageMap.unit
                                },
                                diode: curDiode
                            })
                            curSquare.ppfd += this.energyAt({
                                lightUnit: "ppfd",
                                target: {
                                    x: ((curSquare.position.x)) - (coverageMap.width / 2),
                                    z: ((curSquare.position.z)) - (coverageMap.depth / 2),
                                    unit: coverageMap.unit
                                },
                                diode: curDiode
                            })
                            curSquare.wattagePsqm += this.energyAt({
                                lightUnit: "wattagePsqm",
                                target: {
                                    x: ((curSquare.position.x)) - (coverageMap.width / 2),
                                    z: ((curSquare.position.z)) - (coverageMap.depth / 2),
                                    unit: coverageMap.unit
                                },
                                diode: curDiode
                            })
                            if (coverageMap.lumensMax < curSquare.lumens)
                                coverageMap.lumensMax = curSquare.lumens
                            if (coverageMap.ppfdMax < curSquare.ppfd)
                                coverageMap.ppfdMax = curSquare.ppfd
                            if (coverageMap.wattagePsqmMax < curSquare.wattagePsqm)
                                coverageMap.wattagePsqmMax = curSquare.wattagePsqm
                                // if (coverageMap.photonsMax < curSquare.photons)
                                //     coverageMap.photonsMax = curSquare.photons
                            if (coverageMap.luxMax < curSquare.lux)
                                coverageMap.luxMax = curSquare.lux
                                // for (var i = 0; i < curSquare.object.sides.length; i++) {
                                //     d3.select($("#" + curSquare.object.id + "> .faceParent > .face").get(i))
                                //         .transition()
                                //         // .duration(Math.random() * 40000)
                                //         .duration(10)
                                //         .style('opacity', index / curLightSource.leds.diodes.length)
                                // }
                        })



                    })
                })
                coverageMap.map.forEach((curSquare, index) => {
                    var closestHangHeight = 0
                    var temp
                    for (var i = 0; i < _this.lightSources.length; i++) {
                        if (!temp) {
                            var temp = this.normalize(_this.lightSources[i].position.z - (curSquare.position.z - (coverageMap.depth / 2)))
                            closestHangHeight = _this.lightSources[i].hangHeight
                        } else if (temp < this.normalize(_this.lightSources[i].position.z - (curSquare.position.z - (coverageMap.depth / 2)))) {
                            closestHangHeight = _this.lightSources[i].hangHeight
                            temp = this.normalize(_this.lightSources[i].position.z - (curSquare.position.z - (coverageMap.depth / 2)))
                        }
                    }
                    curSquare.photons = (curSquare.area / l3.ai.convertAreaScale(coverageMap.unit, "m")) * curSquare.ppfd
                    curSquare.lumens = ((curSquare.area / l3.ai.convertAreaScale(coverageMap.unit, "m"))) * curSquare.lux
                    curSquare.wattage = ((curSquare.area / l3.ai.convertAreaScale(coverageMap.unit, "m"))) * curSquare.wattagePsqm
                    coverageMap.wattageTotal += curSquare.wattage
                    coverageMap.wattagePsqmTotal += curSquare.wattagePsqm
                    coverageMap.lumensTotal += curSquare.lumens
                    coverageMap.luxTotal += curSquare.lux
                    coverageMap.ppfdTotal += curSquare.ppfd
                    coverageMap.photonsTotal += curSquare.photons
                    coverageMap.wattageAvg = (coverageMap.wattageTotal / coverageMap.map.length)
                    coverageMap.wattagePsqmAvg = (coverageMap.wattagePsqmTotal / coverageMap.map.length)
                    coverageMap.lumensAvg = (coverageMap.lumensTotal / coverageMap.map.length)
                    coverageMap.luxAvg = (coverageMap.luxTotal / coverageMap.map.length)
                    coverageMap.ppfdAvg = (coverageMap.ppfdTotal / coverageMap.map.length)
                    coverageMap.photonsAvg = (coverageMap.photonsTotal / coverageMap.map.length)
                    var tempLightColour = [255, 43, 151]
                    curSquare.rect.fillStyle = 'rgba(' + tempLightColour[0] + ',' + tempLightColour[1] + ',' + tempLightColour[2] + ',' + curSquare.ppfd / coverageMap.ppfdMax + ')'
                })
                var mapData = [
                    { key: 'width', text: "Width:  <div class='unit'><div class='value'>" + coverageMap.width + '</div>' + coverageMap.unit + '</div>', group: 'coverageMapData' },
                    { key: 'depth', text: "Depth:  <div class='unit'><div class='value'>" + coverageMap.depth + '</div>' + coverageMap.unit + '</div>', group: 'coverageMapData' },
                    { key: 'areaNormalised', text: "Area:  <div class='unit'><div class='value'>" + coverageMap.area / l3.ai.convertAreaScale(coverageMap.unit, "m") + '</div>m<div class="squared">2</div></div>', group: 'coverageMapData', round: 4 },
                    // { key: 'ppfdTotal', text: "All PPFD:  <div class='unit'><div class='value'>" + (coverageMap.ppfdTotal).toFixed(2) + '</div>', group: 'coverageMapData' },
                    // { key: 'luxTotal', text: "All Lux:  <div class='unit'><div class='value'>" + (coverageMap.luxTotal).toFixed(2) + '</div>', group: 'coverageMapData' },
                    // { key: 'photonsTotal', text: "Total Photons (umols/s):  <div class='unit'><div class='value'>" + (coverageMap.photonsTotal).toFixed(0) + '</div>', group: 'coverageMapData' },
                    { key: 'lumensTotal', text: "Total Lumens:  <div class='unit'><div class='value'>" + (coverageMap.lumensTotal).toFixed(0) + '</div>', group: 'coverageMapData' },
                    { key: 'wattageTotal', text: "Total Wattage:  <div class='unit'><div class='value'>" + (coverageMap.wattageTotal).toFixed(0) + '</div>', group: 'coverageMapData' },
                    // { key: 'wattageTotal', text: "Total Wattage:  <div class='unit'><div class='value'>" + (coverageMap.wattageTotal).toFixed(0) + '</div>', group: 'coverageMapData' },
                    { key: 'ppfdAvg', text: "Avg PPFD (umols/m2/s):  <div class='unit'><div class='value'>" + (coverageMap.ppfdAvg).toFixed(0) + '</div>', group: 'coverageMapData' },
                    { key: 'luxAvg', text: "Avg Lux (lumens/m2):  <div class='unit'><div class='value'>" + (coverageMap.luxAvg).toFixed(0) + '</div>', group: 'coverageMapData' },
                ]
                mapData.forEach((data, datas) => {
                    if (data.group) {
                        var newGroup = {
                            class: data.group,
                            id: coverageMap.object.id + data.group,
                            positioner: true
                        }
                    }
                    var newCube = new Cube({
                        class: 'coverageMapDataItem ' + data.key,
                        parent: coverageMap.object,
                        sides: [],
                        group: newGroup,
                        data: {
                            text: '<div class="data-container">' + data.text + '</div'
                        }
                    })
                })
                coverageMap.object.renderCanvas()
                var squareArea = coverageMap.xResolution * coverageMap.zResolution

                var tileData = [
                    { key: 'width', text: "Tile Width: <div class='unit'><div class='value'>" + coverageMap.xResolution + "</div>" + coverageMap.unit + "</div>", group: 'coverageSquareData' },
                    { key: 'depth', text: "Tile Depth: <div class='unit'><div class='value'>" + coverageMap.zResolution + "</div>" + coverageMap.unit + "</div>", group: 'coverageSquareData' },
                    { key: 'areaNormalised', text: "Tile Area:  <div class='unit'><div class='value'>" + (coverageMap.zResolution * coverageMap.xResolution) / l3.ai.convertAreaScale(coverageMap.unit, "m") + '</div>m<div class="squared">2</div></div>', group: 'coverageSquareData', round: 4 },
                    { key: 'position-x', text: "At X: <div class='value'>" + 0 + "</div>", group: 'coverageSquareData' },
                    { key: 'position-z', text: "At Z: <div class='value'>" + 0 + "</div>", group: 'coverageSquareData' },
                    { key: 'ppfd', text: "PPFD (umols/m2/s): <div class='value'>" + 0 + "</div>", group: 'coverageSquareData' },
                    { key: 'lux', text: "Lux (lumens/m2): <div class='value'>" + 0 + "</div>", group: 'coverageSquareData' },
                    { key: 'photons', text: "Photons (umols): <div class='value'>" + 0 + "</div>", group: 'coverageSquareData', round: 2 },
                    { key: 'lumens', text: "Lumens: <div class='value'>" + 0 + "</div>", group: 'coverageSquareData', round: 2 },
                    { key: 'wattage', text: "Wattage: <div class='value'>" + 0 + "</div>", group: 'coverageSquareData', round: 2 },
                ]

                tileData.forEach((data, datas) => {
                    if (data.group) {
                        var newGroup = {
                            class: data.group,
                            id: coverageMap.object.id + data.group,
                            positioner: true
                        }
                    }
                    var newCube = new Cube({
                        class: 'coverageMapDataItem ' + data.key,
                        parent: coverageMap.object,
                        sides: [],
                        group: newGroup,
                        data: {
                            text: data.text
                        }
                    })
                })
                coverageMap.object.canvas.rects.forEach((rect, index) => {
                    var pxRect = {
                        width: ((rect.rect.width / l3.ai.unitScale(rect.rect.unit)) * coverageMap.object.scene.pxr),
                        height: ((rect.rect.height / l3.ai.unitScale(rect.rect.unit)) * coverageMap.object.scene.pxr),
                        unit: 'px',
                        position: {
                            x: ((rect.rect.position.x / l3.ai.unitScale(rect.rect.unit)) * coverageMap.object.scene.pxr),
                            y: ((rect.rect.position.y / l3.ai.unitScale(rect.rect.unit)) * coverageMap.object.scene.pxr),
                            z: ((rect.rect.position.z / l3.ai.unitScale(rect.rect.unit)) * coverageMap.object.scene.pxr),
                            unit: 'px'
                        },
                        zIndex: 20,
                        index: index
                    }
                    coverageMap.object.canvas.pxRects.push(pxRect)
                })

                function updateData(e) {
                    var mouseX = parseInt(e.offsetX)
                    var mouseY = parseInt(e.offsetY)
                    var hoveredRect = l3.ai.findCurrentRect({ mouse: { x: mouseX, y: mouseY }, rects: coverageMap.object.canvas.pxRects })
                    var curSquare = coverageMap.map[hoveredRect.index]
                    tileData.forEach((data, index) => {
                        coverageMap.object.children.forEach((child, index) => {
                            if (child.group && child.group.class.indexOf(data.group) > -1) {
                                if (child.class.indexOf(data.key) > -1) {
                                    var key = data.key.replace('-', '.')
                                    if (typeof curSquare[key] == 'number') {
                                        var round = data.round || 0
                                        var html = Object.byString(curSquare, key).toFixed(round)
                                    } else {
                                        var html = Object.byString(curSquare, key)
                                    }
                                    d3.select($("#" + coverageMap.object.id + " #" + child.id + "." + data.key + " .value").get(0))
                                        .html(html)
                                }
                            }
                        })
                    })

                }
                coverageMap.object.canvas.canvas.onmousemove = updateData
            })
        }
    }
    this.normalize = function(number) {
        return Math.sqrt(Math.pow(number, 2))
    }
    this.wavelengthColourCodes = []
    this.firstColourCode = [179, 34, 255]
    this.wavelengthRanges = [
        { colour: 'violet', wavelengthRange: { min: 400, max: 440 }, rgbObj: { r: 57, g: 220, b: 255 }, rgb: [70, 140, 255] },
        // { colour: 'violet', wavelengthRange: { min: 400, max: 440 }, rgbObj: { r: 110, g: 200, b: 255 }, rgb: [70, 140, 255] },
        { colour: 'blue', wavelengthRange: { min: 440, max: 485 } },
        { colour: 'cyan', wavelengthRange: { min: 485, max: 500 } },
        { colour: 'green', wavelengthRange: { min: 500, max: 565 } },
        { colour: 'yellow', wavelengthRange: { min: 565, max: 590 } },
        { colour: 'orange', wavelengthRange: { min: 590, max: 600 } },
        { colour: 'red', wavelengthRange: { min: 600, max: 680 }, rgbObj: { r: 255, g: 0, b: 1 }, rgb: [255, 0, 5] }
        // { colour: 'near-infra-red', wavelengthRange: { min: 700, max: 730 }, rgbObj: { r: 255, g: 31, b: 31 }, rgb: [221, 0, 0] }
    ]
    this.customColours = [
        { colour: 'Purple', wavelength: 'Purple', rgbObj: { r: 105, g: 52, b: 147 }, rgb: [105, 52, 147], rgbString: 'rgb(105, 52, 147)' },
        { colour: 'Blue', wavelength: 'Blue', rgbObj: { r: 22, g: 112, b: 195 }, rgb: [22, 112, 195], rgbString: 'rgb(22, 112, 195)' },
        { colour: 'Cyan', wavelength: 'Cyan', rgbObj: { r: 70, g: 201, b: 250 }, rgb: [70, 201, 250], rgbString: 'rgb(70, 201, 250)' },
        { colour: 'Green', wavelength: 'Green', rgbObj: { r: 128, g: 188, b: 24 }, rgb: [128, 188, 24], rgbString: 'rgb(128, 188, 24)' },
        { colour: 'Yellow', wavelength: 'Yellow', rgbObj: { r: 255, g: 224, b: 59 }, rgb: [255, 224, 59], rgbString: 'rgb(255, 224, 59)' },
        { colour: 'Orange', wavelength: 'Orange', rgbObj: { r: 255, g: 160, b: 61 }, rgb: [255, 160, 61], rgbString: 'rgb(255, 160, 61)' },
        { colour: 'Red', wavelength: 'Red', rgbObj: { r: 255, g: 65, b: 65 }, rgb: [255, 65, 65], rgbString: 'rgb(255, 65, 65)' },
        { colour: 'yellow', wavelength: 'k3000', rgbObj: { r: 255, g: 191, b: 116 }, rgb: [255, 191, 116], rgbString: 'rgb(255, 191, 116)' },
        { colour: 'infra red', wavelength: 'nm730', rgbObj: { r: 222, g: 0, b: 4 }, rgb: [221, 0, 0] },
        { colour: 'UVA', wavelength: 'UVA', rgbObj: { r: 203, g: 44, b: 255 }, rgb: [203, 44, 255] }
    ]
    this.interpolateHSL = function(color1, color2, factor) {
        if (arguments.length < 3) { factor = 0.5; }
        var hsl1 = ROT.Color.rgb2hsl(color1)
        var hsl2 = ROT.Color.rgb2hsl(color2)
        for (var i = 0; i < 3; i++) {
            hsl1[i] += factor * (hsl2[i] - hsl1[i])
        }
        // return ROT.Color.hsl2rgb(hsl1);
        return hsl1
    };
    this.makeColours = function(props) {
        if (!props) var props = {}
        var minWavelength = props.minWavelength || this.wavelengthRanges[0].wavelengthRange.min || 280
        var maxWavelength = props.maxWavelength || this.wavelengthRanges[this.wavelengthRanges.length - 1].wavelengthRange.max || 820
        var firstColourRgb = [this.wavelengthRanges[0].rgbObj.r, this.wavelengthRanges[0].rgbObj.g, this.wavelengthRanges[0].rgbObj.b]
        var secondColourRgb = [this.wavelengthRanges[this.wavelengthRanges.length - 1].rgbObj.r, this.wavelengthRanges[this.wavelengthRanges.length - 1].rgbObj.g, this.wavelengthRanges[this.wavelengthRanges.length - 1].rgbObj.b]
        var totalWavelengths = (maxWavelength - minWavelength)
        var factorStep = 1 / totalWavelengths
        for (var wavelength = minWavelength; wavelength < maxWavelength; wavelength++) {
            var index = wavelength - minWavelength
            var rgb = ROT.Color.interpolateHSL(firstColourRgb, secondColourRgb, (factorStep + (factorStep * index)))
            var curWavelength = wavelength
            for (var colour = 0; colour < this.wavelengthRanges.length; colour++) {
                if (this.wavelengthRanges[colour].wavelengthRange.min <= curWavelength && curWavelength < this.wavelengthRanges[colour].wavelengthRange.max) {
                    var rgbObj = { r: rgb[0], g: rgb[1], b: rgb[2] }
                    this.wavelengthColourCodes['nm' + curWavelength] = { curWavelength: curWavelength, colour: this.wavelengthRanges[colour].colour, rgb: rgb, rgbObj: rgbObj, rgbString: 'rgba(' + rgbObj.r + ',' + rgbObj.g + ',' + rgbObj.b + ',1)' }
                }
            }
        }
        for (var colourIter = 0; colourIter < this.customColours.length; colourIter++) {
            this.wavelengthColourCodes[this.customColours[colourIter].wavelength] = this.customColours[colourIter]
        }
    }
    this.makeColours()
    this.getColour = function(wavelength) {
        for (var colour = 0; colour < this.wavelengthRanges.length; colour++) {
            if (this.wavelengthRanges[colour].wavelengthRange.min <= wavelength && wavelength < this.wavelengthRanges[colour].wavelengthRange.max) {
                return this.wavelengthRanges[colour].colour
            }
        }
    }
    this.getColourCode = function(wavelength) {
        for (var wavelength = 0; wavelength < this.wavelengthColourCodes.length; wavelength++) {
            if (wavelength == this.wavelengthColourCodes[wavelength].wavelength) {
                if (typeof wavelength == 'Number') {
                    if (wavelength < 1000) {
                        wavelength = 'nm' + wavelength
                    } else if (wavelength > 1000) {
                        wavelength = 'k' + wavelength
                    }
                }
                return this.wavelengthColourCodes[wavelength].rgbString
            }
        }
    }
}

var grow = {
    ai: new Grow()
}

function Growroom(props, opts) {
    jsonConcat(this, props)
    if (!props) var props = {}
    if (!opts) var opts = {}
    this.height = opts.height || props.height
    this.width = opts.width || props.width
    this.depth = opts.depth || props.depth
    this.ratio = opts.ratio || props.ratio || 100
    this.id = opts.id || props.id || "defaultRoom"
    this.uuid = opts.uuid || props.uuid || uuidv4()
    this.class = opts.class || props.class || 'tent'
    this.scene = opts.scene || props.scene
    this.render = opts.render || props.render || true
    this.lights = opts.lights || props.lights || []
    this.position = opts.position || props.position || {
        x: 0,
        y: 0,
        z: 0
    }
    this.unit = opts.unit || props.unit || "m"
    this.mongoId = opts.mongoId || props.mongoId
    this.minPxWidth = opts.minPxWidth || props.minPxWidth
    if (props.object) jsonConcat(this.object, props.object)
    if (opts.object) jsonConcat(this.object, opts.object)
    this.object = new Cube({
        height: this.height,
        width: this.width,
        depth: this.depth,
        unit: this.unit,
        ratio: this.ratio,
        scene: this.scene,
        id: this.uuid,
        class: this.class,
        sizeSelf: opts.sizeSelf || props.sizeSelf || true,
        minPxWidth: opts.minPxWidth || props.minPxWidth || this.minPxWidth,
        position: this.position || {
            x: 0,
            y: 0,
            z: 0
        }
    })
    this.dimensions = {
        width: {
            dimension: 'width',
            value: this.width
        },
        depth: {
            dimension: 'depth',
            value: this.depth
        },
        height: {
            dimension: 'height',
            value: this.height
        }
    }
    this.labels = opts.labels || props.labels || []
    this.coverage = []
    this.addLight = function(props) {
            //something
            this.lights.push(props.light)
        }
        // Returns height, width, depth in an object
        // this.dimensions = function() {
        //     return {
        //         height: this.height,
        //         width: this.width,
        //         depth: this.depth
        //     }
        // }
    this.addChildObject = function(props) {

    }
    this.renderDimensionLabels = function(props) {
        if (props.dimensions == '3d') {
            for (prop in this.dimensions) {
                if (this.dimensions.hasOwnProperty(prop)) {
                    if (this.dimensions[prop].dimension == 'width') {
                        var dimensionLabel = new Cube({
                            type: '2d',
                            height: 0,
                            width: 20,
                            depth: 0,
                            unit: "cm",
                            class: this.class + "DimensionLabel",
                            id: this.uuid + "labelFor" + this.dimensions[prop].dimension,
                            group: {
                                class: "dimensionLabels",
                                id: this.uuid + "dimensionLabels"
                            },
                            parent: this.object,
                            position: {
                                x: ((this.object.width / this.object.unitScale) / 2) + ((this.object.width / this.object.unitScale) / 9),
                                y: 0.005,
                                z: 0,
                                unit: "m",
                                // type: 'center'
                            }
                        })
                        this.labels.push(dimensionLabel)
                        var str = '<div class="dimensionLabel"><div>' + this.dimensions[prop].dimension + ': </div><div>' + this.object.width + '' + this.object.unit + '</div></div></div>'
                        $('#' + this.scene.id + ' #' + dimensionLabel.id).append(str)
                    } else if (this.dimensions[prop].dimension == 'depth') {
                        var dimensionLabel = new Cube({
                            type: '2d',
                            height: 20,
                            width: 80,
                            depth: 2,
                            unit: "cm",
                            class: this.class + "DimensionLabel",
                            id: this.uuid + "labelFor" + this.dimensions[prop].dimension,
                            group: {
                                class: "dimensionLabels",
                                id: this.uuid + "dimensionLabels"
                            },
                            parent: this.object,
                            position: {
                                x: 0,
                                y: 0.005,
                                z: (this.object.depth / this.object.unitScale) / 2,
                                unit: "m",
                                // type: 'center'
                            }
                        })
                        this.labels.push(dimensionLabel)
                        var str = '<div class="dimensionLabel"><div>' + this.dimensions[prop].dimension + ': </div><div>' + this.object.depth + '' + this.object.unit + '</div></div></div>'
                        $('#' + this.scene.id + ' #' + dimensionLabel.id).append(str)


                    } else if (this.dimensions[prop].dimension == 'height') {
                        var dimensionLabel = new Cube({
                            type: '2d',
                            height: 20,
                            width: 80,
                            depth: 2,
                            unit: "cm",
                            class: this.class + "DimensionLabel",
                            id: this.uuid + "labelFor" + this.dimensions[prop].dimension,
                            group: {
                                class: "dimensionLabels",
                                id: this.uuid + "dimensionLabels"
                            },
                            parent: this.object,
                            position: {
                                x: 0,
                                y: (this.object.height / this.object.unitScale) / 2,
                                z: 0,
                                unit: "m",
                                // type: 'center'
                            }
                        })
                        this.labels.push(dimensionLabel)
                        var str = '<div class="dimensionLabel"><div>' + this.dimensions[prop].dimension + ': </div><div>' + this.object.height + '' + this.object.unit + '</div></div></div>'
                        $('#' + this.scene.id + ' #' + dimensionLabel.id).append(str)


                    }
                }
            }
        }
    }
    if (props.renderDimensionLabels) {
        this.renderDimensionLabels({
            dimensions: this.object.type
        })
    } else if (opts.renderDimensionLabels) {
        this.renderDimensionLabels({
            dimensions: this.object.type
        })
    }
    this.renderCoverage = function(props) {
        /* include @param-object faces to be calculated
         * include @param-interger resolution which is the size of the squares that will be evaluated
         * include @param-array[string] lights which is an array of light id's you want to calculate the coverage for
         */
        props.class = props.class || 'floorCoverage'
        this.coverage[props.id] = []
        if (!props.yPlane) {
            props.yPlane = 0
        }
        if (props.unit == "m") {
            props.unitScale = 1
        } else if (props.unit == "cm") {
            props.unitScale = 100
        } else if (props.unit == "mm") {
            props.unitScale = 1000
        } else if (props.unit == "um") {
            props.unitScale = 10000
        } else {
            props.unitScale = 1
        }
        for (var x = 0; x < Math.ceil((this.width / this.object.unitScale) / (props.resolution / props.unitScale)); x++) {
            for (var z = 0; z < Math.ceil((this.depth / this.object.unitScale) / (props.resolution / props.unitScale)); z++) {
                if (props.includeY) {
                    for (var yHere = 0; yHere < Math.ceil((this.height / this.object.unitScale) / (props.resolution / props.unitScale)); yHere++) {
                        var y = yHere
                        var position = {}
                        position.unit = props.unit
                        position.type = props.position.type || 'normal'
                        if (props.position) {
                            if (props.position.type == 'center') {
                                position.x = (((x * (props.resolution / props.unitScale)) + (props.resolution / props.unitScale) / 2) + (((this.width / this.object.unitScale)) - (Math.ceil((this.width / this.object.unitScale) / (props.resolution / props.unitScale)) * (props.resolution / props.unitScale))) / 2) * props.unitScale
                                position.z = (((z * (props.resolution / props.unitScale)) + ((props.resolution / props.unitScale) / 2)) + (((this.depth / this.object.unitScale)) - (Math.ceil((this.depth / this.object.unitScale) / (props.resolution / props.unitScale)) * (props.resolution / props.unitScale))) / 2) * props.unitScale
                                if (!props.includeY) {
                                    position.y = (props.yPlane + ((props.resolution / props.unitScale) / 2)) * props.unitScale
                                }
                            } else {
                                position.x = ((x * (props.resolution / props.unitScale)) * props.unitScale) * props.unitScale
                                position.z = ((z * (props.resolution / props.unitScale)) * props.unitScale) * props.unitScale
                                position.y = props.yPlane
                            }
                        }

                        if (position.type == 'center') {
                            position.y = ((y * props.resolution) + (props.resolution) / 2) * props.unitScale
                        } else {
                            position.y = ((y * props.resolution) + props.yPlane) * props.unitScale
                        }
                        // var objectPosition = (function() { return position })
                        var coverageSquare = new Cube({
                            width: props.squareSize || 0.05,
                            height: props.squareSize || 0.05,
                            depth: props.squareSize || 0.05,
                            unit: props.unit || "m",
                            sides: props.sides || ["bottom", "front", "top", "left", "right", "back"],
                            group: {
                                class: "coverage",
                                id: this.uuid + "coverage"
                            },
                            class: props.class || 'floorCoverage',
                            id: (props.uuid || 'floorCoverage') + 'X' + x + "Y" + y + "Z" + z,
                            parent: this.object,
                            position: position,
                            // position: objectPosition(),
                            type: props.type || '3d'

                        })
                        coverageSquare.lightSources = []
                        this.coverage[props.id].push(coverageSquare)
                    }
                } else {
                    var position = {}
                    position.unit = props.unit
                    position.type = props.position.type || 'normal'
                    if (props.position) {
                        if (props.position.type == 'center') {
                            position.x = ((x * props.resolution) + props.resolution / 2) + ((this.width) - (Math.ceil(this.width / props.resolution) * props.resolution)) / 2
                            position.z = ((z * props.resolution) + (props.resolution / 2)) + ((this.depth) - (Math.ceil(this.depth / props.resolution) * props.resolution)) / 2
                            if (!props.includeY) {
                                position.y = props.yPlane + (props.resolution / 2)
                            }
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
                        unit: props.unit || "m",
                        sides: props.sides || ["bottom", "front", "top", "left", "right", "back"],
                        group: {
                            class: "coverage",
                            id: this.uuid + "coverage"
                        },
                        class: props.class || 'floorCoverage',
                        id: (props.uuid || 'floorCoverage') + 'X' + x + "Y" + Math.round(position.y) + "Z" + z,
                        parent: this.object,
                        position: position,
                        // position: objectPosition(),
                        type: props.type || '3d'
                    })
                    coverageSquare.lightSources = []
                    this.coverage[props.id].push(coverageSquare)

                }
            }
        }
        /* (this.leds)
              Loops over all points in the array of coverage squares
              Sets their lumensPsqm to 0 intially
              Then for all the lights in the scene, and for all diodes on those lights,
              it adds the lumens cumulatively to the point/coverageSquare object
              Then it adds an element to the coverage square which displays that data
          */
        for (var point = 0; point < this.coverage[props.id].length; point++) {
            this.coverage[props.id][point].lumensPsqm = 0
            for (var light = 0; light < this.lights.length; light++) {
                this.lights[light].leds.diodes.forEach((index, diode) => {
                        var thisDiode = diode
                        if (this.coverage[props.id][point].position.type == 'center') {

                            var tempDiode = this.lights[light].leds.diodes[thisDiode]
                            var position = this.coverage[props.id][point].position
                            var result = CoverageAt({
                                diode: tempDiode,
                                x: position.x,
                                y: position.y,
                                z: position.z,
                                unit: position.unit,
                                unitScale: position.unitScale
                            })

                            this.coverage[props.id][point].lightSources.push(tempDiode)
                            this.coverage[props.id][point].lumensPsqm += result


                        } else {

                            var tempDiode = this.lights[light].leds.diodes[thisDiode]
                            var position = this.coverage[props.id][point].position
                            var result = CoverageAt({
                                diode: tempDiode,
                                x: position.x,
                                y: position.y,
                                z: position.z,
                                unit: position.unit,
                                unitScale: position.unitScale
                            })

                            var results = []
                            for (var num = 0; num < 4; num++) {
                                if (num == 0) {
                                    var xAdjustment = (this.coverage[props.id][point].width / 2)
                                    var zAdjustment = (this.coverage[props.id][point].depth / 2)
                                } else if (num == 1) {
                                    var xAdjustment = (this.coverage[props.id][point].width / 2) * -1
                                    var zAdjustment = (this.coverage[props.id][point].depth / 2)
                                } else if (num == 2) {
                                    var xAdjustment = (this.coverage[props.id][point].width / 2)
                                    var zAdjustment = (this.coverage[props.id][point].depth / 2) * -1
                                } else if (num == 3) {
                                    var xAdjustment = (this.coverage[props.id][point].width / 2) * -1
                                    var zAdjustment = (this.coverage[props.id][point].depth / 2) * -1
                                }
                                results.push(CoverageAt({
                                    diode: tempDiode,
                                    x: this.coverage[props.id][point].position.x + xAdjustment,
                                    y: this.coverage[props.id][point].position.y,
                                    z: this.coverage[props.id][point].position.z + zAdjustment,
                                }))
                            }
                            var averageOf = (results.reduce((a, b) => a + b, 0)) / results.length
                            this.coverage[props.id][point].lightSources.push(tempDiode)

                            this.coverage[props.id][point].lumensPsqm += averageOf
                        }
                    })
                    // for (var diode = 0; diode < this.lights[light].leds.diodes.length; diode++) {}
                this.coverage[props.id][point].lumens = this.coverage[props.id][point].lumensPsqm * ((this.coverage[props.id][point].width * this.coverage[props.id][point].depth))
            }
            var str = '<div class="floorGridData" id="' + this.coverage[props.id][point].id + 'data"><div class="data">Lux: ' + Math.round(this.coverage[props.id][point].lumensPsqm) + '</div><div class="data">Lumens: ' + Math.round(this.coverage[props.id][point].lumens) + '</div></div>'
            $("#" + this.coverage[props.id][point].id).append(str)
        }
        var highestNum = 0
        for (var point = 0; point < this.coverage[props.id].length; point++) {
            if (this.coverage[props.id][point].lumensPsqm > highestNum) {
                highestNum = this.coverage[props.id][point].lumensPsqm
            }
        }
        for (var point = 0; point < this.coverage[props.id].length; point++) {
            if (highestNum > 0) {
                if (this.coverage[props.id][point].id.indexOf('X1Y1Z0') >= 0) {}

                $('#' + this.coverage[props.id][point].scene.id + ' #' + this.coverage[props.id][point].id + ' > .faceParent > .face').css({
                    // background	: '#ffffff',
                    opacity: this.coverage[props.id][point].lumensPsqm / (highestNum * 2)
                })
            } else {
                $('#' + this.coverage[props.id][point].scene.id + ' #' + this.coverage[props.id][point].id + ' > .faceParent > .face').css({
                    // background	: '#ffffff',
                    opacity: 1
                })

            }
        }



    }
    if (props.lights !== undefined) {
        for (i = 0; i < props.lights.length; i++) {
            this.lights[props.lights[i].id] = props.lights[i]
        }
    } else if (opts.lights !== undefined) {
        for (i = 0; i < opts.lights.length; i++) {
            this.lights[opts.lights[i].id] = opts.lights[i]
        }
    }

}

function GrowLight(props, opts) {
    // Object.assign(this, new GrowLightSchema({
    //
    // }))
    this.height = props.height || 0.06
    this.width = props.width || .83
    this.depth = props.depth || .26
    this.unit = props.unit || "m"

    // properties
    this.wattage = props.wattage || 600
    this.price = props.price
    this.leds = props.leds
    this.spectrum = props.spectrum
    this.switches = props.switches || []
    this.fans = props.fans
    this.hangHeight = props.hangHeight || (Math.sqrt(this.wattage) * 3.5)
    this.name = props.name || "Growlight"

    this.class = props.class || 'growlight'
    jsonConcat(this, props)
    this.id = props.id || uuidv4()
    this._id = props._id || undefined
    this.uuid = props.uuid || uuidv4()
    var defaultPosition = {
        x: 0,
        y: 0,
        z: 0,
        unit: "cm",
        type: "center"
    }
    this.position = props.position || defaultPosition
    jsonConcat(this.position, defaultPosition)
    this.group = props.group || {
        id: this.uuid + 'growLight-container',
        class: 'growLight-container'
    }
    this.minPxWidth = props.minPxWidth
    this.object = props.object || {}
    if (props.object) jsonConcat(this.object, props.object)
    this.wattageFormatted = function() {
        return this.wattage + "W"
    }
    this.makeDiodes = function(props) {
        if (!this.leds) {
            this.fillLedData()
        }
        if (!props) {
            var props = {}
        }
        this.leds.diodes = []
        var diodeCount = this.leds.ammount
        currentType = 0
        quotaFilled = 0
        randomLedPositions = []
        number = 0
        while (randomLedPositions.length < diodeCount) {
            if (randomLedPositions.indexOf(number) < 0) {
                randomLedPositions.push(number)
                this.leds.diodes.push(undefined)
            }
            number = Math.ceil(Math.random() * diodeCount - 1)
        }
        for (var i = 0; i < this.leds.ammount; i++) {
            // if(i == 0){
            // }
            if (i == Math.ceil(((this.spectrum[currentType].percent) * diodeCount) + quotaFilled)) {
                quotaFilled += (this.spectrum[currentType].percent) * diodeCount
                currentType++


            }
            // Loops through all possible z axis positions of a diode and places
            // the diode at an x position inside a z position group of options which matches the randomLedPosition[i] spot
            for (z = 0; z < this.leds.layout.zNum; z++) {
                if ((randomLedPositions[i] < (this.leds.layout.xNum * z) + this.leds.layout.xNum)) {
                    var position = {}
                    position = {
                        x: ((((this.leds.layout.xNum * (z + 1)) - (randomLedPositions[i]) - 1) * this.leds.layout.xPadding) + this.leds.layout.xOffset),
                        z: (z * this.leds.layout.zPadding) + this.leds.layout.zOffset,
                        y: 0,
                        unit: this.leds.layout.unit || this.unit,
                        type: "center"
                    }
                    if (position.x < (this.width / 2)) {
                        position.pox = -(this.width / 2) + position.x
                    } else {
                        position.pox = position.x - (this.width / 2)
                    }
                    if (position.z < (this.depth / 2)) {
                        position.poz = -(this.depth / 2) + position.z
                    } else {
                        position.poz = position.z - (this.depth / 2)
                    }
                    position.sox = this.position.x + position.pox
                    position.soz = this.position.z + position.poz

                    var led = new Diode({
                        wavelength: this.spectrum[currentType].nm || this.spectrum[currentType].wavelength,
                        nm: this.spectrum[currentType].nm || this.spectrum[currentType].wavelength,
                        temperature: this.spectrum[currentType].temperature,
                        colour: this.spectrum[currentType].colour,
                        angle: this.spectrum[currentType].lensAngle,
                        percent: this.spectrum[currentType].percent,
                        ppfd: this.spectrum[currentType].ppfd,
                        photons: this.spectrum[currentType].photons,
                        wattage: this.spectrum[currentType].wattage,
                        wattagePsqm: this.spectrum[currentType].wattagePsqm,
                        lumens: this.spectrum[currentType].lumens,
                        lux: this.spectrum[currentType].lux,
                        id: "diodeC" + i + "d" + randomLedPositions[i] + "x" + Math.round(position.x / this.leds.layout.xPadding) + "z" + Math.round(position.z / this.leds.layout.zPadding) + "R" + Math.ceil(Math.random() * 100),
                        ammount: Math.round((this.spectrum[currentType].percent) * diodeCount),
                        position: position,
                        render: props.render,
                        parent: this,
                        type: '3d',
                        sizeSelf: false,
                        width: this.leds.width,
                        depth: this.leds.depth,
                        height: this.leds.height || this.leds.width,
                        unit: this.leds.unit || this.unit,
                        number: randomLedPositions[i],
                        renderLabel: props.renderLabels || false
                    })
                    this.leds.diodes[randomLedPositions[i]] = led

                    break
                }
            }
        }

    }
    this.getPosition = function(i) {
        if ((this.leds.x * 100 / this.leds.padding.x) * (this.leds.z * 100 / this.leds.padding.z)) {

        }
        for (x = 0; x < this.leds.x * 100 / this.leds.padding.x; x++) {
            for (z = 0; z < this.leds.z; z++) {

            }
        }
    }
    this.fillLedData = function() {
        if (this.leds) {
            if (this.leds.layout.unit == "m") {
                this.leds.layout.unitScale = 1
            } else if (this.leds.layout.unit == "cm") {
                this.leds.layout.unitScale = 100
            } else if (this.leds.layout.unit == "mm") {
                this.leds.layout.unitScale = 1000
            } else if (this.leds.layout.unit == "um") {
                this.leds.layout.unitScale = 10000
            } else {
                this.leds.layout.unitScale = 1
            }
            if (this.leds.unit == "m") {
                this.leds.unitScale = 1
            } else if (this.leds.unit == "cm") {
                this.leds.unitScale = 100
            } else if (this.leds.unit == "mm") {
                this.leds.unitScale = 1000
            } else if (this.leds.unit == "um") {
                this.leds.unitScale = 10000
            } else {
                this.leds.unitScale = 1
            }

            if (this.leds.layout.xNum !== undefined && this.leds.layout.zNum == undefined) {
                this.leds.layout.zNum = Math.ceil(this.leds.ammount / this.leds.layout.xNum)
            } else if ((this.leds.layout.xNum == undefined && this.leds.layout.zNum) !== undefined) {
                this.leds.layout.xNum = Math.ceil(this.leds.ammount / this.leds.layout.zNum)
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
                            this.leds.layout.xNum = Math.ceil(this.leds.ammount / this.leds.layout.zNum)
                        }
                    }
                    // Do this at some other stage
                }
                /*
                 */
            }
            if ((this.leds.layout.width && this.leds.layout.depth) == undefined) {
                if ((this.leds.layout.xNum && this.leds.layout.zNum)) {
                    if (this.leds.layout.xPadding && this.leds.layout.zPadding) {
                        this.leds.layout.width = this.leds.layout.xPadding * (this.leds.layout.xNum - 1)
                        this.leds.layout.xOffset = (((this.width / this.unitScale) - (this.leds.layout.width / this.leds.layout.unitScale)) * this.leds.layout.unitScale) / 2
                        this.leds.layout.depth = this.leds.layout.zPadding * (this.leds.layout.zNum - 1)
                        this.leds.layout.zOffset = (((this.depth / this.unitScale) - (this.leds.layout.depth / this.leds.layout.unitScale)) * this.leds.layout.unitScale) / 2
                    } else {
                        this.leds.layout.xPadding = ((this.width / this.unitScale) / (this.leds.layout.xNum + 1)) * this.leds.layout.unitScale
                        this.leds.layout.zPadding = ((this.depth / this.unitScale) / (this.leds.layout.zNum + 1)) * this.leds.layout.unitScale
                        this.leds.layout.width = this.leds.layout.xPadding * (this.leds.layout.xNum - 1)
                        this.leds.layout.xOffset = (((this.width / this.unitScale) - (this.leds.layout.width / this.leds.layout.unitScale)) * this.leds.layout.unitScale) / 2
                        this.leds.layout.depth = this.leds.layout.zPadding * (this.leds.layout.zNum - 1)
                        this.leds.layout.zOffset = (((this.depth / this.unitScale) - (this.leds.layout.depth / this.leds.layout.unitScale)) * this.leds.layout.unitScale) / 2
                    }
                }
            }
        } else {
            this.leds = this.ledData()
        }
    }
    this.coverageAt = function(props) {
            if (!props) var props = {}
            var lensAngle = props.lensAngle || this.lensAngle || 120
            hangHeight = props.hangHeight || this.hangHeight
            coverageUnit = props.unit || this.unit
            if (props.dimension) {
                if (props.dimension == 'x') {
                    return (this.width / (l3.ai.unitScale(this.unit)) + ((Math.atan(d2r(lensAngle / 2)) * hangHeight) / l3.ai.unitScale(coverageUnit)) * 2) * l3.ai.unitScale(coverageUnit)
                } else if (props.dimension == 'z') {
                    return (this.depth / (l3.ai.unitScale(this.unit)) + ((Math.atan(d2r(lensAngle / 2)) * hangHeight) / l3.ai.unitScale(coverageUnit)) * 2) * l3.ai.unitScale(coverageUnit)
                } else {
                    return (Math.atan(d2r(lensAngle / 2)) * hangHeight) * 2
                }
            } else {
                return (Math.atan(d2r(lensAngle / 2)) * hangHeight) * 2
            }
        }
        /// LOPU3D STUFF
    this.renderObject = function(props) {
        this.object = new Cube({
            height: props.height || this.height,
            width: props.width || this.width,
            depth: props.depth || this.depth,
            unit: props.unit || this.unit,
            render: props.render || this.render,
            ratio: props.ratio || this.object.ratio || this.ratio || this.scene.ratio,
            id: uuidv4(),
            scene: props.scene || this.scene,
            position: props.position || this.position,
            parent: props.parent || this.parent,
            sizeSelf: props.sizeSelf || this.sizeSelf,
            class: props.class || this.class,
            group: props.group || this.group,
            type: this.object.type || props.type || '3d',
            sides: props.sides || this.sides,
            data: props.data || this.data,
            minPxWidth: props.minPxWidth || this.minPxWidth,
            datas: props.datas || this.datas || [{
                    property: "title",
                    value: this.title
                },
                {
                    property: "_id",
                    value: this._id
                }
            ]
        })
        this.position = this.object.position
    }
    this.renderLabels = function(labels) {
        labels.forEach((labelObj, label) => {
            var value
            if (typeof(this[labels[label]]) == 'function') {
                value = '<div class="labelValue">' + this[labels[label]]() + '</div>'
            } else if (!this[labels[label]]) {
                value = labels[label].replace(/-/g, ' ')
            } else {
                value = '<div class="labelValue">' + this[labels[label]] + '</div>'
            }
            if (this.object.labels.indexOf(label) < 0) {
                if (labels[label] == 'wattageFormatted') {
                    value = value.concat('<div class="draw-info">draw</div>')
                    var labelToPush = new Cube({
                        unit: "cm",
                        id: uuidv4() + labels[label] + "Label",
                        class: "light-label " + labels[label],
                        parent: this.object,
                        group: {
                            positioner: true,
                            id: this.uuid + "dataLabels",
                            class: "dataLabels"
                        },
                        sides: [],
                        data: {
                            text: value,
                            do: "openModal('" + this._id + "Modal')"
                        }
                    })
                } else if (labels[label] !== 'see-the-light') {
                    var labelToPush = new Cube({
                        unit: "cm",
                        id: uuidv4() + labels[label] + "Label",
                        class: "light-label " + labels[label],
                        parent: this.object,
                        group: {
                            positioner: true,
                            id: this.uuid + "dataLabels",
                            class: "dataLabels"
                        },
                        sides: [],
                        data: {
                            text: value,
                            do: "openModal('" + this._id + "Modal')"
                        }
                    })
                    $('#' + this.object.group.object.id + " .see-the-light").bind('click', { obj: this }, function(e) {
                        if (e.data.obj.object.group.object.transformString == undefined) {
                            var oldTransformString = 'translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)'
                            var oldLabelTransformString = 'translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)'
                        } else {
                            oldTransformString = e.data.obj.group.object.transformString
                            var oldLabelTransformString = 'translate3d(0px, 0px, 0px) rotateX(-90deg) rotateY(0deg) rotateZ(0deg)'
                        }
                        if (e.data.obj.seeingTheLight) {
                            var newTransformString = 'translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)'
                            e.data.obj.object.group.object.transformString = newTransformString
                            e.data.obj.seeingTheLight = false
                            var newLabelTransformString = 'translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)'
                            var labelZIndex = 104
                            e.data.obj.switchSpectrum({ modes: "all" })
                        } else {
                            var newTransformString = 'translate3d(0px, ' + ((((e.data.obj.hangHeight / e.data.obj.unitScale) / 2) - (((e.data.obj.height / 8)) / e.data.obj.unitScale)) * -1) * e.data.obj.object.scene.pxr + 'px, 0px) rotateX(90deg) rotateY(0deg) rotateZ(0deg)'
                            e.data.obj.object.group.object.transformString = newTransformString
                            e.data.obj.seeingTheLight = true
                            var newLabelTransformString = 'translate3d(0px, ' + (((e.data.obj.hangHeight + e.data.obj.height) / e.data.obj.unitScale) + 0.05) * e.data.obj.object.scene.pxr + 'px,0px) rotateX(-90deg) rotateY(0deg) rotateZ(0deg)'
                            var labelZIndex = 400
                            e.data.obj.switchSpectrum({ modes: [] })
                        }
                        var transInterObj = d3.interpolateString(oldTransformString, newTransformString)
                        var growLightGroup = d3.select($("#" + e.data.obj.group.object.id).get(0))
                        growLightGroup
                            .transition()
                            .duration(1500)
                            .styleTween('transform', function(d) {
                                return transInterObj
                            })
                        var transInterLabel = d3.interpolateString(oldLabelTransformString, newLabelTransformString)
                        var label = d3.select($('#' + e.data.obj.group.object.id + " .see-the-light").get(0))
                        label
                            .transition()
                            .duration(800)
                            // .style('z-index', labelZIndex)
                            .styleTween('transform', function(d) {
                                return transInterLabel
                            })
                        $('#' + e.data.obj.group.object.id + " .see-the-light").toggleClass('active')
                    })
                } else {
                    var labelToPush = new Cube({
                        unit: "cm",
                        id: uuidv4() + labels[label] + "Label",
                        class: "light-label " + labels[label],
                        parent: this.object,
                        group: {
                            positioner: true,
                            id: this.uuid + "dataLabels",
                            class: "dataLabels"
                        },
                        sides: [],
                        data: {
                            text: value,
                        }
                    })
                }
                this.object.labels.push(labelToPush)
            }
        })

    }

    this.renderSwitches = function(modes) {
        var modes = modes || this.modes
        this.modes = []
        modes.forEach((modeObj, mode) => {
            this.switches.push(
                new Cube({
                    width: 12,
                    height: (this.height / this.unitScale) * 100,
                    depth: 1,
                    unit: "cm",
                    type: "center",
                    id: uuidv4() + "mode-switch",
                    class: "mode-switch",
                    parent: this.object,
                    group: {
                        positioner: true,
                        id: this.uuid + "mode-switches",
                        class: "mode-switches"
                    },
                    data: {
                        text: '<div id="' + this.uuid + '-spectrum-switches" class="material-toggle spectrum-switches ' + modes[mode] + '-toggle-container"> <div class="light-btn-label ' + modes[mode] + '-spectrum">' + modes[mode] + '</div><input type="checkbox", id="' + this.uuid + '-' + modes[mode] + '-toggle", name="' + this.uuid + '-' + modes[mode] + '-toggle", checked=true></input><label id="' + this.uuid + modes[mode] + 'label", for="' + this.uuid + '-' + modes[mode] + '-toggle", class="' + modes[mode] + '-label spectrum-label"></label></div>'
                    }

                })
            )
            this.modes[modes[mode]] = true
            $('#' + this.uuid + modes[mode] + 'label').bind('click', { obj: this }, function(e) {
                var mode = e.target.className.split('-')[0]
                e.data.obj.modes[mode] = !e.target.control.checked
                e.data.obj.switchSpectrum()
            })
        })

    }
    this.renderLight = function(props) {
        if (!props) var props = {}
        this.light = {}
        this.lightEdgeOffset = 2
        edgeOffset = this.lightEdgeOffset
        filled = 0
        emitWidth = this.width - edgeOffset
        this.hangHeight = props.hangHeight || this.hangHeight || this.wattage / 6 || 60
            // var totalCoverage = ((Math.sqrt(Math.pow(Math.tan(d2r(lensAngle / 2)), 2)) * this.hangHeight) * 2) + emitWidth
        var zIndex = props.zIndex || 14
        var center = true
        var paths = []
        var backBoostPaths = []
        var maxLensAngle = 0
        this.spectrum.forEach((wavelength, index) => {
            if (wavelength.lensAngle > maxLensAngle) maxLensAngle = wavelength.lensAngle
        })
        this.light.totalWidth = ((Math.sqrt(Math.pow(Math.tan(d2r(maxLensAngle / 2)), 2)) * this.hangHeight) * 2) + emitWidth
        var totalWidth = this.light.totalWidth
        this.light.offsetWidth = (totalWidth - emitWidth) / 2
        var offsetWidth = this.light.offsetWidth
        var incrOpac = .15
        this.spectrum.forEach((wavelengthIter, index) => {
            var wavelength = wavelengthIter
            var nm = wavelength.wavelength || wavelength.temperature
            var lensAngle = props.lensAngle || wavelength.lensAngle || this.lensAngle || 120
            var lightOpacity = wavelength.lightOpacity || 0.6
            var addedClass = ''
            var rgb = [200, 200, 200]
            if (wavelength.percent !== 'auto') {
                var percent = wavelength.percent
            } else if (wavelength.percent == 'auto') {
                var percent = 1 / this.spectrum.length
            }
            if (this.centerOutWavelengths) {
                if ((index + 1) < (this.spectrum.length / 2)) {
                    zIndex = zIndex + 1
                } else if ((index + 1) >= (this.spectrum.length / 2)) {
                    if (center == true) {
                        zIndex = zIndex + 1
                        var pathComposite = 'source-over'
                        center = false
                    } else {
                        zIndex = zIndex - 1
                        var pathComposite = 'destination-over'
                    }
                }
            } else {
                zIndex++
            }
            if (nm < 1000) {
                nm = 'nm' + nm
                if (grow.ai.wavelengthColourCodes[nm]) {
                    rgb = grow.ai.wavelengthColourCodes[nm].rgbObj
                    var rgbString = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + lightOpacity + ')'
                }

            } else if (nm > 1000) {
                nm = 'k' + nm
                if (grow.ai.wavelengthColourCodes[nm]) {
                    rgb = grow.ai.wavelengthColourCodes[nm].rgbObj
                    var rgbString = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + lightOpacity + ')'
                }
            } else {
                if (grow.ai.wavelengthColourCodes[nm]) {
                    rgb = grow.ai.wavelengthColourCodes[nm].rgbObj
                    var rgbString = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + lightOpacity + ')'
                } else {
                    var rgbString = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + lightOpacity + ')'
                }
            }
            if (this.backBoost) {
                addedClass = ' backBoosted'
                if (nm == 'Green') {
                    var rgbString = rgbString.replace(/,.{3}\)/, ',0.7)')
                    var backBoostRgbString = rgbString.replace(/,.{3}\)/, ',0.4)')
                    paths.push({
                        points: [
                            { x: offsetWidth + (emitWidth * filled), y: 0 },
                            { x: offsetWidth + (emitWidth * filled) + ((emitWidth) * percent), y: 0 },
                            { x: offsetWidth + (emitWidth * filled) + ((emitWidth * percent) + (Math.sqrt(Math.pow(Math.tan(d2r(lensAngle / 2)), 2)) * this.hangHeight)), y: this.hangHeight },
                            { x: offsetWidth + (emitWidth * filled) + ((Math.sqrt(Math.pow(Math.tan(d2r(lensAngle / 2)), 2)) * this.hangHeight) * -1), y: this.hangHeight }
                        ],
                        fillStyle: backBoostRgbString,
                        composite: 'destination-over',
                        zIndex: 13,
                        countOnHover: false,
                        wavelength: nm,
                        id: uuidv4()
                    })

                } else {
                    var backBoostRgbString = rgbString.replace(/,.{3}\)/, ',0.8)')
                    var rgbString = rgbString.replace(/,.{3}\)/, ',' + incrOpac + ')')
                    incrOpac += 0.15
                    backBoostPaths.push({
                        points: [
                            { x: offsetWidth + (emitWidth * filled), y: 0 },
                            { x: offsetWidth + (emitWidth * filled) + ((emitWidth) * percent), y: 0 },
                            { x: offsetWidth + (emitWidth * filled) + ((emitWidth * percent) + (Math.sqrt(Math.pow(Math.tan(d2r(lensAngle / 2)), 2)) * this.hangHeight)), y: this.hangHeight },
                            { x: offsetWidth + (emitWidth * filled) + ((Math.sqrt(Math.pow(Math.tan(d2r(lensAngle / 2)), 2)) * this.hangHeight) * -1), y: this.hangHeight }
                        ],
                        fillStyle: backBoostRgbString,
                        composite: 'destination-over',
                        zIndex: 13,
                        countOnHover: false,
                        wavelength: nm,
                        id: uuidv4()
                    })
                }
                paths.push({
                    points: [
                        { x: offsetWidth + (emitWidth * filled), y: 0 },
                        { x: offsetWidth + (emitWidth * filled) + ((emitWidth) * percent), y: 0 },
                        { x: offsetWidth + (emitWidth * filled) + ((emitWidth * percent) + (Math.sqrt(Math.pow(Math.tan(d2r(lensAngle / 2)), 2)) * this.hangHeight)), y: this.hangHeight },
                        { x: offsetWidth + (emitWidth * filled) + ((Math.sqrt(Math.pow(Math.tan(d2r(lensAngle / 2)), 2)) * this.hangHeight) * -1), y: this.hangHeight }
                    ],
                    fillStyle: rgbString,
                    composite: pathComposite,
                    zIndex: zIndex,
                    countOnHover: true,
                    wavelength: nm,
                    id: uuidv4()

                })

            } else {
                paths.push({
                    points: [
                        { x: offsetWidth + (emitWidth * filled), y: 0 },
                        { x: offsetWidth + (emitWidth * filled) + ((emitWidth) * percent), y: 0 },
                        { x: offsetWidth + (emitWidth * filled) + ((emitWidth * percent) + (Math.sqrt(Math.pow(Math.tan(d2r(lensAngle / 2)), 2)) * this.hangHeight)), y: this.hangHeight },
                        { x: offsetWidth + (emitWidth * filled) + ((Math.sqrt(Math.pow(Math.tan(d2r(lensAngle / 2)), 2)) * this.hangHeight) * -1), y: this.hangHeight }
                    ],
                    fillStyle: rgbString,
                    composite: pathComposite,
                    zIndex: zIndex,
                    countOnHover: true,
                    wavelength: nm,
                    id: uuidv4()

                })
            }

            filled += (percent)
        })
        if (this.backBoost) { backBoostPaths.forEach(path => { paths.push(path) }) }
        this.light.object = new Cube({
            sides: [],
            height: this.hangHeight,
            width: emitWidth,
            unit: this.unit,
            group: {
                id: this.uuid + 'growLight-container',
                class: 'growLight-container'
            },
            id: uuidv4(),
            parent: this.object.parent,
            position: this.width / 2,
            scene: this.object.scene,
            class: 'light',
            type: 'canvas',
            canvas: {
                type: 'polygons',
                paths: paths,
                size: {
                    width: true,
                    height: true
                },
                width: totalWidth
            }
        })
        var light = this.light

        function showWavelengthLabel(e) {
            var mouseX = parseInt(e.offsetX)
            var mouseY = parseInt(e.offsetY)
            var hoveredPath = l3.ai.findCurrentPath({ mouse: { x: mouseX, y: mouseY }, paths: light.object.canvas.paths })
            if (hoveredPath) {
                var elem = $("#" + light.object.id + ' .' + hoveredPath.wavelength)
                elem.css('opacity', 1)
                for (path in light.object.canvas.paths) {
                    var paths = light.object.canvas.paths
                    if (paths.hasOwnProperty(path)) {
                        var curPath = paths[path]
                        if (curPath.id !== hoveredPath.id) {
                            var tmpElem = $("#" + light.object.id + ' .' + curPath.wavelength)
                            tmpElem.css('opacity', 0)
                        }
                    }
                }
            } else {
                setTimeout(
                    () => {
                        for (path in light.object.canvas.paths) {
                            var paths = light.object.canvas.paths
                            if (paths.hasOwnProperty(path)) {
                                var curPath = paths[path]
                                var tmpElem = $("#" + light.object.id + ' .' + curPath.wavelength)
                                tmpElem.css('opacity', 0)
                            }
                        }
                    }, 300
                )
            }
        }
        this.light.object.canvas.canvas.onmousemove = showWavelengthLabel

        var filled = 0
        this.spectrum.forEach((wavelength, index) => {
            var nm = wavelength.wavelength || wavelength.temperature
            var origNm = nm
            var type = l3.propToString(wavelength, nm)
            if (nm < 1000) {
                nm = 'nm' + nm
                origNm = origNm + 'nm'
            } else if (nm > 1000) {
                nm = 'k' + nm
                origNm = origNm + 'k'
            }
            if (wavelength.percent !== 'auto') {
                var percent = wavelength.percent
            } else if (wavelength.percent == 'auto') {
                var percent = 1 / this.spectrum.length
            }
            var str = '<div class="wavelengthLabel">  <span class="valueLabel">' + type + ': </span><span class="value wavelength">' + origNm + ' </span> </div><div class="wavelengthLabel"> <span class="value percent"> ' + (percent * 100).toFixed(1) + '</span><span class="valueLabel">%</span>  </div> <div class="wavelengthLabel"> <span class="value wattagePercent"> ' + ((percent) * this.wattage).toFixed(1) + '</span><span class="valueLabel">W</span>  </div>'
            new Cube({
                id: uuidv4(),
                class: 'wavelengthLabelObj ' + nm,
                parent: this.light.object,
                sides: [],
                unit: 'cm',
                position: {
                    x: (filled * emitWidth) + ((this.object.width - emitWidth) / 2) + ((emitWidth * wavelength.percent) / 2)
                },
                group: {
                    class: 'spectrumLabels',
                    id: this.light.object.id + 'spectrumLabels'
                },
                data: {
                    text: str
                }
            })
            filled = filled + wavelength.percent
        })
    }
    this.switchSpectrum = function(props) {
        if (props) {
            var mode = props.mode
            on = props.on
            if (props.modes !== "all") {
                this.modes.forEach((modeObj, index) => {
                    this.modes[mode] = false
                })
                props.modes.forEach((modeObj, index) => {
                    this.modes[mode] = true
                })
            } else {
                this.modes.forEach((modeObj, index) => {
                    this.modes[mode] = true
                })
            }
        } else {
            var props = {}
        }
        if (this.light) {
            var totalPercent = 0
            edgeOffset = this.lightEdgeOffset
            filled = 0
            emitWidth = this.width - edgeOffset
            this.hangHeight = this.hangHeight || props.hangHeight || this.wattage / 6 || 60
            highestPercentage = 0
            this.spectrum.forEach((wavelengthObj, wavelength) => {
                var totalWavelengthPercent = 0
                if (this.spectrum[wavelength].modes) {
                    this.spectrum[wavelength].modes.forEach((modeObj, modeCount) => {
                        if (this.modes[this.spectrum[wavelength].modes[modeCount].title]) {
                            if (totalWavelengthPercent + this.spectrum[wavelength].modes[modeCount].percent !== 'auto') {
                                if ((totalWavelengthPercent + this.spectrum[wavelength].modes[modeCount].percent) <= this.spectrum[wavelength].percent) {
                                    totalWavelengthPercent += this.spectrum[wavelength].modes[modeCount].percent
                                    totalPercent += this.spectrum[wavelength].modes[modeCount].percent

                                }
                                if (totalWavelengthPercent > highestPercentage) {
                                    highestPercentage = totalWavelengthPercent
                                }
                            }

                        }
                    })
                } else {
                    totalPercent = 1
                    highestPercentage = totalPercent / this.spectrum.length
                }
            })
            var newPaths = []
            if (totalPercent == 0) {
                if (this.light.object.canvas.paths) {
                    this.light.object.canvas.paths.forEach((path, index) => {
                        var newPath = {}
                        jsonConcat(newPath, path)
                        newPath.points = [
                            { x: path.points[0].x, y: path.points[0].y },
                            { x: path.points[1].x, y: path.points[1].y },
                            { x: path.points[1].x - ((path.points[1].x - path.points[0].x) / 1.5), y: 0 },
                            { x: path.points[1].x - ((path.points[1].x - path.points[0].x) / 2.5), y: 0 }
                        ]

                        newPaths.push(newPath)
                    })
                }
            } else {
                var allNewPoints = []
                this.spectrum.forEach((wavelength, index) => {
                    if (this.backBoost) addedClass = ' backBoosted'
                    var lensAngle = wavelength.lensAngle
                    var rgb = [200, 200, 200]
                    var nm = wavelength.wavelength || wavelength.temperature
                    var addedClass = ''
                    var lightOpacity = wavelength.lightOpacity
                    var lensAngle = wavelength.lensAngle || this.lensAngle || props.lensAngle || 120
                    var pointsStr = ''
                    var percent = 0
                    if (nm < 1000) {
                        nm = 'nm' + nm
                        if (grow.ai.wavelengthColourCodes[nm]) {
                            rgb = grow.ai.wavelengthColourCodes[nm].rgbObj
                            var rgbString = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + lightOpacity + ')'
                        }

                    } else if (nm > 1000) {
                        nm = 'k' + nm
                        if (grow.ai.wavelengthColourCodes[nm]) {
                            rgb = grow.ai.wavelengthColourCodes[nm].rgbObj
                            var rgbString = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + lightOpacity + ')'
                        }
                    } else {
                        if (grow.ai.wavelengthColourCodes[nm]) {
                            rgb = grow.ai.wavelengthColourCodes[nm].rgbObj
                            var rgbString = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + lightOpacity + ')'
                        } else {
                            var rgbString = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + lightOpacity + ')'
                        }
                    }
                    // Quickly sum up the percentage contribution of all "modes" of this wavelength
                    if (wavelength.modes) {
                        wavelength.modes.forEach((modeObj, modeCount) => {
                            if (this.modes[wavelength.modes[modeCount].title]) {
                                if ((percent + wavelength.modes[modeCount].percent) <= wavelength.percent) {
                                    percent += wavelength.modes[modeCount].percent
                                }
                            }
                        })
                    } else {
                        if (wavelength.percent !== 'auto') {
                            percent = 1 / this.spectrum.length
                        } else {
                            percent = wavelength.percent
                        }
                    }
                    var newPoints = [
                        { x: this.light.offsetWidth + (emitWidth * filled), y: 0 },
                        { x: this.light.offsetWidth + (emitWidth * filled) + ((emitWidth) * (percent / totalPercent)), y: 0 },
                        { x: this.light.offsetWidth + (emitWidth * filled) + ((emitWidth * (percent / totalPercent)) + (Math.tan(d2r(lensAngle / 2)) * this.hangHeight)), y: this.hangHeight },
                        { x: this.light.offsetWidth + (emitWidth * filled) + ((Math.tan(d2r(lensAngle / 2)) * this.hangHeight) * -1), y: this.hangHeight },
                    ]

                    allNewPoints.push(newPoints)
                    var percentElement = d3.select($("#" + this.light.object.children[index].id + " .percent").get(0))
                    percentElement.html(((percent / totalPercent) * 100).toFixed(1))
                    var wattagePercentElement = d3.select($("#" + this.light.object.children[index].id + " .wattagePercent").get(0))
                    wattagePercentElement.html(((percent) * this.wattage).toFixed(1))

                    filled += (percent / totalPercent)
                })
                if (this.backBoost) {
                    allNewPoints.forEach(point => {
                        allNewPoints.push(point)
                    })
                }
                this.light.object.canvas.paths.forEach((path, pathIndex) => {
                    var newPath = {}
                    jsonConcat(newPath, path)
                    newPath.points = allNewPoints[pathIndex]
                    newPaths.push(newPath)
                })
            }
            if (this.light.object.canvas.paths) {
                if (totalPercent !== 0) {
                    this.light.object.redraw({
                        transition: {
                            duration: 500,
                            ease: d3.easeCubic
                        },
                        canvas: {
                            paths: newPaths
                        }
                    })
                } else if (totalPercent == 0) {
                    this.light.object.redraw({
                        transition: {
                            duration: 500,
                            ease: d3.easeCubic
                        },
                        canvas: {
                            paths: newPaths
                        }
                    })

                } else {
                    this.light.object.redraw({
                        transition: {
                            duration: 500,
                            ease: d3.easeCubic
                        },
                        canvas: {
                            paths: newPaths
                        }
                    })
                }
            }
            d3.select($("#" + this.object.id + " .light-label.wattageFormatted .labelValue").get(0))
                .html(Math.round(this.wattage * totalPercent) + "W")

        }
    }
    this.createCoverageMap = function(props) {
        if (!props) var props = {}
        if (!this.coverageMaps) {
            this.coverageMaps = []
        }
        var coverageMap = {
            unit: props.unit || this.unit || 'cm',
            width: props.width || this.coverageAt({ dimension: 'x' }),
            depth: props.depth || this.coverageAt({ dimension: 'z' }),
            height: props.height,
            xResolution: props.xResolution || props.resolution || 10,
            zResolution: props.zResolution || props.resolution || 10,
            yResolution: props.yResolution || props.resolution || 10,
            map: [],
            type: props.type || '2d',
            uuid: uuidv4(),
            maxLumens: 0
        }
        coverageMap.width = (Math.floor(coverageMap.width / coverageMap.xResolution)) * coverageMap.xResolution
        coverageMap.depth = (Math.floor(coverageMap.depth / coverageMap.zResolution)) * coverageMap.zResolution
        coverageMap.object = new Cube({
            width: coverageMap.width,
            height: 0,
            depth: coverageMap.depth,
            unit: coverageMap.unit,
            type: '2d',
            sides: ['bottom'],
            scene: this.object.scene,
            group: {
                id: this.object.group.id,
                class: 'growLight-container'
            },
            class: 'coverageMap',
            id: uuidv4(),
            position: {
                // z: (((Math.floor(coverageMap.depth / coverageMap.zResolution)) * coverageMap.zResolution) / 2) - (this.depth / 2),
                z: 0,
                x: 0,
                type: 'center',
                unit: coverageMap.unit
            }

        })
        if (props.dimensionLabels) {
            coverageMap.object.children.push(
                new Cube({
                    width: coverageMap.width,
                    height: 5,
                    sides: [],
                    unit: coverageMap.unit,
                    id: uuidv4() + "coverageMapLabel",
                    class: 'coverageMapFullLabel width',
                    data: {
                        text: '<div class="data">' + coverageMap.width + coverageMap.unit + '</div>'
                    },
                    parent: coverageMap.object,
                    position: {
                        rx: -90,
                        y: -3
                    }

                }),
                new Cube({
                    width: coverageMap.width,
                    height: 5,
                    sides: [],
                    unit: coverageMap.unit,
                    id: uuidv4() + "coverageMapLabel",
                    class: 'coverageMapFullLabel depth',
                    data: {
                        text: '<div class="data">' + coverageMap.depth + coverageMap.unit + '</div>'
                    },
                    parent: coverageMap.object,
                    position: {
                        rx: -90,
                        x: (coverageMap.width / 2) * -1,
                        z: (coverageMap.depth / 2) * 1,
                        y: -3
                    }

                })

            )
        }
        for (var x = 0; x <= coverageMap.width - coverageMap.xResolution; x += coverageMap.xResolution) {
            var curX = x
            for (var z = 0; z <= coverageMap.depth - coverageMap.zResolution; z += coverageMap.zResolution) {
                var curZ = z
                if (coverageMap.type == '3d') {
                    for (var y = 0; y <= coverageMap.height - coverageMap.yResolution; y += coverageMap.yResolution) {
                        var curY = y
                            // make a cube of coverage points data
                    }
                } else {
                    var lumens = grow.ai.energyAt({
                        lightUnit: "lumens",
                        target: {
                            x: (curX + (coverageMap.xResolution / 2)) - (coverageMap.width / 2),
                            z: (curZ + (coverageMap.zResolution / 2)) - (coverageMap.depth / 2),
                            unit: coverageMap.unit
                        },
                        lightSource: this
                    })
                    var lux
                    var ppfd
                    if (coverageMap.maxLumens < lumens) {
                        coverageMap.maxLumens = lumens


                    }
                    var area = (coverageMap.xResolution * coverageMap.zResolution)
                    var coverageMapSquare = new Cube({
                        id: uuidv4() + 'coverageMapSquare',
                        class: 'coverageMapSquare d2',
                        width: coverageMap.xResolution,
                        depth: coverageMap.zResolution,
                        height: coverageMap.zResolution,
                        unit: coverageMap.unit,
                        sides: ["bottom"],
                        // scene: this.object.scene,
                        position: {
                            x: curX,
                            z: curZ,
                            unit: coverageMap.unit
                        },
                        type: '2d',
                        parent: coverageMap.object,
                        group: {
                            // positioner: true,
                            id: this.uuid + 'coverageMap',
                            class: 'coverageMap'
                        },
                        data: {
                            lumens: lumens || 0,
                            ppfd: ppfd || 0,
                            lux: lux || 0,
                            area: area
                        }
                    })
                    coverageMap.map.push(coverageMapSquare)
                    var coverageMapSquareData = new Cube({
                        id: uuidv4(),
                        sides: [],
                        class: 'coverageSquareData',
                        data: {
                            text: '<div>X: ' + Math.round(curX + (coverageMap.xResolution / 2)) + coverageMap.unit + ' Z: ' + Math.round(curZ + (coverageMap.zResolution / 2)) + coverageMap.unit + '</div><div>Width: ' + Math.round((coverageMap.xResolution)) + coverageMap.unit + ' Depth: ' + Math.round((coverageMap.zResolution)) + coverageMap.unit + '</div><div class="area">' + (area / (l3.ai.unitScale(coverageMap.unit) * 100)).toFixed(2) + 'm<span class="squared">2</span></div><div>Hang Height: ' + this.hangHeight + this.unit + '</div><div>Lumens: ' + lumens + '</div><div class="lux">Lux: ' + lumens + '</div>',
                            area: area
                        },
                        position: {
                            z: coverageMap.zResolution * 2,
                            x: coverageMap.xResolution / 2,
                            y: -15,
                            rx: -90
                        },
                        parent: coverageMapSquare
                    })

                }
            }
        }
        coverageMap.map.forEach((coverageSquare, index) => {
            var curSquare = coverageSquare
            d3.select($("#" + curSquare.id + ">.bottom").get(0))
                .transition()
                .duration(2000)
                .style('opacity', curSquare.data.lumens / coverageMap.maxLumens)
            d3.select($("#" + curSquare.id + " .coverageSquareData .lux").get(0))
                .html("Lux: " + Math.round((10000 / curSquare.data.area) * curSquare.data.lumens))
        })
    }
    this.renderCoverage = function(props) {
        this.createCoverageMap(props)
    }
    this.ledCount = function() {
        return ((this.wattage * (1 / this.ledEfficiency)) / this.ledWattage)
    }
    this.leds = {
        ammount: this.ledCount() || ((this.wattage * (1 / this.ledEfficiency)) / this.ledWattage) || 30,
        layout: {
            xNum: Math.ceil(Math.sqrt(this.ledCount()) * ((this.width / this.unitScale) * 100) / this.depth),
            zNum: Math.ceil(Math.sqrt(this.ledCount()) * ((this.depth / this.unitScale) * 100) / this.width),
            unit: "cm"
        },
        unit: "cm",
        width: 1,
        depth: 1
    }
    if (this.leds) {
        this.fillLedData()
        this.makeDiodes({ render: false })
    }
    if (this.renderRules) {
        if (this.renderRules.object) {
            if (this.scene) {
                this.renderObject({
                    sides: ['front', 'bottom', 'left', 'right', 'top', 'back'],
                    type: '3d',
                    scene: this.scene || this.object.scene,
                    sizeSelf: true,
                    ratio: props.ratio || this.object.ratio || this.ratio || this.scene.ratio,
                    class: 'growLight ' + this.model + ' ' + this.wattage + 'watts',
                    position: {
                        unit: this.unit
                    }
                })
                if (this.renderRules.switches) {
                    this.renderSwitches()
                }
                if (this.renderRules.light) {
                    this.renderLight()
                }
                if (this.renderRules.labels) {
                    this.renderLabels(this.renderRules.labels)
                        // if (this.object.labels.length < 0) {
                        // }
                }
                if (this.renderRules.diodes) {
                    this.makeDiodes()
                }
            }
        }
        if (this.renderRules.diodeData) {
            this.makeDiodes({ render: false })
        }
    }
    if (opts) {
        if (opts.makeDiodes) {
            this.makeDiodes({ render: false })
        }
    }
}

function Diode(props) {
    this.wavelength = props.wavelength
    this.nm = props.nm
    this.temperature = props.temperature
    this.colour = props.colour
    this.ratio = props.ratio || props.percent
    this.percent = props.percent || props.ratio
    this.angle = props.angle || 120
    this.par = props.par
    this.ppfd = props.ppfd
    this.lumens = props.lumens
    this.lux = props.lux
    this.wattage = props.wattage
    this.wattagePsqm = props.wattagePsqm
    this.ammount = props.ammount || 1
    this.position = {
        x: 0,
        y: 0,
        z: 0,
        unit: "cm",
        type: "center",
        layout: props.layout || props.parent.leds.layout
    }
    jsonConcat(this.position, props.position)
    this.position.unitScale = l3.ai.unitScale(this.position.unit)
    this.parent = props.parent
    this.id = props.id
    this.number = props.number
    this.width = props.width || 0.002
    this.height = props.height || 0.002
    this.depth = props.depth || 0.002
    this.unit = props.unit || "m"
    this.unitScale = l3.ai.unitScale(this.unit)
    if (props.render !== false) {
        this.object = props.object || new Cube({
            width: props.width || .002,
            height: props.height || .002,
            depth: props.depth || .002,
            unit: props.unit || "m",
            position: this.position,
            id: props.id,
            class: props.class || 'diode',
            group: props.group || {
                id: props.parent.object.uuid + "diodes",
                class: 'diodes'
            },
            type: props.type || '3d',
            sides: props.sides || ['front', 'bottom'],
            parent: props.parent.object,
            scene: props.parent.scene || props.scene,
            sizeSelf: props.sizeSelf || false,
            render: props.render
        })
    }
    this.hitsSpot = function(props) {
        /*
        Takes as input coordinates x1,y1,z2 of the point we are calculating where light will hit,
        and also coordinates x2, y2, z2 of the source of the light. If not supplied we check
        if this.coordinates exists and use those values
        */

    }
    this.renderLabel = function(props) {
        if (this.object) {
            this.object.children.push(
                new Cube({
                    width: 30,
                    height: 30,
                    position: {
                        y: -20,
                        rx: -90
                    },
                    id: uuidv4(),
                    class: 'diodeLabel',
                    parent: this.object,
                    data: {
                        text: '<div>  <div>X: ' + this.position.x + ' </div> <div>Z: ' + this.position.z + ' </div>    </div>'
                    },
                    sides: []
                })
            )
            var str = '<div>  <div>  </div>  </div>'
        }
    }
    if (props.renderLabel) {
        this.renderLabel()
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
    var lightHeight = (props.diode.position.oy / props.diode.position.unitScale) - (props.y / props.unitScale)
    if (lightHeight < 0) {
        return 0
    } else {
        var lightCrowZ = (props.diode.position.oz / props.diode.position.unitScale) - (props.z / props.unitScale)
        var lightCrowX = (props.diode.position.ox / props.diode.position.unitScale) - (props.x / props.unitScale)
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
                childNodes[Math.ceil(Math.random() * childNodes.length)];
            svg.insertBefore(element, randomBranch);

            return flower;
        };

        const animateFlowers = branchEndings => {
            const branchesInUse = {};
            let flowers = [];

            const findFreeBranchIdx = () => {
                for (let i = 0; i < branchEndings.length; i++) {
                    const idx = Math.ceil(Math.random() * branchEndings.length);
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
                Math.ceil(window.innerWidth / 2),
                Math.ceil(window.innerHeight / 1.02),
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

// var GrowLightSchema = new Schema({
//     height: {
//         type: Number,
//         default: 0.06
//     },
//     width: {
//         type: Number,
//         default: 0.83
//     },
//     depth: {
//         type: Number,
//         default: 0.26
//     },
//     function() {}
// })

// storage.createCollection('growlights', GrowLightSchema)

// var growlighttt = storage.growlights.add()wLightSchema)

// var growlighttt = storage.growlights.add()
// var growlighttt = storage.growlights.add()
// var growlighttt = storage.growlights.add()
// var growlighttt = storage.growlights.add()
// var growlighttt = storage.growlights.add()