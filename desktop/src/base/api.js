import axios from 'axios'

export const addTokenToHeader = (token, instance) => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export const removeAuthToken = instance => {
  delete instance.defaults.headers.common['Authorization']
}

export const handleGetAsync = (api, url, successCallback, toastDispatch, errorCallback) => {
  api
    .get(url)
    .then(successCallback)
    .catch(err => {
      if (err.response) {
        if (errorCallback) {
          errorCallback(err.response)
        } else {
          toastDispatch({
            type: 'error',
            message: 'Sunucularımızda bir hata oluştu, lütfen daha sonra tekrar deneyin',
          })
        }
      } else if (err.request) {
        toastDispatch({
          type: 'error',
          message: 'Sunucularımıza ulaşamıyoruz, lütfen daha sonra tekrar deneyin',
        })
      } else {
        toastDispatch({
          type: 'error',
          message: 'Bir hata oluştu, lütfen daha sonra tekrar deneyin',
        })
      }
    })
}

export const handlePostAsync = (api, url, data, successCallback, toastDispatch, errorCallback) => {
  api
    .post(url, data)
    .then(successCallback)
    .catch(err => {
      if (err.response) {
        console.log({ err })
        if (errorCallback) {
          errorCallback(err.response)
        } else {
          toastDispatch({
            type: 'error',
            message: 'Sunucularımızda bir hata oluştu, lütfen daha sonra tekrar deneyin',
          })
        }
      } else if (err.request) {
        toastDispatch({
          type: 'error',
          message: 'Sunucularımıza ulaşamıyoruz, lütfen daha sonra tekrar deneyin',
        })
      } else {
        toastDispatch({
          type: 'error',
          message: 'Bir hata oluştu, lütfen daha sonra tekrar deneyin',
        })
      }
    })
}
export const handlePostWithImageAsync = (api, url, data, successCallback, toastDispatch, errorCallback) => {
  api
    .post(url, data, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then(successCallback)
    .catch(err => {
      if (err.response) {
        console.log({ err })
        if (errorCallback) {
          errorCallback(err.response)
        } else {
          toastDispatch({
            type: 'error',
            message: 'Sunucularımızda bir hata oluştu, lütfen daha sonra tekrar deneyin',
          })
        }
      } else if (err.request) {
        toastDispatch({
          type: 'error',
          message: 'Sunucularımıza ulaşamıyoruz, lütfen daha sonra tekrar deneyin',
        })
      } else {
        toastDispatch({
          type: 'error',
          message: 'Bir hata oluştu, lütfen daha sonra tekrar deneyin',
        })
      }
    })
}
export default axios.create({
  baseURL: 'https://pybsapi.azurewebsites.net',
})
