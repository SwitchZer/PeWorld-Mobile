import api from '../../../configs/api';

export const CHECK_ROLE_REQUEST = 'CHECK_ROLE_REQUEST';
export const CHECK_ROLE_SUCCESS = 'CHECK_ROLE_SUCCESS';
export const CHECK_ROLE_FAILURE = 'CHECK_ROLE_FAILURE';

export const checkRoleRequest = () => ({
  type: CHECK_ROLE_REQUEST,
});

export const checkRoleSuccess = role => ({
  type: CHECK_ROLE_SUCCESS,
  payload: role,
});

export const checkRoleFailure = error => ({
  type: CHECK_ROLE_FAILURE,
  payload: error,
});

export const checkRole = () => {
  return async dispatch => {
    try {
      dispatch(checkRoleRequest);
      const response = await api.get('/auth/check-role');
      dispatch(checkRoleSuccess(response.data.data.data.role));
    } catch (error) {
      console.error('Error checking user role:', error);
      dispatch(checkRoleFailure(error.message));
    }
  };
};
