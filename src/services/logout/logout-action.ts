import { AppThunk } from '../../types/types';
import { SET_USER } from "../user/user-action";
import { BASE_URL } from '../../utils/rests-utils';
import { request } from '../../utils/rests-utils';
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED: 'LOGOUT_FAILED' = 'LOGOUT_FAILED';

export type TSignOutAction =
  | { type: typeof LOGOUT_SUCCESS }
  | { type: typeof LOGOUT_FAILED }
  | { type: typeof SET_USER, user: null };

export function signOut(): AppThunk {
    const url = BASE_URL + '/auth/logout';
    const body = {"token": localStorage.getItem("refreshToken")}
    return function(dispatch) {
      request(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then(result => {
            if (result && result.success) {
                dispatch({type: LOGOUT_SUCCESS});
                dispatch({
                    type: SET_USER,
                    user: null
                })
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
            } else {
                dispatch({type: LOGOUT_FAILED});
            }
        }).catch(err => {
            dispatch({type: LOGOUT_FAILED})
        })
    };
}