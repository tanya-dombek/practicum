import { LOGIN_SUCCESS, LOGIN_FAILED, SET_AUTH } from "./login-action";

const initialState = {
    user: null,
    isAuthChecked: false,
    errMsg: null,
    loginSuccessful: false,
  };

  export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_SUCCESS: {
        return { ...state, loginSuccessful: true, user: action.user};
      }
      case LOGIN_FAILED: {
        return { ...state, loginSuccessful: false, errMsg: action.errMsg };
      }
      case SET_AUTH: {
        return { ...state, isAuthChecked: action.isAuthChecked}
      }
      default: {
        return state;
      }
    }
};