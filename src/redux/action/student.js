import axiosApiIntances from "../../utils/axios";

export const postStudent = (data) => {
  return {
    type: 'CREATE_STUDENT',
    payload: axiosApiIntances.post('/student/', data)
  }
}