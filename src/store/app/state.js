export default {
  isAuthenticated: false,
	authLogs: [],
	entityMessage: "welcome, <a href='/self'>" + (this ? this.entity ? this.entity.username : 'anonymous' : 'anonymous') + "</a>",
	realms: ['all', 'public','free','philosophy'],
	pageHistory: [],
	thingTypes: [
			"object",
			"service",
			"inventory",
			"question",
			"answer",
			"moment",
	],
	types: [
			"Array",
			"String",
			"Number",
			"Boolean",
			"Thing",
			"Array of Arrays",
			"Array of Booleans",
			"Array of Numbers",
			"Array of Things",
			"Array of Strings",
			"Thing of Arrays",
			"Thing of Booleans",
			"Thing of Numbers",
			"Thing of Things",
			"Thing of Strings",
			// Array,
			// Boolean,
			// Number,
			// Object,
			// ,
			// ,
			// ,
			// ,
			// ,
			// [String],
			// "Array",
			// "Boolean",
			// "Number",
			// "Object",
			// "String",
			// "[Array]",
			// "[Boolean]",
			// "[Number]",
			// "[Object]",
			// "[String]",
	],
	thingNames: [
			"fork",
			"flashlight",
			"book",
			"food",
			"vegan lesagne",
			"sour strap",
			"wallet",
			"blanket",
			"mattress",
	],
	priceUnits: [
			"purchase",
			"unit",
			"use",
			"click",
			"second",
			"minute",
			"hour",
			"day",
			"cm",
			"metre",
			"km",
			"mg",
			"g",
			"kg",
			"tonne",
	],
	currencies: [
			"AUD",
			"USD",
			"EUR",
			"REN",
			"YEN",
			"RUP",
	],
	sideBarOptions: [
			'closed'
	],
	ico: {
			sandboxThing: {
					title: 'A lopu sandbox thing',
					description: "change as much as you want, the change's will still be here when you return",
					names: ['a lopu ico sandbox thing', 'thing'],
			},
			sandboxThingSchema: {
					title: 'A lopu sandbox thing',
					description: "change as much as you want, the change's will still be here when you return",
					names: ['a lopu ico sandbox thing', 'thing'],
			},
	},
	test: {
			woo: Boolean,
			woo1: Array,
			woo2: [Array],
			woo3: {Array: Array},
			woo4: {
					hmm: Boolean,
					hmm1: Array,
					hmm2: [Object],
					hmm3: {Array: Array}
			}
	},
	cached: [
			[]
	],
	interactionStarted: false,
	showLoginOptions: false,
	mainDrawer: false,
	
}