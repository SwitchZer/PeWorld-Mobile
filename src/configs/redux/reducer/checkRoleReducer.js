// reducer.js
import {
  CHECK_ROLE_REQUEST,
  CHECK_ROLE_SUCCESS,
  CHECK_ROLE_FAILURE,
} from '../../../configs/redux/action/checkRoleAction';

const initialState = {
  loading: false,
  role: null,
  error: null,
};

const roleReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_ROLE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CHECK_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        role: action.payload,
        error: null,
      };
    case CHECK_ROLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default roleReducer;
