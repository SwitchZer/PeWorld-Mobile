import api from '../../../configs/api';

export const FETCH_PROFILE_REQUEST = 'FETCH_PROFILE_REQUEST';
export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
export const FETCH_PROFILE_FAILURE = 'FETCH_PROFILE_FAILURE';
export const EDIT_PROFILE_REQUEST = 'EDIT_PROFILE_REQUEST';
export const EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS';
export const EDIT_PROFILE_FAILURE = 'EDIT_PROFILE_FAILURE';
export const UPLOAD_FILE_REQUEST = 'UPLOAD_FILE_REQUEST';
export const UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS';
export const UPLOAD_FILE_FAILURE = 'UPLOAD_FILE_FAILURE';

export const getProfile = () => {
  return dispatch => {
    dispatch({type: FETCH_PROFILE_REQUEST});

    api
      .get('/recruiters/profile')
      .then(response => {
        const profile = response.data.data;
        dispatch({type: FETCH_PROFILE_SUCCESS, payload: profile});
      })
      .catch(error => {
        dispatch({type: FETCH_PROFILE_FAILURE, payload: error});
      });
  };
};

export const editProfile = data => {
  return dispatch => {
    dispatch({type: EDIT_PROFILE_REQUEST});

    api
      .put('/recruiters/profile', data)
      .then(() => {
        dispatch({type: EDIT_PROFILE_SUCCESS});
      })
      .catch(error => {
        dispatch({type: EDIT_PROFILE_FAILURE, payload: error});
      });
  };
};

export const uploadFileRecruiter = file => async dispatch => {
  try {
    dispatch({type: UPLOAD_FILE_REQUEST});

    const formData = new FormData();
    formData.append('file', file);

    const response = await api('/recruiters/profile/photo', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    dispatch({
      type: UPLOAD_FILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPLOAD_FILE_FAILURE,
      payload: error.message,
    });
  }
};
