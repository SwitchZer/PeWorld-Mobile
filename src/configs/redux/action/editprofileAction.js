import api from '../../../configs/api';

// Action Types
export const FETCH_PROFILE_REQUEST = 'FETCH_PROFILE_REQUEST';
export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
export const FETCH_PROFILE_FAILURE = 'FETCH_PROFILE_FAILURE';
export const EDIT_PROFILE_REQUEST = 'EDIT_PROFILE_REQUEST';
export const EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS';
export const EDIT_PROFILE_FAILURE = 'EDIT_PROFILE_FAILURE';
export const ADD_SKILL_REQUEST = 'ADD_SKILL_REQUEST';
export const ADD_SKILL_SUCCESS = 'ADD_SKILL_SUCCESS';
export const ADD_SKILL_FAILURE = 'ADD_SKILL_FAILURE';
export const DELETE_SKILL_REQUEST = 'DELETE_SKILL_REQUEST';
export const DELETE_SKILL_SUCCESS = 'DELETE_SKILL_SUCCESS';
export const DELETE_SKILL_FAILURE = 'DELETE_SKILL_FAILURE';
export const UPLOAD_FILE_REQUEST = 'UPLOAD_FILE_REQUEST';
export const UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS';
export const UPLOAD_FILE_FAILURE = 'UPLOAD_FILE_FAILURE';
export const fetchProfileRequest = () => ({
  type: FETCH_PROFILE_REQUEST,
});

export const fetchProfileSuccess = profile => ({
  type: FETCH_PROFILE_SUCCESS,
  payload: profile,
});

export const fetchProfileFailure = error => ({
  type: FETCH_PROFILE_FAILURE,
  payload: error,
});

export const editProfileRequest = () => ({
  type: EDIT_PROFILE_REQUEST,
});

export const editProfileSuccess = () => ({
  type: EDIT_PROFILE_SUCCESS,
});

export const editProfileFailure = error => ({
  type: EDIT_PROFILE_FAILURE,
  payload: error,
});

export const addSkillRequest = () => ({
  type: ADD_SKILL_REQUEST,
});

export const addSkillSuccess = skill => ({
  type: ADD_SKILL_SUCCESS,
  payload: skill,
});

export const addSkillFailure = error => ({
  type: ADD_SKILL_FAILURE,
  payload: error,
});
// Action Creators

export const fetchProfile = () => {
  return dispatch => {
    dispatch(fetchProfileRequest());

    api
      .get('/workers/profile/self')
      .then(response => {
        const profile = response.data.data;
        dispatch(fetchProfileSuccess(profile));
      })
      .catch(error => {
        dispatch(fetchProfileFailure(error.message));
      });
  };
};

export const editProfile = data => {
  return dispatch => {
    dispatch(editProfileRequest());

    api
      .put('/workers/profile', data)
      .then(() => {
        dispatch(editProfileSuccess());
      })
      .catch(error => {
        dispatch(editProfileFailure(error.message));
      });
  };
};

export const editProfileRecruiter = data => {
  return dispatch => {
    dispatch(editProfileRequest());

    api
      .put('/recruiters/profile', data)
      .then(() => {
        dispatch(editProfileSuccess());
      })
      .catch(error => {
        dispatch(editProfileFailure(error.message));
      });
  };
};

export const addSkill = data => {
  return dispatch => {
    dispatch(addSkillRequest());

    api
      .post('/skills', data)
      .then(() => {
        dispatch(addSkillSuccess());
      })
      .catch(error => {
        dispatch(addSkillFailure(error.message));
      });
  };
};

export const deleteSkill = id => {
  return async dispatch => {
    try {
      dispatch({type: DELETE_SKILL_REQUEST});
      await api.delete(`/skills/${id}`);
      dispatch({type: DELETE_SKILL_SUCCESS, payload: id});
    } catch (error) {
      dispatch({type: DELETE_SKILL_FAILURE, payload: error.message});
    }
  };
};

export const uploadFileWorker = photo => async dispatch => {
  try {
    dispatch({type: UPLOAD_FILE_REQUEST});

    const formData = new FormData();
    formData.append('photo', photo);

    const response = await api.put('/workers/profile/photo', formData);

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

export const uploadFileRecruiter = photo => async dispatch => {
  try {
    dispatch({type: UPLOAD_FILE_REQUEST});

    const formData = new FormData();
    formData.append('photo', photo);

    const response = await api.put('/recruiters/profile/photo', formData);

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
