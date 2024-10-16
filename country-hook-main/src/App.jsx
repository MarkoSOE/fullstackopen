import React, { useState, useEffect } from 'react'
import axios from 'axios'
//import { useCountry } from './hooks/Country'

const useField = (type) => {
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

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  useEffect(() => {
    const getCountry = async () => {
      console.log(name)
      const response = await fetch(`https://restcountries.com/v3.1/name/${name}/?fullText=true`)
      const data = await response.json()
      setCountry(data[0])
    }
    getCountry()
  }, [name])

  useEffect(() => {
    setCountry(null)
  }, [])
  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.name) {
    return (
      <div>
        not found...
      </div>
    )
  }
  return (
    <div>
      <h3>{country.flag} </h3>
      <div>capital {country.capital[0]} </div>
      <div>population {country.population}</div>
      <img src={country.flags.png} height='100' alt={`flag of ${country.name.common}`} />
    </div>
  )
}
const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)

    console.log(country)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
