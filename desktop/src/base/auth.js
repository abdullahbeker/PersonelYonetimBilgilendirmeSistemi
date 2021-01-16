import api, { addTokenToHeader, removeAuthToken, handleGetAsync, handlePostAsync } from './api'

class Auth {
  constructor() {
    if (this.getToken()) this.removeToken()
    this.authenticated = false
  }

  login(Username, Password, toastDispatch, successCallback, errorCallback) {
    handlePostAsync(
      api,
      '/api/auth/signin',
      {
        Username,
        Password,
      },
      res => {
        addTokenToHeader(res.data.token, api)
        this.authenticated = true
        if (successCallback) successCallback()
      },
      toastDispatch,
      res => {
        if (res.status == 400) {
          toastDispatch({ type: 'warning', message: 'Yanlış kullanıcı adı veya şifre' })
          if (errorCallback) errorCallback(res)
        }
      }
    )
  }

  logout() {
    this.removeToken()
    removeAuthToken(api)
    this.authenticated = false
  }

  isAuthenticated() {
    return this.authenticated
  }

  setToken(token) {
    localStorage.setItem('token', token)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  removeToken() {
    localStorage.removeItem('token')
  }
}

export default new Auth()
