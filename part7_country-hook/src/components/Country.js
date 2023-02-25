const Country = ({ country }) => {
    if (!country) {
      return null
    }
  
    if (country === 'specify search') {
      return (
        <div>
          Too much matches. Please specify a search
        </div>
      )
    }
  
    return (
      <div>
        <h3>{country.name.common} </h3>
        <div>capital {country.capital[0]} </div>
        <div>population {country.population}</div> 
        <img src={country.flags.svg} height='100' alt={`flag of ${country.name.common}`}/>  
      </div>
    )
}

export default Country