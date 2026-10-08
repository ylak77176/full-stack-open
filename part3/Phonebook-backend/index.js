require('dotenv').config()

const Person = require('./models/person')
// const Person = mongoose.model('Person', personSchema)


var express = require('express')
var morgan = require('morgan')
const app = express()
app.use(express.json())
app.use(express.static('dist'))
morgan.token('body', function getBody (req) {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


let persons = []

// Helper
const generateId = () => {
  const maxId = persons.length > 0
  ? Math.max(...persons.map(person => Number(person.id)))
  : 0

  return String(maxId + 1)
}

const isNameExist = (name) => persons.find(person => person.name === name)


// Reponse 
app.get('/api/persons', (request, response) => {
  Person.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  if (person){
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.get('/info', (request, response) => {
    const date = Date(Date.now()).toString()
    const message = `
    <p>Phonebook as info for ${persons.length} people</p>
    <p>HELL${date}</p>`

  response.send(message)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id 
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()

})


app.post('/api/persons', (request, response) => {

  const body = request.body

  if (!body.name){
    return response.status(400).json({
      error: 'Must enter a name'
    })
  }
  else if(!body.number){
    return response.status(400).json({
      error: 'Must enter a number'
    })
  }
  else if(isNameExist(body.name)){
    return response.status(400).json({
      error: 'name must be unique'
    })
  }


  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }


  persons = persons.concat(person)
  response.json(person)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})