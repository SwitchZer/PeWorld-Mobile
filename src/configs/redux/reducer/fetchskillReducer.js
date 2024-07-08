import {
  FETCH_SKILL_REQUEST,
  FETCH_SKILL_SUCCESS,
  FETCH_SKILL_FAILURE,
} from '../../../configs/redux/action/fetchSkillAction';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchSkillReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SKILL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SKILL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
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
