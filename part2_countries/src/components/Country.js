const Country = ({country, single, expandCountry}) => {
    const name = country.name.common
    const languages = Object.values(country.languages)
    if (single) {
        return(
            <div className="country">
                <h3>{name}</h3>
                <div>Capital: {country.capital[0]}</div>
                <div>Area: {country.area}</div>
                <h4>Languages:</h4>
                <ul>
                    {languages.map(language => {
                        return <li className="language" key={language}>{language}</li>
                    })}
                </ul>
                <img src={country.flags.png} alt={`${name} flag`}/>
            </div>
        )
    } else {
        const buttonText = country.expand ? 'hide' : 'show'
        return(
            <li className="country_item">
                <span className="country_name">{name}</span>
                <button className="expand_country" onClick={() => expandCountry(name)}>{buttonText}</button>
                {country.expand &&
                    <div className="country">
                        <h3>{name}</h3>
                        <div>Capital: {country.capital[0]}</div>
                        <div>Area: {country.area}</div>
                        <h4>Languages:</h4>
                        <ul>
                            {languages.map(language => {
                                return <li className="language" key={language}>{language}</li>
                            })}
                        </ul>
                        <img src={country.flags.png} alt={`${name} flag`}/>
                    </div>
                }
            </li>
        ) 
    }
    
}
export default Country