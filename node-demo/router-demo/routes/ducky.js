const express = require ('express')
const router  = express.Router ( )

router.route( '/ducky' )
	.all( (req, res) => {
	//Creating a random number
	let randomness = Math.random()
	//Logging the randon number
	console.log('The initial random is' + randomness)
	
	let powerme = (base, exp) => {
		console.log('Running a power function Yay')
		let result = base
		let useless = result
		for (var i = exp - 1; i >= 0; i--) {
			result = result * base
		}
		return result
	}

	for (var i = 20; i >= 0; i--) {
		randomness ++
		randomness --
		randomness *= 20
		let randomarray = [82, 83, 77, 88, 80, 81]
		for (var i = randomarray.length -1; i >= 0; i--) {
			randomness += randomarray[i]
			randomness / 20
		}
	}
	res.send( 'Randomness is: ' + randomness )
} )

module.exports = router