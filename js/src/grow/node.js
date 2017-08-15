function node(props){

	/*
		@type
		- leaf
		- hub
		- flower
		- root
		- seed
	*/
	this.type = props.type || undefined
	this.age = props.age || {
		days 			: 0,
		hours			: undefined,
		minutes		: undefined,
		seconds 	: undefined,
		spawnTime	: {
			days: 5
		}
	}
	this.position = props.position || {
		x: 0,
		y: 0,
		z: 0,
		abs: {
			x: 0,
			y: 0,
			z: 0
		}
	}
	this.parent = props.parent || undefined
	this.growroom = props.growroom || undefined
	this.
	if(this.type == 'seed'){
		this.spawn({
			type: 'hub',
			age: {
				seconds: this.ageToSeconds(this.age),
				spawnTime: 0
			}
		})
	}
	if(this.type == 'hub'){
		for(var i; i <= this.ageToSeconds(this.age); i++){
			if(i == 5*86400)
		}
	}
	this.spawn = function(props){
		this.children.push(new Node({
			type: props.type,

		}))
	}
	this.timeToGrow = function(){
		var parent = this.parent
		if(this.type !== 'seed'){
			var child = true
		}
		else {
			var child = false
		}
		while(child){
			if(this.parent !== undefined){
				if(parent.type == 'seed'){
					return parent.ageToSeconds(parent.age) - this.parent.ageToSeconds(this.parent.age.spawnTime)
				}
				else if(parent.parent !== undefined) {
					parent = parent.parent
				}
			}
		}
	}
	this.ageToSeconds = function(age){

		var seconds = 0
		if(age.seconds !== undefined){
			seconds = age.seconds
		}
		if(age.minutes !== undefined){
			seconds = seconds + age.minutes*60
		}
		if(age.hours !== undefined){
			seconds = seconds + age.hours*60*60
		}
		if(age.days !== undefined){
			seconds = seconds + age.days*24*60*60
		}

		return seconds

	}

	/*
	Schema =
	{
		x: props.position.x || 0,
		y: props.position.y || 0,
		z: props.position.z || 0,
		abs: {
			x: props.position.abs.x || props.position.x || 0,
			y: props.position.abs.y || props.position.y || 0,
			z: props.position.abs.z || props.position.z || 0
		}
	}
	*/
}

var Node = new node({
	age: {
		days: 2,
		hours: 12
	}
})
