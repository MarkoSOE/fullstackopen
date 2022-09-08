import { useEffect, useState } from "react";
import personsService from './services/persons'
import Filter from './components/Filter'
import PersonForm from "./components/PersonForm";
import Phonebook from "./components/Phonebook";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

//useEffect executes afer render
  useEffect(() => {
    personsService
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
      })
      .catch(error => console.error(error))
	  //using the [] parameter, we tell React to only execute the useEffect once
  }, [])


  //set the state of the variables above to the value typed in the input fields
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

	//go through the persons array and find if there's a matching name already inside
    //the some() method tests whether at least one element in the array passes the test provided; if the name is equal to the name provided by the user
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
				setSuccessMessage(`Successfully changed ${newName}'s contact number`)
			})
			.catch(error => console.error(error))
		}
    }
    else{
      if(newName === "" || newNumber === ""){
        setErrorMessage('The name or number must not be empty')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
      else{
        personsService
        .create(personObject)
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(`Successfully added ${personObject.name}`)
          setTimeout(() => {
          setSuccessMessage(null)
          }, 5000);
        })
        .catch(() => {
          setErrorMessage(`Failed to add ${personObject.name}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
		    })
      }
    }
  }

  const removeEntry = (personID) => {
	if(window.confirm('Do you wish to delete this person')){
		personsService
		.deleteName(personID)
		.then(() => {
			setPersons(persons.filter(person => person.id !== personID))
			setSuccessMessage(`Sucessfully deleted ${persons.filter(person => person.id === personID)[0].name}`)
			setTimeout(() => {
				setSuccessMessage(null)
			}, 5000);
		})
		.catch(() => {
			setErrorMessage(`Information of ${persons.filter(person => person.id === personID)[0].name} has already been removed from the server`)
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000);
		})
	}
  }

  return (
    <div>
      <h2>Phonebook</h2>
	  <Notification error={errorMessage} success={successMessage}/>
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