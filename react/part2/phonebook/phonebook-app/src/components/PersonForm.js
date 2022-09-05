const PersonForm = ({addName, newName, newNumber, handleNameChange, handleNumberChanges}) => {
    return(
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
    )
}

export default PersonForm