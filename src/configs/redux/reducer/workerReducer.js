import {
  FETCH_WORKERS_REQUEST,
  FETCH_WORKERS_SUCCESS,
  FETCH_WORKERS_FAILURE,
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
} from '../../../configs/redux/action/workerAction';

const initialState = {
  workers: [],
  profile: {},
  loading: false,
  error: null,
};

const workerReducer = (state = initialState, action) => {
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
        workers: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_WORKERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default workerReducer;
