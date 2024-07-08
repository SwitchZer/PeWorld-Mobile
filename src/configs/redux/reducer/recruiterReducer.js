// reducer.js
import {
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILURE,
  UPLOAD_FILE_REQUEST,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAILURE,
} from '../../../configs/redux/action/recruiterAction';

const initialState = {
  profile: {},
  recruiter: [],
  loading: false,
  error: null,
  uploadedFile: null,
};

const recruiterReducer = (state = initialState, action) => {
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
        profile: action.payload,
        loading: false,
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
    case UPLOAD_FILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        uploadedFile: action.payload,
        loading: false,
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

export default recruiterReducer;
