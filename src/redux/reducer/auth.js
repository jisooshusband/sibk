const initialState = {
  data: {},
  isLoading: false,
  isError: true,
  msg: ''
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'TEACHER_LOGIN_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: ''
      }
    case 'TEACHER_LOGIN_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: {},
        msg: action.payload.response.data.msg
      }
    case 'TEACHER_LOGIN_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg
      }
    case 'STUDENT_LOGIN_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: ''
      }
    case 'STUDENT_LOGIN_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: {},
        msg: action.payload.response.data.msg
      }
    case 'STUDENT_LOGIN_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg
      }
    case 'TEACHER_OTP_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: ''
      }
    case 'TEACHER_OTP_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: {},
        msg: action.payload.response.data.msg        
      }
    case 'TEACHER_OTP_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg
      }
    case 'STUDENT_OTP_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: ''        
      }
    case 'STUDENT_OTP_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: {},
        msg: action.payload.response.data.msg        
      }
    case 'STUDENT_OTP_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg        
      }
    case 'STUDENT_REGISTER_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: ''                
      }
    case 'STUDENT_REGISTER_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: {},
        msg: action.payload.response.data.msg               
      }
    case 'STUDENT_REGISTER_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg                
      }
    case 'TEACHER_REGISTER_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: ''                
      }
    case 'TEACHER_REGISTER_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg                
      }
    case 'TEACHER_REGISTER_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: {},
        msg: action.payload.response.data.msg               
      }
    default: 
      return state
  }
}

export default auth
