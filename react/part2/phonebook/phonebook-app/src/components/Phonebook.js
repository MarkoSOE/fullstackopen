const Phonebook = ({persons, filterName}) => {
    let newPersonArray = persons.filter((person) => 
    person.name.toLowerCase().includes(filterName.toLowerCase()))

    return(
        newPersonArray.map(person => (
            <li key={person.id}>
                {person.name} : {person.number}
            </li>
        ))
    )
}
export default Phonebook