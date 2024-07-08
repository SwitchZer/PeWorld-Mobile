import api from '../../../configs/api';

export const ADD_PORTFOLIO_REQUEST = 'ADD_PORTFOLIO_REQUEST';
export const ADD_PORTFOLIO_SUCCESS = 'ADD_PORTFOLIO_SUCCESS';
export const ADD_PORTFOLIO_FAILURE = 'ADD_PORTFOLIO_FAILURE';
export const FETCH_PORTFOLIO_REQUEST = 'FETCH_PORTFOLIO_REQUEST';
export const FETCH_PORTFOLIO_SUCCESS = 'FETCH_PORTFOLIO_SUCCESS';
export const FETCH_PORTFOLIO_FAILURE = 'FETCH_PORTFOLIO_FAILURE';
export const FETCH_MYPORTFOLIO_REQUEST = 'FETCH_MYPORTFOLIO_REQUEST';
export const FETCH_MYPORTFOLIO_SUCCESS = 'FETCH_MYPORTFOLIO_SUCCESS';
export const FETCH_MYPORTFOLIO_FAILURE = 'FETCH_MYPORTFOLIO_FAILURE';
export const UPLOAD_FILE_REQUEST = 'UPLOAD_FILE_REQUEST';
export const UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS';
export const UPLOAD_FILE_FAILURE = 'UPLOAD_FILE_FAILURE';
export const DELETE_PORTFOLIO_REQUEST = 'DELETE_PORTFOLIO_REQUEST';
export const DELETE_PORTFOLIO_SUCCESS = 'DELETE_PORTFOLIO_SUCCESS';
export const DELETE_PORTFOLIO_FAILURE = 'DELETE_PORTFOLIO_FAILURE';

export const addPortfolio = data => {
  return async dispatch => {
    dispatch({type: ADD_PORTFOLIO_REQUEST});

    try {
      const response = await api.post('/portofolio', data);
      dispatch({type: ADD_PORTFOLIO_SUCCESS, payload: response.data.data});
    } catch (error) {
      dispatch({type: ADD_PORTFOLIO_FAILURE, payload: error.message});
    }
  };
};

export const getMyPortfolio = () => {
  return async dispatch => {
    try {
      dispatch({type: FETCH_MYPORTFOLIO_REQUEST});
      const response = await api.get('/portofolio');
      dispatch({
        type: FETCH_MYPORTFOLIO_SUCCESS,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({type: FETCH_MYPORTFOLIO_FAILURE, payload: error});
    }
  };
};

export const getPortfolio = id => {
  return async dispatch => {
    try {
      dispatch({type: FETCH_PORTFOLIO_REQUEST});
      const response = await api.get(`/portofolio/${id}`);
      dispatch({type: FETCH_PORTFOLIO_SUCCESS, payload: response.data.data});
    } catch (error) {
      dispatch({type: FETCH_PORTFOLIO_FAILURE, payload: error});
    }
  };
};

export const uploadFile = file => async dispatch => {
  try {
    dispatch({type: UPLOAD_FILE_REQUEST});
    const response = await api.post('/upload', file);
    dispatch({
      type: UPLOAD_FILE_SUCCESS,
      payload: response.data.data.file_url,
    });
  } catch (error) {
    dispatch({type: UPLOAD_FILE_FAILURE, payload: error.message});
  }
};

export const deletePortfolio = id => {
  return async dispatch => {
    try {
      dispatch({type: DELETE_PORTFOLIO_REQUEST});
      await api.delete(`/portofolio/${id}`);
      dispatch({type: DELETE_PORTFOLIO_SUCCESS, payload: id});
    } catch (error) {
      dispatch({type: DELETE_PORTFOLIO_FAILURE, payload: error.message});
    }
  };
};
