import { AppThunk, TUserType, TChangeUserInfoBody, AppDispatch } from '../../types/types';
import { SET_AUTH } from "../login/login-action";
import { BASE_URL } from '../../utils/rests-utils';
import { checkResponse, request } from '../../utils/rests-utils';
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';
export const GET_USER_FAILED: 'GET_USER_FAILED' = 'GET_USER_FAILED';
export const PATCH_USER_SUCCESS: 'PATCH_USER_SUCCESS' = 'PATCH_USER_SUCCESS';
export const PATCH_USER_FAILED: 'PATCH_USER_FAILED' = 'PATCH_USER_FAILED';
export const SET_USER: 'SET_USER' = 'SET_USER';

export type TUserAction =
  | { type: typeof GET_USER_SUCCESS }
  | { type: typeof GET_USER_FAILED }
  | { type: typeof PATCH_USER_SUCCESS }
  | { type: typeof PATCH_USER_FAILED }
  | { type: typeof SET_USER, user: TUserType }
  | { type: typeof SET_AUTH, isAuthChecked: boolean };

export const refreshToken = (): Promise<any> => {
    const url = BASE_URL + '/auth/token';
    return request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          token: localStorage.getItem("refreshToken"),
      })
  });
};

export const fetchWithRefresh = async (url: string, options: any) => {
    try {
      const res = await fetch(url, options);
      return await checkResponse(res);
    } catch (err: any) {
      if (err.message === "jwt expired") {
        const refreshData = await refreshToken();
        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }
        localStorage.setItem("refreshToken", refreshData.refreshToken);
        localStorage.setItem("accessToken", refreshData.accessToken);
        options.headers.authorization = refreshData.accessToken;
        const res = await fetch(url, options);
        return await checkResponse(res);
      } else {
        return Promise.reject(err);
      }
    }
  };

export const getUser = () => {
    const url =  BASE_URL + '/auth/user';
    return async (dispatch: AppDispatch) => {
      try {
        const response = await fetchWithRefresh(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            authorization: localStorage.getItem("accessToken"),
          },
        });
        dispatch({ type: GET_USER_SUCCESS });
        dispatch({
          type: SET_USER,
          user: response.user,
        });
      } catch (error) {
        dispatch({ type: GET_USER_FAILED });
      }
    };
  };

  export const changeUserInfo = (user: TChangeUserInfoBody, password: string): AppThunk => {
    const url =  BASE_URL + '/auth/user';
    const body: TChangeUserInfoBody = {
        "name": user.name,
        "email": user.email, 
    }
    if (password !== '') {
      body.password = password;
    }
    return async (dispatch) => {
      try {
        const response = await fetchWithRefresh(url, {
            method: 'PATCH',
            headers: {
            'Content-Type': "application/json;charset=utf-8",
            authorization: localStorage.getItem("accessToken")
            },
            body: JSON.stringify(body)
        });
        dispatch({ type: PATCH_USER_SUCCESS });
        dispatch({
          type: SET_USER,
          user: response.user,
        });
      } catch (error) {
        dispatch({ type: PATCH_USER_FAILED });
      }
    };
  };

export function checkUserAuth (): AppThunk {
    return function (dispatch) {
      if (localStorage.getItem("accessToken")) {
          dispatch(getUser())
              .catch(() => {
                  localStorage.removeItem("accessToken");
                  localStorage.removeItem("refreshToken");
                  dispatch({
                    type: SET_USER,
                    user: null
                });
              })
              .finally(() => dispatch({
                type: SET_AUTH,
                isAuthChecked: true
            }));
      } else {
          dispatch({
            type: SET_AUTH,
            isAuthChecked: true
        });
      }
    };
};