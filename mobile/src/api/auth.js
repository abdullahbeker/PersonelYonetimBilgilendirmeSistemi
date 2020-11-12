export const setAuthToken = (token, instance) => {
  instance.defaults.headers.common['Authorization'] = token
}

export const removeAuthToken = instance => {
  delete instance.defaults.headers.common['Authorization']
}
