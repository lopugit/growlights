function node(props){

	/*
		@type
		- leaf
		- hub
		- flower
		- root
	*/
	this.type = props.type

	this.position = {
		x: props.position.x,
		y: props.position.y,
		z: props.position.z,
		abs: {
			x: props.position.abs.x || props.position.x,
			y: props.position.abs.y || props.position.y,
			z: props.position.abs.z || props.position.z
		}
	}
}
