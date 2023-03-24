export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const INCREASE_COUNTER = 'INCREASE_COUNTER';
export const DECREASE_COUNTER = 'DECREASE_COUNTER';


export function getIgredients() {
    const url = 'https://norma.nomoreparties.space/api/ingredients';
    return function(dispatch) {
      dispatch({
        type: GET_INGREDIENTS_REQUEST
      });
      fetch(url).then(res => {
            if (!res.ok) {
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                });
            }
            return res.json();
        }).then(result => {
            if (result) {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    ingredients: result.data
                });
            }
        }).catch(err => {
            dispatch({
                type: GET_INGREDIENTS_FAILED
            })
        })
    };
}
  