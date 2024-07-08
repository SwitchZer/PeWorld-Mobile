// actions/hireActions.js
import api from '../../../configs/api';

export const HIRE_REQUEST = 'HIRE_REQUEST';
export const HIRE_SUCCESS = 'HIRE_SUCCESS';
export const HIRE_FAILURE = 'HIRE_FAILURE';
export const FETCH_WORKERS_REQUEST = 'FETCH_WORKERS_REQUEST';
export const FETCH_WORKERS_SUCCESS = 'FETCH_WORKERS_SUCCESS';
export const FETCH_WORKERS_FAILURE = 'FETCH_WORKERS_FAILURE';

export const hireRequest = () => ({
  type: HIRE_REQUEST,
});

export const hireSuccess = data => ({
  type: HIRE_SUCCESS,
  payload: data,
});

export const hireFailure = error => ({
  type: HIRE_FAILURE,
  payload: error,
});

export const hireWorkers = formData => async dispatch => {
  try {
    dispatch(hireRequest());

    const response = await api.post('/hire', formData);

    dispatch(hireSuccess(response.data));
  } catch (error) {
    dispatch(hireFailure(error.message));
  }
};

export const hireHistoryWorkers = () => {
  return async dispatch => {
    try {
      dispatch({type: 'FETCH_WORKERS_REQUEST'});
      const response = await api.get('/hire/workers');
      dispatch({type: 'FETCH_WORKERS_SUCCESS', payload: response.data.data});
    } catch (error) {
      dispatch({type: 'FETCH_WORKERS_FAILURE', payload: error.message});
    }
  };
};
