import axiosApiIntances from "../../utils/axios";

export const updateProfile = (data) => {
  return {
    type: "UPDATE",
    payload: axiosApiIntances.patch("user", data)
  }
}

export const getUser = () => {
  return {
    type: "GET_USER",
    payload: axiosApiIntances.get("user")
  }
}