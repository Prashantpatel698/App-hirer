import axios from "axios";
import { login, logout } from "../Reducers/employeeSlice";

export const currentUser = () => async (dispatch, getState) => {
    try {
        const { data: employeeData } = await axios.get('/api/employe/current')
        if (employeeData.employe) {
            dispatch(login({ employeeData }))
        }
    } catch (error) {
        console.log(error.response)
    }
  } 

export const asyncSignup = (employeeData) => async (dispatch, getState) => {
  try {
    await axios.post("/api/employe/signup", employeeData);
    dispatch(currentUser());
  } catch (error) {
    console.log(error.message);
  }
};

export const asyncLogin = (employeeData) => async (dispatch, getState) => {
    try {
        await axios.post('/api/employe/signin', employeeData)
        dispatch(currentUser())
    } catch (error) {
        return error.response
    }
}
export const asyncLogout = () => async (dispatch, getState) => {
  try {
    await axios.get("/api/employe/signout");
    dispatch(logout());
  } catch (error) {
    console.log(error.message);
  }
};

export const asyncSendMail = (formData) => async (dispatch, getState) => {
    try {
        await axios.post('/api/employe/send-mail', formData)
    } catch (error) {
        return error.response
    }
}

export const asyncForgrtPassword =
  (id, formData) => async (dispatch, getState) => {
    try {
      await axios.post(`/api/employe/forget-link/${id}`, formData);
    } catch (error) {
        return error.response
    }
  };

export const asyncResetPassword =
  (id, formData) => async (dispatch, getState) => {
    try {
      const { data } = await axios.post(
        `/api/employe/reset-password/${id}`,
        formData
      );
      console.log(data);
    } catch (error) {
        return error.response
    }
  };

export const asyncUploadProfileImageEmployee =
  (id, imageFile) => async (dispatch, getState) => {
    try {
        // console.log("one")
        await axios.post(`/api/employe/avatar/${id}`, imageFile)
        // console.log("two")
        dispatch(currentUser())
    } catch (error) {
      console.log(error.message);
    }
  };
