import { useState, useEffect } from 'react'
import personsService from './services/persons'

const Persons = ({person, deleteEntry}) => 
<li>{person.name} {person.number} <button onClick={deleteEntry}>delete</button></li>

const Filter = ({newSearch, handleSearch}) => 
    <div>
        <p>Filter shown with: <input value={newSearch} onChange={handleSearch} /></p>
    </div>

const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) =>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

const App = () => {
  const [persons, setPersons] = useState([]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons =>{
        setPersons(initialPersons)
      })
  }, [])

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
      number: newNumber
    }
    personsService
      .create(nameObject)
      .then(returnedPerson =>{
        setPersons(persons.concat(returnedPerson))
        setNewName("")
        setNewNumber("")       
      })
  }

  const deleteEntry = id => {
    const person = persons.find(n => n.id === id)

    confirm(`Delete ${person.name}`)
    ? personsService
      .remove(person.id)
      .then(() => {
        setPersons(persons.filter(n => n.id !== id))
        }
      )
    : persons
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

      <Filter newSearch={newSearch} handleSearch={handleSearch}/>

      <h2>Add a new contact</h2>

      <PersonForm
      addPerson={addPerson}
      newName={newName}
      handleNameChange={handleNameChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      
      <ul>
        {personsToShow.map(person => 
          <Persons key={person.id} person={person} deleteEntry={() => deleteEntry(person.id)}/>
        )}
      </ul>

    </div>
  )
}

export default App