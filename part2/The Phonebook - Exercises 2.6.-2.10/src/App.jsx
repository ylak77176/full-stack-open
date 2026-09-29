import { useState } from 'react'

const Persons = ({ person }) => {
  return <li>{person.name}</li>
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')


  const checkName = (newName) => {
    const names = persons.map(person => person.name)
    return names.includes(newName)
  }

  const addName = (event) => {
    event.preventDefault()

    checkName(newName)

    const isName = checkName(newName)
    ? alert(`${newName} is already added to phonebook`)
    : addNameToList()
  }

  const addNameToList = () => {
      const nameObject = {
      name: newName
    }
    setPersons(persons.concat(nameObject))
    setNewName("")
  }




  const handleNameChange = (event) => {

    setNewName(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <ul>
        {persons.map(person => 
          <Persons key={person.name} person={person} />
        )}
      </ul>
      <h2>Numbers</h2>
      <div>debug: {newName}</div>
    </div>
  )
}

export default App