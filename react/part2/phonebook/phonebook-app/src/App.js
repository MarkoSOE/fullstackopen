import { useEffect, useState } from "react";
import personsService from './services/persons'
import Filter from './components/Filter'
import PersonForm from "./components/PersonForm";
import Phonebook from "./components/Phonebook";

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')


  useEffect(() => {
    console.log('effect')
    personsService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
      .catch(error => console.error(error))
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChanges = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameFilter = (event) => {
    setFilterName(event.target.value)
  }


  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number : newNumber
    }

    if(persons.some(el => el.name === newName)){
      alert(`${newName} is already added to phonebook`)
    }
    else{
      if(newName === "" || newNumber === ""){
        alert('the name and number must not be empty')
      }
      else{
        personsService
        .create(personObject)
        .then(response => {
          console.log(response.data)
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => console.error(error))
      }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      Filter shown with
      <Filter value={filterName} onChange={handleNameFilter}/>
      <h2>Add a new</h2>
      <PersonForm 
        addName = {addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChanges={handleNumberChanges}
      />
      <h2>Numbers</h2>
      <ul>
        <Phonebook persons={persons} filterName={filterName}/>
      </ul>
    </div>
  )
}

export default App