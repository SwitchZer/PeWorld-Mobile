import api from '../../../configs/api';

export const FETCH_SKILL_REQUEST = 'FETCH_SKILL_REQUEST';
export const FETCH_SKILL_SUCCESS = 'FETCH_SKILL_SUCCESS';
export const FETCH_SKILL_FAILURE = 'FETCH_SKILL_FAILURE';
export const FETCH_SKILLS_REQUEST = 'FETCH_SKILLS_REQUEST';
export const FETCH_SKILLS_SUCCESS = 'FETCH_SKILLS_SUCCESS';
export const FETCH_SKILLS_FAILURE = 'FETCH_SKILLS_FAILURE';

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
    dispatch({type: FETCH_SKILLS_REQUEST});

    api
      .get('/skills')
      .then(response => {
        const skills = response.data.data;
        dispatch({type: FETCH_SKILLS_SUCCESS, payload: skills});
      })
      .catch(error => {
        dispatch({type: FETCH_SKILLS_FAILURE, payload: error});
      });
  };
};

export const fetchSkillsWorkers = id => {
  return dispatch => {
    dispatch(fetchSkillRequest());

    api
      .get(`/skills/${id}`)
      .then(response => {
        const skills = response.data.data;
        dispatch(fetchSkillSuccess(skills));
      })
      .catch(error => {
        dispatch(fetchSkillFailure(error.message));
      });
  };
};
