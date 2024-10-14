import { useState, useEffect } from "react"

export const useCountry = (name) => {
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
