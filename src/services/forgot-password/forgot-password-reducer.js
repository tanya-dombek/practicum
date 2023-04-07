import { FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILED } from "./forgot-password-action";

const initialState = {
    resetPasswordWasSent: false,
    errorMsg: null
  };

  export const forgotPasswordReducer = (state = initialState, action) => {
    switch (action.type) {
      case FORGOT_PASSWORD_SUCCESS: {
        return { ...state, resetPasswordWasSent: true};
      }
      case FORGOT_PASSWORD_FAILED: {
        return { ...state, resetPasswordWasSent: false };
      }
      default: {
        return state;
      }
    }
};