const Form = ({addNumber, handleNameInputChange, handleNumberInputChange, newNumber, newName}) => {
    return(
        <form onSubmit={addNumber}>
            <div>
                name: <input value={newName} onChange={handleNameInputChange}/>
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberInputChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default Form