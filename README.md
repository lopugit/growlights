# ozledgrowlights

### Things to do:
### Tick off when complete
### [] incomplete
### [x] complete

## BACK END STUFF ####

#### [ ] Create routes for forum

1. Routes
    1. /forum
    2. /forum/realm/realm/realm/realm (realm can be anything to do with plants and growing)
        1. Realms
            1. General Growing
			2. Journals
            3. Lighting
            4. Tents
            5. Water
            6. Nutrients
			7. Mediums
			8. Plants
				1. Bulbs, Corms, Tubers & Rhizomes
				2. Cacti, Succulents & Caudiciforms
				3. Annuals, Perennials & Biennials
				4. Australian Native Plants
				5. Climbing Plants
				6. Orchids
				7. Roses
				8. Trees & Shrubs 
				9. Plant Propagation
				10. Weeds, Pests & Diseases
				11. What Plant am I?
				12. Edible Plants
					1. Herbs & Spices
					2. Orchard, Fruits & Nuts
					3. Vegetable Garden
			9. Legal
			10. Animals & Birds

## FUNCTION DESIGN

1. [ ] Grow Room optimizer
    1. [ ] Based on number of plants of type X
		1. Will generate a minimum area size required
			1. This is based off of plant data such as space required by plant at X time
		2. Will generate a minimum light strength required
			1. And will position lights in that area
			2. This is based off of plant data such as minimum PAR over the plant size at X time, plant size will be a cube, all PAR values at x,y,z points in that cube will be calculated, then averaged to find the average PAR in that plants area. 
				1. We'll see what numbers this produces and go from there
		3. Optional property is plant yield
			1. This is the point of the forum, to collect plant growing data for yields 
    2. [ ] Based on plant/yield target
		1. Will generate a minimum required lights and their position
		2. If yield is used, generate a minimum required area
		3. If no yield, we require a grow size, or we can still generate all options for 4 plants - 200 plants if it's cucumber or lettuce or something
    3. [ ] Based on lumens/umols/par average per square metre either onto the floor or canopy height
		1. Then requires the grow area size
		2. Generates all combinations of lights that meet this requirement
    4. [ ] Based on grow area
	    1. Either requires target plants
		    1. Or generate a list of all possible plant assortments with required light
		2. Or requires budget to work out what the maximum amount of light can be
			1. Then generates a list of all plants that can be grown with that budget
				1. or the user can specify a target plant

### functions for grow.ai.js
```javascript
function growroom(props){

	//You'll find this prototype already in grow.ai.js

}

function generateLightsForPlants(props){
	// generateLightsForPlants and fillAreaWithLights is basically the same
	props.plants = [
		{
			plant: "plantModel/Schema from mongoDB",
			qty: "quantity of this plant you want to grow (can be either a number, if it's a number we generate the minimum tent size, or if 'max' then you require a provided area",
			targetYield: 'is a target yield in kg, mg, g, or lbs' | undefined,
			targetHarvestTime: 'is a time in seconds, days, or months. If not provided we use the usual harvest time provided by the mongodb plant object' || this.plant.averageHarvestTime,
			tent: 'is either a mongoDb growroom/tent object or undefined by user' | undefined,
			percentOfAreaToUseForPlant: "if you don't want to use the whole tent for growing this plant, specify a percentage, if we achieve the target qty, yield, and light requirements in less area than the tent provided, then we only assign that area to the plant, and the growtent receives room for more plants" || 1

		}
	]

	var days = []

	for(day in targetHarvestTime){
		for(plantGoal in plantGoals){
			if(tent){
				var areaAvailable = plantGoal.tent.area()
			} else {
				var areaAvailable = 0
			}
			var plants = []
			var areaNeeded = 0
			var haveRoom = true
			var canopyHeight = 0
			var numberOfPlants = 0
			for(plant in plantGoal.qty){
				if(haveRoom){
					if(plantGoal.tent){
						if((areaRequired + plantGoal.plant.areaRequiredAt(day)) >= areaAvailable){
							canopyHeight = plantGoal.plant.heightAt(day)
							plants.push(plantGoal.plant)
						}
					} else {
						areaRequired += plantGoal.plant.areaRequiredAt(day)
						canopyHeight = plantGoal.plant.heightAt(day)
						plants.push(plantGoal.plant)

					}
				} else {
					return
				}
				if(plantGoal.tent){
					if(areaAvailable > areaNeeded){
						haveRoom = true
					} else if(areaAvailable <= areaNeeded){
						haveRoom = false
					}
				} else {
					haveRoom = true
				}
			}
		}
		days.push({
			plants: plants,
			areaNeeded: areaNeeded,
			canopyHeight: canopyHeight
		})
	}
}

function fillAreaWithLights(props){
	// generateLightsForPlants and fillAreaWithLights is basically the same
	props.plants = ['Plants']
}
```


