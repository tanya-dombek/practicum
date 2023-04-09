import { SET_USER } from "../user/user-action";
import { SET_AUTH } from "../login/login-action";
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export function postRegistration(user) {
    const url = 'https://norma.nomoreparties.space/api/auth/register';
    const body = {
        "email": user.email, 
        "password": user.password, 
        "name": user.name 
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
                    type: REGISTER_FAILED
                });
            }
            return res.json();
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