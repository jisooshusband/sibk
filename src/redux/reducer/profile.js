const initialState = {
  isLoading: false,
  isError: false,
  msg: "",
  data: []
}

const update = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: ""
      }
    case "UPDATE_REJECTED":
      return {
        ...state,
        isError: true,
        isLoading: false,
        msg: action.payload.response.data.msg
      }
    case "UPDATE_FULFILLED":
      return {
        ...state,
        isError: false,
        isLoading: false,
        msg: action.payload.data.msg
      }
    case "GET_USER_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: ""
      }
    case "GET_USER_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg
      }
    case "GET_USER_FULFILLED":
      return {
        ...state,
        isLoading: true,
        isError: false,
        data: {
          ...state.data,
          ...action.payload.data.data
        },
        msg: action.payload.data.msg
      }
    default:
      return state;
  }
}

export default update
