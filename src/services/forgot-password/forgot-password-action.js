export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export function postForgotPassword(email) {
    const url = 'https://norma.nomoreparties.space/api/password-reset';
    const body = {"email": email}
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
                    type: FORGOT_PASSWORD_FAILED
                });
            }
            return res.json();
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