const Filter = ({value, onChange}) => {
    return(
        <div>
            <form>
                <input value={value} onChange={onChange}></input>
            </form>
        </div>
    )
}

export default Filter