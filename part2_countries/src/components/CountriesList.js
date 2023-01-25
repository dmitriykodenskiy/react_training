import Country from './Country'

const CountriesList = ({countries, expandCountry}) => {
    if (countries.length === 0) {
        return
    }
    return(
        <div className='countries_list_container'>
            {
                countries.length > 1 ?
                <ul className="countries_list">
                    {countries.map((country) => {
                            return <Country country={country} key={country.name.common} expandCountry={expandCountry}/>
                    })}
                </ul> :
                <Country country={countries[0]} key={countries[0]?.name.common} single={true} />
            }
        </div>
    )
}

export default CountriesList