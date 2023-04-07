import { GET_USER_SUCCESS, PATCH_USER_SUCCESS, GET_USER_FAILED, PATCH_USER_FAILED, SET_USER } from "./user-action";

const initialState = {
    user: null,
    getUserSuccessful: false,
    updateUserSuccessful: false
  };

  export const userReducer = (state = initialState, action) => {
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