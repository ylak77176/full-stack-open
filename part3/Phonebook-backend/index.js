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


// Reponse 
app.get('/api/persons', (request, response) => {
  Person.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
        if (person){
          response.json(person)
        } else {
          response.status(404).end()
        }
      })
    .catch(error => {
      console.log(error)
      response.status(500).end()
    })
})

app.get('/info', (request, response) => {

    const date = Date(Date.now()).toString()
    const message = `
    <p>Phonebook as info for ${Person.length} people</p>
    <p>${date}</p>`

  response.send(message)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  Person.findByIdAndDelete(id)
    .then(result => {
      response.status(204).end()
    })

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
Person.findOne({ name: body.name })
    .then(existingPerson => {
      if (existingPerson) {
        return response.status(400).json({
          error: 'name must be unique'
        })
      }

      const person = new Person({
        name: body.name,
        number: body.number,
      })

      return person.save().then((savedPerson) => {
        response.json(savedPerson)
      })
    })
    .catch(error => next(error)) 
})

app.put('/api/persons/:id', (request, response) => {
  const body = request.body
  Person.findByIdAndUpdate(request.params.id,{ number: body.number} , { new: true })
      .then(result => {
        response.json(result)
      })
      .catch(error => next(error))
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


