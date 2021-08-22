import axios from 'axios'

// creating instance of axios
const Axios = axios.create({
  baseURL: 'http://localhost:5000',
})

export default Axios
