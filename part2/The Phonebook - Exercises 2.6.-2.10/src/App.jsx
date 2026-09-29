import { useState } from 'react'

const Persons = ({ person }) => {
  return <li>{person.name} {person.number}</li>
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')


  const checkName = (newName) => {
    const names = persons.map(person => person.name)
    return names.includes(newName)
  }

  const addPerson = (event) => {
    event.preventDefault()

    checkName(newName)

    const isName = checkName(newName)
    ? alert(`${newName} is already added to phonebook`)
    : addPersonToList()
  }
    const filterItem = () => {
      return (
        persons.filter((persons) => persons.name.toLowerCase().includes(newSearch.toLowerCase()))
      )
      }
      
    const personsToShow = filterItem()



  const addPersonToList = () => {
      const nameObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1)
    }
    setPersons(persons.concat(nameObject))
    setNewName("")
    setNewNumber("")
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearch = (event) => {
   setNewSearch(event.target.value) 
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <input value={newSearch} onChange={handleSearch} />
      </div>

      <h2>Add a new contact</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person => 
          <Persons key={person.id} person={person} />
        )}
      </ul>

      <div>debug: {newSearch}</div>
    </div>
  )
}

export default App