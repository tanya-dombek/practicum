export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const INCREASE_COUNTER = 'INCREASE_COUNTER';
export const DECREASE_COUNTER = 'DECREASE_COUNTER';


export function getIgredients() {
    const url = 'https://norma.nomoreparties.space/api/ingredients';
    return function(dispatch) {
      fetch(url).then(res => {
            if (!res.ok) {
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                });
            }
            return res.json();
        }).then(result => {
            if (result && result.success) {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    ingredients: result.data
                });
            } else {
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                });
            }
        }).catch(err => {
            dispatch({
                type: GET_INGREDIENTS_FAILED
            })
        })
    };
}
  