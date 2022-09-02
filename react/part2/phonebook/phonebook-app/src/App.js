import { useEffect, useState } from "react";
import axios from 'axios';

const App = () => {
  // const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '040-123456', id: 1 },
  // { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  // { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  // { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }])

  //Modify the application such that the initial state of the data is fetched from the server using the axios-library. Complete the fetching with an Effect hook.

  const [persons, setPersons] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        console.log(persons)
      })
  }, [])

  //meant for controlling the form input element
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [filterName, setFilterName] = useState('')

  const Input = ({person}) => {
    return(
      <li>
        <span>
        {person.name}  {person.number}
        </span>
      </li>
    )
  }

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

    function addPerson(arr, arradded){
      const found = arr.some(el => el.name === arradded.name)
      if(!found){
        //adding the object to the array of objects
        //here you have to use concat instead of push() because react does not work well with object mutability. Want to make sure that the state is immutable
        setPersons(persons.concat(arradded))
        setNewName('')
        setNewNumber('')
      }
      else{
        alert(`${arradded.name} is already added to phonebook`)
      }
    }

    addPerson(persons,personObject)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <input value={filterName} onChange={handleNameFilter}></input>
      </form>
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          name : <input value={newName} onChange={handleNameChange}/>
        </div>
        <div> 
          number : <input value={newNumber} onChange={handleNumberChanges}/>
        </div>
        <div>
          <button type="submit">
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.filter((person) =>person.name.toLowerCase().includes(filterName.toLowerCase())).map((person,index) => <Input key={index} person={person}/>)}
        <h3>Total Number of people</h3>
        {persons.filter((person) =>person.name.toLowerCase().includes(filterName.toLowerCase())).length}
      </div>
    </div>
  )
}

export default App