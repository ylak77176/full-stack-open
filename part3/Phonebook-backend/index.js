require('dotenv').config()

const Person = require('./models/person')
// const Person = mongoose.model('Person', personSchema)

var morgan = require('morgan')
morgan.token('body', function getBody (req) {
  return JSON.stringify(req.body)
})

var express = require('express')
const app = express()
app.use(express.json())
app.use(express.static('dist'))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

// Reponse
app.get('/api/persons', (request, response) => {
  Person.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person){
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {next(error)
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
    .then(() => {
      response.status(204).end()
    })

})

app.post('/api/persons', (request, response, next) => {

  const body = request.body

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

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  Person.findByIdAndUpdate(request.params.id,{ number: body.number } , { new: true, runValidators: true })
    .then(result => {
      response.json(result)
    })
    .catch(error => next(error))
})




const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