## Functions for /forum

```javascript

// Front end function to call
$('submit').on('click', addComment(this))
function addComment(props){
	// Even though the function is called addComment, you are actually creating a post object
	// Because the paradigm behind my reasoning is that every comment, sub comment, whatever, it's
	// all just a thought/post/comment/knowledge, so they all get stored as posts, which can 
	// later be viewed as their own posts
	var comment = props.comment
	// Expect a return either true or false, if true, the comment was
	// stored sucessfully and we can render the comment on the front end
	var return = socket.io('addComment', props)
	if(return){
		renderComment(comment)
	} else {
		displayError()
	}
}
// Back end function to call
socket.io('addComment', addComment(props))
function addComment(props){
	var post = props.post
	postModel.findOne({
		"comments.data" : {$in: [post._id]}
	})
	.then((err, parentPost) => {
		if(!err && parentPost){
			if(parentPost.comments.data.indexOf(post._id) < 0){
				parentPost.comments.data.push(post._id)
				postModel.findOne({
					_id: post._id
				}).then((err, foundPost)=>{
					if(!err && foundPost){
						var newPost = new postModel(post)
						newPost.save(err=->{
							if(err){
								console.error("there was an error saving the new post")
								console.error(err)
							}
						})
					} else if(err){
						console.error("there was an error looking up a parentPost")
						console.error(err)
					}
				})
				.catch(err=>{
					if(err){
						console.error("there was an error looking up the newPost")
						console.error(err)
					}
				})
				
			}
		} else if(err){
			console.error("there was an error looking up a parentPost")
			console.error(err)
		}
	})
	.catch(err=>{
		if(err){
			console.error("there was an error looking up a parentPost")
			console.error(err)
		}
	})
	
}
// front end function
function renderComment(comment){
	// renders the comment on the user's page
}
function displayError(){
	// displays an error to the user for whatever reason the comment/post couldn't be added
}

// front end function to call
function addPost(props){
	var return = socket.io('addPost', props)
}
function addPost(props){
	// adds a new post to the data base of posts
}

///// Socket.io awaiting functions

socket.io('newPost', function(post){
	// puts the new post on the users page if the user is on a page where this post would show up
	if(post.isTopLevel){
		renderTopLevelPost(post)
	} else {
		renderSubLevelPost(post)
	}
})
function renderSubLevelPost(post){
	// We can do this with jquery or whatever method is quicker, this is where 
	// using vue or react would come in handy
}

```
## DESIGN WISE ####

### [ ] Fix the justify-content: center rendering error on firefox where it positions absolutely positioned elements by their left side at the center point of the parent instead of with their center aligned with their parent's center such as in chrome.

### 
## Data

```javascript
'Credentials' = {
	'SEO': {
		'webmasters': {
			'username': undefined,
			'password': undefined
		},
		'analytics': {
			'username': undefined,
			'password': undefined
		},
		'adwords': {
			'username': undefined,
			'password': undefined
		}
	},
	'ozledgrowlights.com.au': {
		'url': undefined,
		'username': undefined,
		'password': undefined
	},
	'FTP': {
		ip: "175.45.125.213",
		port: {
			sftp: "21",
			ftp: "20"
		},
		username: "webdev",
		password: "undefined"
	}
}
```
