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

	this.structure = [
		new Path({
			start: new Node({
				type: "root",

			})
		})
	]

	this.history = []


}
