import { useState, useEffect } from 'react'
import Form from './components/Form'
import NumbersList from './components/NumbersList'
import Search from './components/Search'
import Notification from './components/Notification'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personsService
        .getAll()
        .then(response => {
          setPersons(response)
        })
  }, [])

  const addNumber = (event) => {
    event.preventDefault()
    const duplicated = persons.find(item => item.name === newName)

    // Validation checks
    if (!newName) {
      alert(`Please enter a name`)
    }
    if (!newNumber) {
      alert(`Please enter a number`)
    }

    // Update persons
    if (newName && newNumber) {
      const newItem = {
        name: newName, 
        number: newNumber, 
        toShow: true
      }
      if (duplicated) {
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)){
          personsService
          .change(duplicated.id, newItem)
          .then(response => {
            setNotification({
              text: `Changed ${newName}`,
              type: 'notification'
            })
            setTimeout(() => {
              setNotification(null)
            }, 5000);
            setPersons(persons.map(item => item.id === duplicated.id ? response : item))
          }).catch(error => {
            console.error(error);
            setNotification({
              text: `Information of ${newName} has already been removed from server`,
              type: 'error'
            })
            setTimeout(() => {
              setNotification(null)
            }, 5000);
          })
        }
      } else {
        personsService
            .create(newItem)
            .then(response => {
              setNotification({
                text: `Added ${newName}`,
                type: 'notification'
              })
              setTimeout(() => {
                setNotification(null)
              }, 5000);
              setPersons([...persons, response])
              setNewName('')
              setNewNumber('')
            }).catch(error => {
              console.error(error);
              setNotification({
                text: `Information of ${newName} has already been removed from server`,
                type: 'error'
              })
              setTimeout(() => {
                setNotification(null)
              }, 5000);
            })
      }
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

  const deleteItem = (id) => {
    const deletedName = persons.find(item => item.id === id).name
    if (window.confirm(`Delete ${deletedName}?`)) {
      personsService
        .deleteItem(id)
        .then(() => {
          const newPersons = persons.filter(item => item.id !== id)
          setPersons(newPersons)
        })
    }
    
  }

  return (
    <div>
      <h1>Phonebooks</h1>
      <Notification message={notification}/>
      <Search searchValue={searchValue} onChange={handleSearchInputChange}/>
      <h2>Add a new</h2>
      <Form addNumber={addNumber} handleNameInputChange={handleNameInputChange} handleNumberInputChange={handleNumberInputChange} newNumber={newNumber} newName={newName} />
      <h2>Numbers</h2>
      <NumbersList persons={persons} deleteItem={deleteItem} />
    </div>
  )
}

export default App