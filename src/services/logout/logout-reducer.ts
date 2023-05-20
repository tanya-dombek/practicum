import { LOGOUT_SUCCESS, LOGOUT_FAILED, TSignOutAction } from "./logout-action";

type TInitialState = {
  logoutSuccessful: boolean;
}

const initialState: TInitialState = {
    logoutSuccessful: false,
  };

  export const logoutReducer = (state = initialState, action: TSignOutAction): TInitialState => {
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