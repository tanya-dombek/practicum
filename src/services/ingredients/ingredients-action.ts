import { TIngredientData, AppThunk } from '../../types/types';
import { BASE_URL } from '../../utils/rests-utils';
import { request } from '../../utils/rests-utils';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';
export const INCREASE_COUNTER: 'INCREASE_COUNTER' = 'INCREASE_COUNTER';
export const DECREASE_COUNTER: 'DECREASE_COUNTER' = 'DECREASE_COUNTER';
export const RESET_COUNTER: 'RESET_COUNTER' = 'RESET_COUNTER';

export type TIgredientsAction =
  | { type: typeof GET_INGREDIENTS_SUCCESS, ingredients: Array<TIngredientData> }
  | { type: typeof GET_INGREDIENTS_FAILED }
  | { type: typeof INCREASE_COUNTER, item: TIngredientData }
  | { type: typeof DECREASE_COUNTER, item: TIngredientData }
  | { type: typeof RESET_COUNTER };

export function getIgredients(): AppThunk {
    const url = BASE_URL + '/ingredients';
    return function(dispatch) {
      request(url, {method: 'GET'}).then(result => {
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
  