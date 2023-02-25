import { useState, useEffect } from 'react'
import getAll from '../services/Countries'

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
}

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)
  
    useEffect(() => {
      getAll().then(response => setCountry(response.filter(item => item.name.common.toLowerCase().includes(name.toLowerCase()))))
    }, [name])

    return country?.length === 1 ? {...country[0]} : country?.length > 1 ? 'specify search' : null
}