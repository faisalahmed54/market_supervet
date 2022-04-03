// @access  Private
import axios from "axios";
import {
  ADMIN_GET_ALL,
  ADMIN_ERROR,
  ADMIN_LOADING,
  ADMIN_CREATE,
  ADMIN_DELETE,
} from "./types";
import Swal from "sweetalert2";
import { Base_url } from "../requester";

export const getAllAdmins = () => async (dispatch) => {
  dispatch({
    type: ADMIN_LOADING,
  });
  try {
    const res = await axios.get(`${Base_url}/admin`);
    if (res.data.status == "Success") {
      dispatch({
        type: ADMIN_GET_ALL,
        payload: res.data.data,
      });
    }
  } catch (err) {
    dispatch({
      type: ADMIN_ERROR,
    });
  }
};

export const createAdmin = (data) => async (dispatch) => {
  dispatch({
    type: ADMIN_LOADING,
  });
  try {
    const res = await axios.post(`${Base_url}/admin/create`, data);
    if (res.data.status == "Success") {
      dispatch({
        type: ADMIN_CREATE,
        payload: res.data,
      });
      // dispatch(getAllAdmins());
      await Swal.fire("Admin", res.data.message, "success");
    }
  } catch (err) {
    if (err.response) {
      const errors = err.response.data.errors;
      if (errors) {
        // errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
    }
    dispatch({
      type: ADMIN_ERROR,
      payload: err.response.data,
    });
  }
};

export const deleteAdmin = (id) => async (dispatch) => {
  dispatch({
    type: ADMIN_LOADING,
  });
  try {
    const res = await axios.delete(`${Base_url}/admin/${id}`);
    if (res.data.status == "Success") {
      dispatch({
        type: ADMIN_DELETE,
        payload: res.data,
      });
      dispatch(getAllAdmins());
      await Swal.fire("Admin", res.data.message, "success");
    }
  } catch (err) {
    dispatch({
      type: ADMIN_ERROR,
    });
  }
};
