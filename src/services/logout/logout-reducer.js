import { LOGOUT_SUCCESS, LOGOUT_FAILED } from "./logout-action";

const initialState = {
    logoutSuccessful: false,
  };

  export const logoutReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGOUT_SUCCESS: {
        return { ...state, logoutSuccessful: action.logoutSuccessful};
      }
      case LOGOUT_FAILED: {
        return { ...state, logoutSuccessful: false };
      }
      default: {
        return state;
      }
    }
};