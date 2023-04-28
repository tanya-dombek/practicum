import { TIngredientData, AppThunk } from '../../types/types';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const INCREASE_COUNTER = 'INCREASE_COUNTER';
export const DECREASE_COUNTER = 'DECREASE_COUNTER';
export const RESET_COUNTER = 'RESET_COUNTER';

export type TIgredientsAction =
  | { type: 'GET_INGREDIENTS_SUCCESS', ingredients: TIngredientData }
  | { type: 'GET_INGREDIENTS_FAILED' }
  | { type: 'INCREASE_COUNTER' }
  | { type: 'DECREASE_COUNTER' }
  | { type: 'RESET_COUNTER' };

export function getIgredients(): AppThunk {
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
  