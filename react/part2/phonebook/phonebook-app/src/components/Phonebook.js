const Phonebook = ({persons, filterName, removeEntry}) => {
    let newPersonArray = persons.filter((person) => 
    person.name.toLowerCase().includes(filterName.toLowerCase()))

    return(
        newPersonArray.map(person => (
            <li key={person.id}>
                {person.name} : {person.number}
                <button onClick={()=> removeEntry(person.id)}>
                    Delete
                </button>
            </li>
        ))
    )
}
export default Phonebook