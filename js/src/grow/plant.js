function plant(props){

	/*

	*/
	this.type = props.type
	this.sourceTime = props.sourceTime ||
	this.currentTime = props.startTime ||
	this.position = {
		x		: props.position.x,
		y		: props.position.y,
		z		: props.position.z,
	 	abs	: {
			x		: props.positionAbs.x || props.position.x,
			y		: props.positionAbs.y || props.position.y,
			z		: props.positionAbs.z || props.position.z
		}
	}
	this.age = props.age || {
		days: 10
	}
	this.grow = function(growroom){



	}

	if(this.structure == undefined){
		this.structure.seed = new Node({
			type: "seed",
			position: {
				x:0,
				y:0,
				z:0
			},
			age: {
				days: 10,
				spawnTime: {
					seconds: 0
				}
			}
		})
	}
	this.history = []


}

var firstPlant = new Plant({
	age: {
		days: 10
	}
})
