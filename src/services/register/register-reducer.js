import { REGISTER_SUCCESS, REGISTER_FAILED } from "./register-action";

const initialState = {
    registrationSuccessful: false,
    errMsg: null
  };

  export const registrationReducer = (state = initialState, action) => {
    switch (action.type) {
      case REGISTER_SUCCESS: {
        return { ...state, registrationSuccessful: true};
      }
      case REGISTER_FAILED: {
        return { ...state, registrationSuccessful: false, errMsg: action.errMsg };
      }
      default: {
        return state;
      }
    }
};