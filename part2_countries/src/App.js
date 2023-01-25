import Search from './components/Search'
import CountriesList from './components/CountriesList'
import getAll from './services/Countries'
import { useState, useEffect } from 'react'

function App() {
  const [searchValue, setSearchValue] = useState('')
  const [countriesFiltered, setCountriesFiltered] = useState([])

  const handleSearchInputChange = (event) => {
    const value = event.target.value.toLowerCase()
    setSearchValue(value)
    getAll()
        .then(response => {
          const filtered = response
              .filter(country => {
                const matchedCountry = country.name.common.toLowerCase().includes(value)
                return matchedCountry
              })
              .map(country => {
                return {...country, expand: false}
              })
          setCountriesFiltered(filtered)
        })
  }

  const expandCountry = (name) => {
    const newList = countriesFiltered.map(country => {
      if (country.name.common === name) {
        return {...country, expand: !country.expand}
      } else {
        return country
      }
    })
    setCountriesFiltered(newList)
  }

  return (
    <div>
      <Search searchValue={searchValue} onChange={handleSearchInputChange}/>
      {countriesFiltered.length <= 10 ? 
        <CountriesList countries={countriesFiltered} expandCountry={expandCountry}/> :
        <div>Too many matches, specify another filter</div>
      }
    </div>
  );
}

export default App;
