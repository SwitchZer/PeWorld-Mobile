// workerReducer.js

const initialState = {
  loggedIn: false,
  userInfo: null,
};

const logoutUser = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOGIN_INFO":
      return {
        ...state,
        loggedIn: true,
        userInfo: action.payload,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        loggedIn: false,
        userInfo: null,
      };
    // ... other cases
    default:
      return state;
  }
};

export default logoutUser;
