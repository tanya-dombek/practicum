import { LOGIN_SUCCESS, LOGIN_FAILED, SET_AUTH, TSignInAction } from "./login-action";

type TInitialState = {
  isAuthChecked: boolean;
  errMsg?: string | null;
  loginSuccessful: boolean;
}

export const initialState: TInitialState = {
    isAuthChecked: false,
    errMsg: null,
    loginSuccessful: false,
  };

  export const loginReducer = (state = initialState, action: TSignInAction): TInitialState => {
    
    switch (action.type) {
      case LOGIN_SUCCESS: {
        return { ...state, loginSuccessful: true};
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