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
		new Node({
			type: "root",
		}),
		new Node({
			type: "hub",
			children: [
				new Node({
					type: "leaf"	
			]
		})
	
	]

	this.history = []


}
