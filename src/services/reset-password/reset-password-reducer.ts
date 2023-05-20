import { RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED, TResetPasswordAction } from "./reset-password-action";

type TInitialState = {
  resetPasswordSuccessful: boolean;
  errMsg?: string | null;
}

const initialState: TInitialState = {
    resetPasswordSuccessful: false,
    errMsg: null
  };

  export const resetPasswordReducer = (state = initialState, action: TResetPasswordAction): TInitialState => {
    switch (action.type) {
      case RESET_PASSWORD_SUCCESS: {
        return { ...state, resetPasswordSuccessful: true};
      }
      case RESET_PASSWORD_FAILED: {
        return { ...state, resetPasswordSuccessful: false, errMsg: action.errMsg };
      }
      default: {
        return state;
      }
    }
};