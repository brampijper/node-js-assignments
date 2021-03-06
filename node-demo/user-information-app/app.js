const express = require ('express')
const fs = require ('fs')
const app = express()
const bodyParser = require ('body-parser')

app.use( express.static('static') )

app.set('view engine', 'pug')
app.set('views', __dirname + '/views')
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/users', (req, res) => {
	fs.readFile(__dirname + '/users.json', (error, data) => {
		if(error) throw error
			let parsedData = JSON.parse(data)
			res.render('index', {data: parsedData})
	})
})

app.get('/form', (req, res) => {
	res.render('form')
})

app.post('/potato', (request, response) => {
	let rb = request.body.input
	let userArray = []

	
	fs.readFile(__dirname + '/users.json', (error, data) => {
		if(error) throw error

	let parsedData = JSON.parse(data)
		for (var i = 0; i < parsedData.length; i++) {
			if(parsedData[i].firstName.indexOf(rb) !== -1 || parsedData[i].lastName.indexOf(rb) !== -1) {
				userArray.push(parsedData[i].firstName + " " + parsedData[i].lastName)
			}
		}
		response.send(userArray) 
	})
})


app.post ('/add', (req, res, inputName) => {
	inputName = req.body.name
	
	let userArray = []
	fs.readFile(__dirname + '/users.json', (error, data) => {
		if(error) throw error
			let parsedData = JSON.parse(data)
			for(var key in parsedData) {
				if(parsedData[key].firstName == inputName || parsedData[key].lastName == inputName || parsedData[key].firstName + ' ' + parsedData[key].lastName == inputName) {
					userArray.push('First Name: ' + parsedData[key].firstName, 'Last Name: ' + parsedData[key].lastName, 'Emailadres: ' + parsedData[key].emailadres)
				}
			}
		res.render('result', {result: userArray}) 
	})
})

app.get('/addUser', (req, res) => {
	res.render('addUser')
})

app.post('/addUser', (req,res) => {

	fs.readFile(__dirname + '/users.json', (error, data) => {
		if(error) throw error
			parsedData = JSON.parse(data)
			parsedData.push({firstName: req.body.firstName, lastName: req.body.lastName, emailadres: req.body.emailadres})
			json = JSON.stringify(parsedData)

			fs.writeFile(__dirname + '/users.json', json, 'utf8', (error, data) => {
				if(error) throw error
					let test = JSON.parse(json)
					res.redirect('users')
			})
	})
})


app.listen(8000, () => {
	console.log('Server running')
})


