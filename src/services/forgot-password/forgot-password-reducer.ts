import { FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILED, TForgotPasswordAction } from "./forgot-password-action";

type TInitialState = {
  resetPasswordWasSent: boolean;
  errMsg?: string | null ;
} 

const initialState: TInitialState = {
    resetPasswordWasSent: false,
    errMsg: null
  };

  export const forgotPasswordReducer = (state = initialState, action: TForgotPasswordAction): TInitialState => {
    switch (action.type) {
      case FORGOT_PASSWORD_SUCCESS: {
        return { ...state, resetPasswordWasSent: true};
      }
      case FORGOT_PASSWORD_FAILED: {
        return { ...state, resetPasswordWasSent: false, errMsg: action.errMsg };
      }
      default: {
        return state;
      }
    }
};