import {
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  FETCH_SKILL_REQUEST,
  FETCH_SKILL_SUCCESS,
  FETCH_SKILL_FAILURE,
} from '../../../configs/redux/action/profileAction';

const initialState = {
  profile: {},
  skills: [],
  loading: false,
  error: null,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: action.payload,
      };
    case FETCH_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_SKILL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SKILL_SUCCESS:
      return {
        ...state,
        skills: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_SKILL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
