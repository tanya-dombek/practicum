import { SET_AUTH } from "../login/login-action";
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const PATCH_USER_SUCCESS = 'PATCH_USER_SUCCESS';
export const PATCH_USER_FAILED = 'PATCH_USER_FAILED';
export const SET_USER = 'SET_USER';

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

export const refreshToken = () => {
    const url = 'https://norma.nomoreparties.space/api/auth/token';
    return fetch (url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        })
    }).then(checkResponse);
};

export const fetchWithRefresh = async (url, options) => {
    try {
      const res = await fetch(url, options);
      return await checkResponse(res);
    } catch (err) {
      if (err.message === "jwt expired") {
        const refreshData = await refreshToken();
        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }
        localStorage.setItem("refreshToken", refreshData.refreshToken);
        localStorage.setItem("accessToken", refreshData.accessToken);
        options.headers.authorization = refreshData.accessToken;
        const res = await fetch(url, options);
        return await checkResponse(res);
      } else {
        return Promise.reject(err);
      }
    }
  };

export const getUser = () => {
    const url = 'https://norma.nomoreparties.space/api/auth/user';
    return async (dispatch) => {
      try {
        const response = await fetchWithRefresh(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            authorization: localStorage.getItem("accessToken"),
          },
        });
        dispatch({ type: GET_USER_SUCCESS });
        dispatch({
          type: SET_USER,
          user: response.user,
        });
      } catch (error) {
        dispatch({ type: GET_USER_FAILED });
      }
    };
  };

  export const changeUserInfo = (user, password) => {
    const url = 'https://norma.nomoreparties.space/api/auth/user';
    const body = {
        "name": user.name,
        "email": user.email, 
    }
    if (password !== '') {
    body.password = password;
    }
    return async (dispatch) => {
      try {
        const response = await fetchWithRefresh(url, {
            method: 'PATCH',
            headers: {
            'Content-Type': "application/json;charset=utf-8",
            authorization: localStorage.getItem("accessToken")
            },
            body: JSON.stringify(body)
        });
        dispatch({ type: PATCH_USER_SUCCESS });
        dispatch({
          type: SET_USER,
          user: response.user,
        });
      } catch (error) {
        dispatch({ type: PATCH_USER_FAILED });
      }
    };
  };

export function checkUserAuth () {
    return function (dispatch) {
      if (localStorage.getItem("accessToken")) {
          dispatch(getUser())
              .catch(() => {
                  localStorage.removeItem("accessToken");
                  localStorage.removeItem("refreshToken");
                  dispatch({
                    type: SET_USER,
                    user: null
                });
              })
              .finally(() => dispatch({
                type: SET_AUTH,
                isAuthChecked: true
            }));
      } else {
          dispatch({
            type: SET_AUTH,
            isAuthChecked: true
        });
      }
    };
};