import { useState } from 'react'
import Form from './components/Form'
import NumbersList from './components/NumbersList'
import Search from './components/Search'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchValue, setSearchValue] = useState('')

  const addNumber = (event) => {
    event.preventDefault()
    const duplicated = persons.find(item => item.name === newName)

    // Validation checks
    if (duplicated) {
      alert(`${newName} is already added to phonebook`)
    }
    if (!newName) {
      alert(`Please enter a name`)
    }
    if (!newNumber) {
      alert(`Please enter a number`)
    }

    // Update persons
    if (newName && newNumber && !duplicated) {
      setPersons([...persons, {name: newName, number: newNumber}])
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameInputChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value)
    const filteredPersons = persons.map((person) => {
      if(person.name.toLowerCase().includes(event.target.value.toLowerCase())){
        person.toShow = true
        return person
      } else {
        person.toShow = false
        return person
      }
    })
    setPersons(filteredPersons)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Search searchValue={searchValue} onChange={handleSearchInputChange}/>
      <h2>Add a new</h2>
      <Form addNumber={addNumber} handleNameInputChange={handleNameInputChange} handleNumberInputChange={handleNumberInputChange} newNumber={newNumber} newName={newName} />
      <h2>Numbers</h2>
      <NumbersList persons={persons} />
    </div>
  )
}

export default App