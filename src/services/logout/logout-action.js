import { SET_USER } from "../user/user-action";
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export function signOut() {
    const url = 'https://norma.nomoreparties.space/api/auth/logout';
    const body = {"token": localStorage.getItem("refreshToken")}
    return function(dispatch) {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then(res => {
            if (!res.ok) {
                dispatch({type: LOGOUT_FAILED});
            }
            return res.json();
        }).then(result => {
            if (result && result.success) {
                dispatch({type: LOGOUT_SUCCESS, logoutSuccessful: true});
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