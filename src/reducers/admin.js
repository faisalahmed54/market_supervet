import {
  ADMIN_GET_ALL,
  ADMIN_ERROR,
  ADMIN_LOADING,
  ADMIN_CREATE,
  ADMIN_DELETE,
} from "../actions/types";

const initialState = {
  adds: null,
  delets: null,
  admins: null,
  loading: false,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_CREATE:
      return {
        ...state,
        adds: payload,
        loading: false,
      };
    case ADMIN_DELETE:
      return {
        ...state,
        delets: payload,
        loading: false,
      };

    case ADMIN_GET_ALL:
      return {
        ...state,
        admins: payload,
        loading: false,
      };
    case ADMIN_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
