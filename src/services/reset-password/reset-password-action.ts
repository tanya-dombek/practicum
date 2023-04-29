import { AppThunk, TResetPasswordType } from '../../types/types';
import { BASE_URL } from '../../utils/rests-utils';
import { request } from '../../utils/rests-utils';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export type TResetPasswordAction =
  | { type: typeof RESET_PASSWORD_SUCCESS }
  | { type: typeof RESET_PASSWORD_FAILED, errMsg?: string };

export function postResetPassword(newData: TResetPasswordType): AppThunk {
    const url = BASE_URL + '/password-reset/reset';
    const body = {
        "password": newData.password,
        "token": newData.code
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
                dispatch({
                    type: RESET_PASSWORD_SUCCESS
                });
            } else {
                dispatch({
                    type: RESET_PASSWORD_FAILED,
                    errMsg: result.message
                });
            }
        }).catch(err => {
            dispatch({
                type: RESET_PASSWORD_FAILED
            })
        })
    };
}