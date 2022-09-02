import {useEffect, useState} from 'react'
import axios from 'axios'
import Countries from './components/countries'

const App = () => {
  //setting default state for countries
  const [countries,setCountries] = useState([])
  const [newCountry,setNewCountry] = useState('')

  //handler adjusting state of newCountry to be what value user inputs
  const handleCountryChange = (event) => {
    console.log(event.target.value)
    setNewCountry(event.target.value)
  }

  //using axios to send a get request to a countries API, storing the response into state using the method setCountries. The useEffect hook is only run along with the irst render
  useEffect(()=>{
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  },[])

  return(
    <div>
        Find countries <input value={newCountry} onChange={handleCountryChange}></input>
        <Countries filter={newCountry} countries={countries} showCountry={handleCountryChange} />
    </div>
  )
}

export default App;
