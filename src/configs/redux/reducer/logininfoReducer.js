const initialState = {
  loggedIn: false,
  userInfo: { token: null },
  profileInfo: null,
};

const logininfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOGIN_INFO":
      return {
        ...state,
        loggedIn: true,
        userInfo: action.payload,
      };
    case "SET_PROFILE_INFO":
      return {
        ...state,
        profileInfo: action.payload,
      };
    // ... other cases
    default:
      return state;
  }
};

export default logininfoReducer;
