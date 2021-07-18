// import sentience from 'sentience'
let smarts = require('smarts')()
let debug
let permutate = (args={})=>{
	smarts.create(
		args,
		{
			array: [],
			permutations: [],
			permutationsA: [],
			n: 0,
			r: smarts.getsmart(args, 'array.length', 0),
			separator: ' ',
		}
	)
	switch (args.r-args.n){
		case args.array.length && debug:
			console.log('starting permutate')
	}

	for(i of Array((args.array.length - args.r)+1).fill(0)){
		let permutation = args.array.slice(args.n, args.n+args.r)
		let i = smarts.pushOpt(permutation.join(args.separator), args.permutations, undefined, undefined, undefined, true) ;
		args.permutationsA.length > i ? null : args.permutationsA.push(args.permutations[args.permutations.length-1].split(args.separator))
		args.n++
	}

	args.r--
	args.n = 0
	if(args.r){
		return permutate(args)
	} else {
		return args
	}
}

window.$p = permutate

export default ({app, router, Vue}) => {
	Vue.prototype.$p = permutate
}
