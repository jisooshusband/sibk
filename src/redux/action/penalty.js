import axiosApiIntances from '../../utils/axios'

export const postPenalty = (data) => {
  return {
    type: 'POST_PENALTY',
    payload: axiosApiIntances.post('penalty/', data)
  }
}
