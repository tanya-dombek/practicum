import { GET_USER_SUCCESS, PATCH_USER_SUCCESS, GET_USER_FAILED, PATCH_USER_FAILED, SET_USER, TUserAction } from "./user-action";
import { TUserType } from "../../types/types";

type TInitialState = {
  user: TUserType | null;
  getUserSuccessful: boolean;
  updateUserSuccessful: boolean;
}

const initialState: TInitialState = {
    user: null,
    getUserSuccessful: false,
    updateUserSuccessful: false
  };

  export const userReducer = (state = initialState, action: TUserAction): TInitialState => {
    switch (action.type) {
      case GET_USER_SUCCESS: {
        return { ...state, getUserSuccessful: true};
      }
      case GET_USER_FAILED: {
        return { ...state, getUserSuccessful: false };
      }
      case PATCH_USER_SUCCESS: {
        return { ...state, updateUserSuccessful: true};
      }
      case PATCH_USER_FAILED: {
        return { ...state, updateUserSuccessful: false };
      }
      case SET_USER: {
        return { ...state, user: action.user}
      }
      default: {
        return state;
      }
    }
};