import api from './apiConfig'


export const authUser = async (type, credentials) => {
  if (type === 'Sign Up') {
    return await signUpUser(credentials).then(() => loginUser(credentials))
  } else {
    return loginUser(credentials)
  }
}
export const loginUser = async credentials => {
  const resp = await api.post('/auth/login', credentials)

  localStorage.setItem('token', resp.data.token)
  localStorage.setItem('user', JSON.stringify(resp.data.user))
  return resp.data
}
const signUpUser = async credentials => {
  const resp = await api.post('/auth/signup', credentials)
  return resp.data
}

export const signOutUser = () => {
  console.log('logged out')
  localStorage.removeItem('token')  
  localStorage.removeItem('user')
}