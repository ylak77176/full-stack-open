import { useState, useEffect } from 'react'

import countryService from './services/countries'

const Search = ({newSearch, handleSearch}) => 
    <div>
        <p>Search countries: <input value={newSearch} onChange={handleSearch} /></p>
    </div>

const Languages = ({languages}) =>{
  console.log("languages", languages);

  
  return(
    <div>
      <ul>
    {languages.map(language => 
        <li>{language}</li>
      )}
      </ul>
    </div>   
  )
}
const Country = (props) => {
  console.log("info", props.country.name.common);
  
  return (
    <div>
      <h1>{props.country.name.common}</h1>
      <p>{props.country.capital}</p>
      <p>{props.country.area}</p>

      <h2>Languages</h2>

        <Languages languages={Object.values(props.country.languages)} />

      <img src={props.country.flags.png} />
    </div>
  )
}

const SearchResult = ({searchResult}) => {
    console.log("taille", searchResult.length,"resultat" ,searchResult);
    if (searchResult.length >= 10){
      return <p>Too many matches, specify another filter</p> 
      }
    else if (searchResult.length === 1){
      return(
      <div>
        <Country country={searchResult[0]} />
      </div>
      )
    }
    else {
      return (
        <ul>
          {searchResult.map(country =>
            <li key={country.altSpellings[0]} > {country.name.common}</li> 
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
      // console.log("result", includesResult)
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