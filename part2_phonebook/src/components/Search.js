const Search = ({searchValue, onChange}) => {
    return(
        <div>
            filter shown with: <input type={'search'} value={searchValue} onChange={onChange}></input>
        </div>
    )
}

export default Search