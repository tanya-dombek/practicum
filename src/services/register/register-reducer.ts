import { REGISTER_SUCCESS, REGISTER_FAILED, TRegistrationAction } from "./register-action";

type TInitialState = {
  registrationSuccessful: boolean;
  errMsg?: string | null;
}

const initialState: TInitialState = {
    registrationSuccessful: false,
    errMsg: null
  };

  export const registrationReducer = (state = initialState, action: TRegistrationAction): TInitialState => {
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