function path(props){

	/*

	*/
	// this.type = props.type

	this.start = props.start
	this.end = props.end

	this.distance = function(){
		return Math.sqrt(
			Math.pow(this.end.position.x - this.start.position.x, 2) +
			Math.pow(this.end.position.y - this.start.position.y, 2) +
			Math.pow(this.end.position.z - this.start.position.z, 2)
		)
	}

}

var Path = new path({
	start: {
		position: {
			x: 0,
			y: 0,
			z: 0
		}
	},
	end: {
		position: {
			x: 0,
			y: 5,
			z: 5
		}
	}

})

console.log(Path.distance())
