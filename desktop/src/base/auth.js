import api, { addTokenToHeader } from './api'

class Auth {
  constructor() {
    // const token = this.getToken()
    // if (token) {
    //   this.authenticated = true
    // } else {
    // }
    this.authenticated = false
  }

  login(username, password, callback) {
    this.authenticated = true
    callback()
    // api
    //   .post('', {
    //     username,
    //     password,
    //   })
    //   .then(resp => {
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
    //this.removeToken()
  }

  isAuthenticated() {
    return this.authenticated
    //return this.authenticated && this.getToken()
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
