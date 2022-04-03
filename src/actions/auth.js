// @access  Private
import axios from "axios";
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AUTH_LOADING,
} from "./types";
import setAuthToken from "../utils/setAuthToken";
import { Base_url } from "../requester";
export const loadUser = () => async (dispatch) => {
  dispatch({
    type: AUTH_LOADING,
  });

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(Base_url + "/users/auth");
    if (res.data.status == "Success") {
      dispatch({
        type: USER_LOADED,
        payload: res.data.data,
      });
    } else if (res.data.success == false) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  dispatch({
    type: AUTH_LOADING,
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    email,
    password,
  });

  try {
    const res = await axios.post(Base_url + "/auth/login", body, config);
    if (res.data.token) {
      setAuthToken(res.data.token);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    }
  } catch (err) {
    if (err.response) {
      const errors = err.response.data.errors;
      if (errors) {
        // errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
    }
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data,
    });
  }
};


export const currentUser = () => async (dispatch) => {
  let myPromise = new Promise(async (myResolve, myReject) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get(Base_url + "/users/auth");
      if (res.data.status == "Success") {
        myResolve(res.data.data);
      }
    } catch (err) {
      myReject("error");
    }
  });
  return myPromise;
};

export const logout = () => (dispatch) => {
  setAuthToken(false);
  dispatch({ type: LOGOUT });
};
