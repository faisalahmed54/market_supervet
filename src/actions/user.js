// @access  Private
import axios from "axios";
import { USERS_GET_ALL, USER_ERROR, USER_LOADING } from "./types";
import { Base_url } from "../requester";

export const getallusers = () => async (dispatch) => {
  dispatch({
    type: USER_LOADING,
  });
  try {
    const res = await axios.get(`${Base_url}/users`);
    if (res.data.status == "Success") {
      dispatch({
        type: USERS_GET_ALL,
        payload: res.data.data,
      });
    }
  } catch (err) {
    dispatch({
      type: USER_ERROR,
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  dispatch({
    type: USER_LOADING,
  });
  try {
    const res = await axios.delete(`${Base_url}/users/${id}`);
    if (res.data.status == "Success") {
      // dispatch({
      //   type: ADMIN_DELETE,
      //   payload: res.data,
      // });
      dispatch(getallusers());
    }
  } catch (err) {
    dispatch({
      type: USER_ERROR,
    });
  }
};
