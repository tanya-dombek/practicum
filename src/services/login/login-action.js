import { SET_USER } from "../user/user-action";
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const SET_AUTH = 'SET_AUTH';

export function signIn(user) {
    const url = 'https://norma.nomoreparties.space/api/auth/login';
    const body = {
        "email": user.email, 
        "password": user.password, 
      }
    return function(dispatch) {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then(res => {
        console.log(res);
            if (!res.ok) {
                dispatch({type: LOGIN_FAILED});
            }
            return res.json();
        }).then(result => {
            console.log(result);
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
            console.log(err);
            dispatch({
                type: LOGIN_FAILED
            })
        })
    };
}