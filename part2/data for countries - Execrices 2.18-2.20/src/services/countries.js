import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY
const countriesUrl = "https://studies.cs.helsinki.fi/restcountries/api/all"

const getAll = () => {
  const request = axios.get(countriesUrl)
  return request.then(response => response.data)
}

const getMeteo = ({lat, lon}) => {
  const meteoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}` 
  const request = axios.get(meteoUrl)
  return request.then(response => response.data)
}
const getPosition = (city) => {
  const positionUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${api_key}`
  const request = axios.get(positionUrl)
  return request.then(response => response.data)
}

export default {getAll, getMeteo, getPosition}