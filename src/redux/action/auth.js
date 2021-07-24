import axiosApiIntances from '../../utils/axios'

export const signin = (data) => {
  return {
    type: 'SIGNIN',
    payload: axiosApiIntances.post('auth/login', data),
  }
}

export const signup = (data) => {
  return {
    type: 'SIGNUP',
    payload: axiosApiIntances.post('auth/register', data),
  }
}

export const signout = (data) => {
  return {
    type: 'SIGNOUT',
  }
}

export const getProfile = () => {
  return {
    type: 'GET_PROFILE',
    payload: axiosApiIntances.get('user')
  }
}