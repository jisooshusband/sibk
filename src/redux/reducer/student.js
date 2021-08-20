const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  msg: ''
}

const student = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_STUDENT_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: ''
      }
    case 'CREATE_STUDENT_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: {},
        msg: action.payload.response.data.msg
      }
    case 'CREATE_STUDENT_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg
      }
      default: 
      return {
        ...state
      }
  }
}

export default student
