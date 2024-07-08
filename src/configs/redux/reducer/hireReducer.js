import {
  FETCH_WORKERS_FAILURE,
  FETCH_WORKERS_REQUEST,
  FETCH_WORKERS_SUCCESS,
} from "../action/hireAction";

const initialState = {
  history: [],
  loading: false,
  error: null,
};

const hireReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WORKERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_WORKERS_SUCCESS:
      return {
        ...state,
        history: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_WORKERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default hireReducer;
