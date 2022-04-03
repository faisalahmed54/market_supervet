import { USERS_GET_ALL, USER_ERROR, USER_LOADING } from "../actions/types";

const initialState = {
  marketItems: null
};

export default function (state = initialState, action) {

  switch (action.type) {
    case 'SELECTED_MARKET_ITEM':
      return {...state, marketItems: action.payload}
    case 'RESET' : 
      return 0
    default: return state
    }
}
