const Person = ({name, number, deleteItem, id}) => {
    return(
        <li className="person">
            <span className="person_data">{name}: {number}</span>
            <button className="delete_button" onClick={() => deleteItem(id)}>delete</button>
        </li>
    )
}

export default Person