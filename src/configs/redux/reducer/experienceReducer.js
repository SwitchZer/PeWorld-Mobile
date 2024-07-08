// reducer.js
import {
  ADD_EXPERIENCE_REQUEST,
  ADD_EXPERIENCE_SUCCESS,
  ADD_EXPERIENCE_FAILURE,
  FETCH_EXPERIENCE_REQUEST,
  FETCH_EXPERIENCE_SUCCESS,
  FETCH_EXPERIENCE_FAILURE,
  FETCH_MYEXPERIENCE_REQUEST,
  FETCH_MYEXPERIENCE_SUCCESS,
  FETCH_MYEXPERIENCE_FAILURE,
} from "../action/experienceAction";

const initialState = {
  experience: [],
  myExperience: [],
  loading: false,
  error: null,
};

const experienceReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EXPERIENCE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_EXPERIENCE_SUCCESS:
      return {
        ...state,
        experience: [...state.experience, action.payload],
        loading: false,
      };
    case ADD_EXPERIENCE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_EXPERIENCE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_EXPERIENCE_SUCCESS:
      return {
        ...state,
        experience: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_EXPERIENCE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_MYEXPERIENCE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_MYEXPERIENCE_SUCCESS:
      return {
        ...state,
        myExperience: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_MYEXPERIENCE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default experienceReducer;
