'use strict'
const fs = require ('fs')

//helper functions
let roundDecimal = (number) => {
	return Math.round(number * 100 ) / 100
}

let addCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

let prettyNr = ( number ) => {
	return addCommas( roundDecimal( number ) )
}


//Read the customer data json
fs.readFile(__dirname + '/customer.json', 'UTF8', (err, data) => {
	// Parse the file to a readable object
	let parsedData = JSON.parse(data)
	for (var i = 0; i < parsedData.length; i++) 
		calcCompound(parsedData[i])
	
} )

//Function to calculate compound interest from a customer object
let calcCompound = (customer) => {
		customer.pension.endamount = {
		pessimistic: 	customer.finances.startcapital,
		average: 		customer.finances.startcapital,
		optimistic: 	customer.finances.startcapital
		}
		customer.pension.duration = (customer.pension.age - customer.age)
	
	//Do the interest math
	for (var i = customer.pension.duration - 1; i >= 0; i--) {
		
		//add monthly spend to all the scenarios
		customer.pension.endamount.pessimistic 	+= (customer.finances.monthlyadd * 12)
		customer.pension.endamount.average 		+= (customer.finances.monthlyadd * 12) 
		customer.pension.endamount.optimistic 	+= (customer.finances.monthlyadd * 12)  
		
		//calculate the added interest
		customer.pension.endamount.pessimistic 	*= customer.pension.interest.pessimistic
		customer.pension.endamount.average 		*= customer.pension.interest.average
		customer.pension.endamount.optimistic 	*= customer.pension.interest.optimistic
	}

	console.log("Welcome " 					+ customer.name + " to our advanced pension planner!")
	console.log("You are starting with " 	+ customer.finances.startcapital + " and add a monthly amount of " + customer.finances.monthlyadd)
	console.log("When you retire at age " 	+ customer.pension.age + " you will have the following:")

	//Output calculation stuff
	console.log("In a pessimistic scenario: €" 	+ prettyNr( customer.pension.endamount.pessimistic ) )
	console.log("In a average scenario: €" 		+ prettyNr( customer.pension.endamount.average ) )
	console.log("In a optimistic scenario: €" 	+ prettyNr( customer.pension.endamount.optimistic ) )
}

module.exports = fs.readFile

