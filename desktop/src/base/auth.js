import api, { addTokenToHeader, removeAuthToken, handleGetAsync, handlePostAsync } from './api'

class Auth {
  constructor() {
    if (this.getToken()) this.removeToken()
    this.authenticated = false
  }

  login(username, password, toastDispatch, callback) {
    handlePostAsync(
      api,
      '/api/auth/login',
      {
        username,
        password
      },
      res => {
        addTokenToHeader(res.data.token, api)
        callback()
      },
      res => {
        if (res.status == 400) {
          toastDispatch({ type: 'warning', message: 'Yanlış kullanıcı adı veya şifre' })
        }
      }
    )
    // api
    //   .post('/api/auth/login', {
    //     username,
    //     password
    //   })
    //   .then(res => {
    //     addTokenToHeader(res.data.token, api)
    //     callback()
    //   })
    //   .catch(err => {
    //     if (err.response) {
    //       if (err.response.status == 400) {
    //         callback('Yanlış kullanıcı adı veya şifre')
    //       } else {
    //         callback('Sunucularımızda bir hata oluştu, lütfen daha sonra tekrar deneyin')
    //       }
    //     } else if (err.request) {
    //       callback('Sunucularımıza ulaşamıyoruz, lütfen daha sonra tekrar deneyin')
    //     } else {
    //       callback('Bir hata oluştu, lütfen tekrar deneyin')
    //     }
    //   })
  }

  logout() {
    this.authenticated = false
    this.removeToken()
    removeAuthToken(api)
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
