class growroom {

    	constructor(settings) {
			var settings = settings || {};



			this.height = settings.height || 220;
			this.width = settings.width || 250;
			this.depth = settings.depth || 250;

			this.lights = settings.lights || [

				{
					model: "green",
					wattage: 460,
					draw: false,

					width: 56,
					depth: 26,
					height: 5,

					lensAngle: 120,

					spectrums: {
						colours: {
							blue: {
								nm: [
									430,
									440,
									450,
									475
								],
								ratio: .25
							},
							red: {
								nm: [
									610,
									620,
									630,
									650,
									670
								],
								ratio: .65
							},
							length: function(){
								var length = 0, key;
								for (key in this) {
									if (this.hasOwnProperty(key)) length++;

								}
								return length;
							}
						},

						getColours: function(){
							var colours = this.colours;
							console.log(colours.length());
							for (var i in this.colours) {
								console.log(i);
							}
						}
					}
				}
			]
		};

	}


var growroom1 = new growroom;

growroom1.lights[0].spectrums.getColours();
