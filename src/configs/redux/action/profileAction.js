import api from '../../../configs/api';

export const FETCH_PROFILE_REQUEST = 'FETCH_PROFILE_REQUEST';
export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
export const FETCH_PROFILE_FAILURE = 'FETCH_PROFILE_FAILURE';

export const FETCH_SKILL_REQUEST = 'FETCH_SKILL_REQUEST';
export const FETCH_SKILL_SUCCESS = 'FETCH_SKILL_SUCCESS';
export const FETCH_SKILL_FAILURE = 'FETCH_SKILL_FAILURE';

export const fetchSkillRequest = () => ({
  type: FETCH_SKILL_REQUEST,
});

export const fetchSkillSuccess = skills => ({
  type: FETCH_SKILL_SUCCESS,
  payload: skills,
});

export const fetchSkillFailure = error => ({
  type: FETCH_SKILL_FAILURE,
  payload: error,
});

export const getWorkerProfile = () => {
  return dispatch => {
    dispatch({type: FETCH_PROFILE_REQUEST});

    api
      .get('/workers/profile/self')
      .then(response => {
        dispatch({
          type: FETCH_PROFILE_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch(error => {
        dispatch({
          type: FETCH_PROFILE_FAILURE,
          payload: error.message,
        });
      });
  };
};

export const getRecruiterProfile = () => {
  return async dispatch => {
    dispatch({type: FETCH_PROFILE_REQUEST});

    try {
      const response = await api.get(`/recruiters/profile`);
      dispatch({
        type: FETCH_PROFILE_SUCCESS,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_PROFILE_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const getProfileSkills = () => {
  return dispatch => {
    dispatch(fetchSkillRequest());

    api
      .get('/skills')
      .then(response => {
        const skills = response.data.data;
        dispatch(fetchSkillSuccess(skills));
      })
      .catch(error => {
        dispatch(fetchSkillFailure(error.message));
      });
  };
};
