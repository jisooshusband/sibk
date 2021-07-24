const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  msg: ''
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNIN_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: ''
      }
    case 'SIGNIN_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: {},
        msg: action.payload.response.data.msg
      }
    case 'SIGNIN_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg
      }
    case 'SIGNUP_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: ''
      }
    case 'SIGNUP_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg
      }
    case 'SIGNUP_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg
      }
    case 'GET_PROFILE_PENDING':
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: ''
      }
    case 'GET_PROFILE_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg
      }
    case 'GET_PROFILE_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: { ...state.data, ...action.payload.data.data },
        msg: action.payload.data.msg
      }
    case 'SIGNOUT':
      localStorage.clear()
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: {},
        msg: 'Signed out successfully'
      }
    default:
      return state
  }
}

export default auth
