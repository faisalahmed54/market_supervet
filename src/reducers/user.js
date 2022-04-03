import { USERS_GET_ALL, USER_ERROR, USER_LOADING } from "../actions/types";

const initialState = {
  adds: null,
  delets: null,
  users: null,
  loading: false,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };

    case USERS_GET_ALL:
      return {
        ...state,
        users: payload,
        loading: false,
      };
    case USER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
