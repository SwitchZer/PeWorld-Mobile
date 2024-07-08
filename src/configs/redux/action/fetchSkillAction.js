import api from '../../../configs/api';

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

export const fetchSkills = () => {
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
