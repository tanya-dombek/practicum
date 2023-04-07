import { RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED } from "./reset-password-action";

const initialState = {
    resetPasswordSuccessful: false,
  };

  export const resetPasswordReducer = (state = initialState, action) => {
    switch (action.type) {
      case RESET_PASSWORD_SUCCESS: {
        return { ...state, resetPasswordSuccessful: true};
      }
      case RESET_PASSWORD_FAILED: {
        return { ...state, resetPasswordSuccessful: false };
      }
      default: {
        return state;
      }
    }
};