import { AppThunk, TUserType, TLoginType } from '../../types/types';
import { BASE_URL } from '../../utils/rests-utils';
import { SET_USER } from "../user/user-action";
import { request } from '../../utils/rests-utils';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const SET_AUTH = 'SET_AUTH';

export type TSignInAction =
  | { type: typeof LOGIN_SUCCESS }
  | { type: typeof LOGIN_FAILED, errMsg?: string }
  | { type: typeof SET_AUTH, isAuthChecked: boolean }
  | { type: typeof SET_USER, user: TUserType };

export function signIn(user: TLoginType): AppThunk {
    const url = BASE_URL + '/auth/login';
    const body = {
        "email": user.email, 
        "password": user.password, 
      }
    return function(dispatch) {
      request(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then(result => {
            if (result && result.success) {
                localStorage.setItem("accessToken", result.accessToken);
                localStorage.setItem("refreshToken", result.refreshToken);
                dispatch({type: LOGIN_SUCCESS});
                dispatch({
                    type: SET_AUTH,
                    isAuthChecked: true
                })
                dispatch({
                    type: SET_USER,
                    user: result.user
                });
            } else {
                dispatch({type: LOGIN_FAILED, errMsg: result.message});
            }
        }).catch(err => {
            dispatch({
                type: LOGIN_FAILED
            })
        })
    };
}