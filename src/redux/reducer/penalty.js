const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  msg: ''
}

const penalty = (state = initialState, action) => {
  switch (action.type) {
    case 'POST_PENALTY_PENDING':
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: ''        
      }
    case 'POST_PENALTY_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: {},
        msg: action.payload.response.data.msg        
      }
    case 'POST_PENALTY_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg        
      }
    default:
      return state
  }
}

export default penalty
