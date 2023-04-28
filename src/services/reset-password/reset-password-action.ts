import { AppThunk, TResetPasswordType } from '../../types/types';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export type TResetPasswordAction =
  | { type: 'RESET_PASSWORD_SUCCESS' }
  | { type: 'RESET_PASSWORD_FAILED', errMsg?: string };

export function postResetPassword(newData: TResetPasswordType): AppThunk {
    const url = ' https://norma.nomoreparties.space/api/password-reset/reset';
    const body = {
        "password": newData.password,
        "token": newData.code
      }
    return function(dispatch) {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then(res => {
            if (!res.ok) {
                dispatch({
                    type: RESET_PASSWORD_FAILED
                });
            }
            return res.json();
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