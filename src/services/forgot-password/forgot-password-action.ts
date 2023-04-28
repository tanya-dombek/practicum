import { AppThunk } from '../../types/types';
import { BASE_URL } from '../../utils/rests-utils';
import { request } from '../../utils/rests-utils';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export type TForgotPasswordAction =
  | { type: typeof FORGOT_PASSWORD_SUCCESS }
  | { type: typeof FORGOT_PASSWORD_FAILED, errMsg?: string };

export function postForgotPassword(email: string): AppThunk {
    const url = BASE_URL + '/password-reset';
    const body = {"email": email}
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
                    type: FORGOT_PASSWORD_SUCCESS,
                });
            } else {
                dispatch({
                    type: FORGOT_PASSWORD_FAILED,
                    errMsg: result.message
                });
            }
        }).catch(err => {
            dispatch({
                type: FORGOT_PASSWORD_FAILED
            })
        })
    };
}