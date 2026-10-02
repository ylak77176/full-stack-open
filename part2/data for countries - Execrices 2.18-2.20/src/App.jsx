import { useState, useEffect } from 'react'
import countryService from './services/countries'

const Weather = ({city}) => {
  const [lat, setLat] = useState(null)
  const [lon, setLon] = useState(null)
  const [temp, setTemp] = useState(0)
  const [icon, setIcon] = useState(null)
  const [windSpeed, setWindSpeed] = useState(0)

useEffect(() => {

  if (city){
    countryService
      .getPosition(city)
      .then(position =>{
        const newLat = position[0].lat 
        const newLon = position[0].lon
        setLat(newLat)
        setLon(newLon) 
        }
      )
  }
}, [city])

if (lat){
    countryService
      .getMeteo({lat, lon})
      .then(weather =>{
        setTemp(weather.main.temp - 273.15) 
        setIcon(weather.weather[0].icon)
        setWindSpeed(weather.wind.speed)
      })
}
  return(
  <div>
    <h2>Weather in {city}</h2>
    <img src={`https://openweathermap.org/payload/api/media/file/${icon}.png`} alt=''/>
    <p>Temperature {temp.toFixed(1)} Celsius</p>
    <p>Wind {windSpeed.toFixed(1)} m/s</p>
  </div>
  )}

const Search = ({newSearch, handleSearch}) => 
    <div>
        <p>Search countries: <input value={newSearch} onChange={handleSearch} /></p>
    </div>

const Languages = ({languages}) =>{

  return(
    <div>
      <ul>
    {languages.map(language => 
        <li key={language} >{language}</li>
      )}
      </ul>
    </div>   
  )
}
const Country = (props) => {

  return (
    <div>
      <h1>{props.country.name.common}</h1>
      <p>{props.country.capital}</p>
      <p>{props.country.area}</p>

      <h2>Languages</h2>

        <Languages languages={Object.values(props.country.languages)} />

      <img src={props.country.flags.png} />
      <Weather city={props.country.capital}/>

    </div>
  )
}

const SearchResult = ({searchResult}) => {
  // const [countries, setCountries] = useState(searchResult) 
  const [selectedCountry, setSelectedCountry] = useState(null)
  // useEffect(() => {
  //   setCountries(searchResult)
  // }, [searchResult])
  useEffect(() => {
    setSelectedCountry(null)
  }, [searchResult])


    if (searchResult.length === 1){
      return(
      <div>
        <Country country={searchResult[0]} />
      </div>
      )
    }
    else if (selectedCountry){
      return(
      <div>
        <Country country={selectedCountry} />
      </div>
      )
    }
    else if (searchResult.length >= 10){
      return <p>Too many matches, specify another filter</p> 
      }

    else {
      return (
        <ul>
          {searchResult.map(country =>
            <li key={country.altSpellings[0]} > {country.name.common} <button onClick={() => setSelectedCountry(country) }>Show</button></li> 
          )}  
        </ul>
      )
    }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')
  const handleSearch = (event) => setNewSearch(event.target.value) 

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries =>{
        setCountries(initialCountries)
      })
  }, [])

  const searchResult = () => {
    if (countries){
      const includesResult = countries.filter(country =>
        country.name.common
          .toLowerCase()
          .includes(newSearch.toLowerCase())
        )

      return includesResult
    }
  }

  return (
    <>
      <div>
        <Search newSearch={newSearch} handleSearch={handleSearch} />
      </div>
      
      <div>
        <SearchResult searchResult={searchResult()} />
      </div>

    </>
  )
}

export default App