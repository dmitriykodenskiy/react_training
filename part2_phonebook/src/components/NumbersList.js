import Person from './Person'

const NumbersList = ({persons}) => {
    return(
        <ul>
            {persons
            .filter(person => person.toShow)
            .map((person) => {
                return <Person name={person.name} number={person.number} key={person.name} />
            })}
        </ul>
    )
}

export default NumbersList