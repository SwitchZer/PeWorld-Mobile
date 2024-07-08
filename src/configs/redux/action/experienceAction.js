import api from '../../../configs/api';

export const ADD_EXPERIENCE_REQUEST = 'ADD_EXPERIENCE_REQUEST';
export const ADD_EXPERIENCE_SUCCESS = 'ADD_EXPERIENCE_SUCCESS';
export const ADD_EXPERIENCE_FAILURE = 'ADD_EXPERIENCE_FAILURE';
export const FETCH_EXPERIENCE_REQUEST = 'FETCH_EXPERIENCE_REQUEST';
export const FETCH_EXPERIENCE_SUCCESS = 'FETCH_EXPERIENCE_SUCCESS';
export const FETCH_EXPERIENCE_FAILURE = 'FETCH_EXPERIENCE_FAILURE';
export const FETCH_MYEXPERIENCE_REQUEST = 'FETCH_MYEXPERIENCE_REQUEST';
export const FETCH_MYEXPERIENCE_SUCCESS = 'FETCH_MYEXPERIENCE_SUCCESS';
export const FETCH_MYEXPERIENCE_FAILURE = 'FETCH_MYEXPERIENCE_FAILURE';
export const DELETE_EXPERIENCE_REQUEST = 'DELETE_EXPERIENCE_REQUEST';
export const DELETE_EXPERIENCE_SUCCESS = 'DELETE_EXPERIENCE_SUCCESS';
export const DELETE_EXPERIENCE_FAILURE = 'DELETE_EXPERIENCE_FAILURE';

export const addExperience = experienceData => {
  return async dispatch => {
    dispatch({type: ADD_EXPERIENCE_REQUEST});

    try {
      const response = await api.post('/experience', experienceData);
      dispatch({type: ADD_EXPERIENCE_SUCCESS, payload: response.data.data});
    } catch (error) {
      dispatch({type: ADD_EXPERIENCE_FAILURE, payload: error.message});
    }
  };
};

export const getMyExperience = () => {
  return async dispatch => {
    try {
      dispatch({type: FETCH_MYEXPERIENCE_REQUEST});
      const response = await api.get('/experience');
      dispatch({
        type: FETCH_MYEXPERIENCE_SUCCESS,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({type: FETCH_MYEXPERIENCE_FAILURE, payload: error});
    }
  };
};

export const getExperience = id => {
  return async dispatch => {
    try {
      dispatch({type: FETCH_EXPERIENCE_REQUEST});
      const response = await api.get(`/experience/${id}`);
      dispatch({type: FETCH_EXPERIENCE_SUCCESS, payload: response.data});
    } catch (error) {
      dispatch({type: FETCH_EXPERIENCE_FAILURE, payload: error});
    }
  };
};

export const deleteExperience = id => {
  return async dispatch => {
    try {
      dispatch({type: DELETE_EXPERIENCE_REQUEST});
      await api.delete(`/experience/${id}`);
      dispatch({type: DELETE_EXPERIENCE_SUCCESS, payload: id});
    } catch (error) {
      dispatch({type: DELETE_EXPERIENCE_FAILURE, payload: error.message});
    }
  };
};
