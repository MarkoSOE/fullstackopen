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
    personsService
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
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
		const personID = persons.filter(person => person.name === newName)
		//if the name already exists, ask the user if they want to replace their number with the one provided in newName
		if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
			personsService
			.replacePerson(personID[0].id, personObject)
			.then((replacedPerson) => {
			setPersons(persons.map(person => person.id === personID[0].id ? replacedPerson : person))
				setNewName('')
				setNewNumber('')
			})
			.catch(error => console.error(error))
		}
    }
    else{
      if(newName === "" || newNumber === ""){
        alert('the name and number must not be empty')
      }
      else{
        personsService
        .create(personObject)
        .then(addedPerson => {
          console.log(addedPerson)
          setPersons(persons.concat(addedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => console.error(error))
      }
    }
  }

  const removeEntry = (personID) => {
	if(window.confirm('Do you wish to delete this person')){
		personsService
		.deleteName(personID)
		.then(() => {
			setPersons(persons.filter(person => person.id !== personID))
		})
		.catch(error => console.error(error))
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
        <Phonebook persons={persons} filterName={filterName} removeEntry={removeEntry}/>
      </ul>
    </div>
  )
}

export default App