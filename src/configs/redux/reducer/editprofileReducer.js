import {
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  UPLOAD_FILE_REQUEST,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAILURE,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILURE,
  ADD_SKILL_REQUEST,
  ADD_SKILL_SUCCESS,
  ADD_SKILL_FAILURE,
  DELETE_SKILL_REQUEST,
  DELETE_SKILL_SUCCESS,
  DELETE_SKILL_FAILURE,
} from '../../../configs/redux/action/editprofileAction';

const initialState = {
  skills: [],
  profile: null,
  loading: false,
  error: null,
};

const editprofileReducer = (state = initialState, action) => {
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
    case EDIT_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case EDIT_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_SKILL_REQUEST:
    case DELETE_SKILL_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ADD_SKILL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        skills: [...state.skills, action.payload],
      };
    case DELETE_SKILL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        skills: state.skills.filter(skill => skill.id !== action.payload),
      };
    case ADD_SKILL_FAILURE:
    case DELETE_SKILL_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case UPLOAD_FILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case UPLOAD_FILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default editprofileReducer;
