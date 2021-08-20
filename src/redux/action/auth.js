import axiosApiIntances from "../../utils/axios";

export const teacherLogin = (data) => {
  return {
    type: 'TEACHER_LOGIN',
    payload: axiosApiIntances.post('auth/teacher/login', data)
  }
}

export const studentLogin = (data) => {
  return {
    type: 'STUDENT_LOGIN',
    payload: axiosApiIntances.post('auth/student/login', data)
  }
}

export const requestOtpTeacher = (data) => {
  return {
    type: 'TEACHER_OTP',
    payload: axiosApiIntances.post('auth/teacher/sendOtp', data)
  }
}

export const requestOtpStudent = (data) => {
  return {
    type: 'STUDENT_OTP',
    payload: axiosApiIntances.post('auth/student/sendOtp', data)
  }
}

export const registerStudent = (data) => {
  return {
    type: 'REGISTER_STUDENT',
    payload: axiosApiIntances.post('auth/student/register', data)
  }
}

export const registerTeacher = (data) => {
  return {
    type: 'REGISTER_TEACHER',
    payload: axiosApiIntances.post('auth/teacher/register', data)
  }
}

export const logout = (data) => {
  return {
    type: 'LOGOUT'
  }
}