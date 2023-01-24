import Person from './Person'

const NumbersList = ({persons, deleteItem}) => {
    return(
        <ul>
            {persons
            .filter(person => person.toShow)
            .map((person) => {
                return <Person name={person.name} number={person.number} id={person.id} key={person.id} deleteItem={deleteItem} />
            })}
        </ul>
    )
}

export default NumbersList