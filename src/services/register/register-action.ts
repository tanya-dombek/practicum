import { TUserType, AppThunk, TRegistrationType } from '../../types/types';
import { SET_USER } from "../user/user-action";
import { SET_AUTH } from "../login/login-action";
import { BASE_URL } from '../../utils/rests-utils';
import { request } from '../../utils/rests-utils';
export const REGISTER_SUCCESS: 'REGISTER_SUCCESS' = 'REGISTER_SUCCESS';
export const REGISTER_FAILED: 'REGISTER_FAILED' = 'REGISTER_FAILED';

export type TRegistrationAction =
  | { type: typeof REGISTER_SUCCESS }
  | { type: typeof REGISTER_FAILED, errMsg?: string }
  | { type: typeof SET_AUTH, isAuthChecked: boolean }
  | { type: typeof SET_USER, user: TUserType };

export function postRegistration(user: TRegistrationType): AppThunk {
    const url = BASE_URL + '/auth/register';
    const body = {
        "email": user.email, 
        "password": user.password, 
        "name": user.name 
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
                dispatch({type: REGISTER_SUCCESS,});
                localStorage.setItem("accessToken", result.accessToken);
                localStorage.setItem("refreshToken", result.refreshToken);
                dispatch({
                    type: SET_AUTH,
                    isAuthChecked: true
                })
                dispatch({
                    type: SET_USER,
                    user: result.user
                });

            } else {
                dispatch({
                    type: REGISTER_FAILED,
                    errMsg: result.message
                });
            }
        }).catch(err => {
            dispatch({
                type: REGISTER_FAILED
            })
        })
    };
}