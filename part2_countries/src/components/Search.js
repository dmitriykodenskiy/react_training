const Search = ({searchValue, onChange}) => {
    return(
        <div className="search">
            <label>Find countries <input type='search' value={searchValue} onChange={onChange}></input></label>
        </div>
    )
} 

export default Search