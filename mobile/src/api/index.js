import axios from 'axios'
export default axios.create({
  baseURL: 'https://pybsapi.azurewebsites.net/',
  validateStatus: function (status) {
    return status < 500
  }
})
