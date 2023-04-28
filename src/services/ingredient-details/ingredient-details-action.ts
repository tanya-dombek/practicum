import { TIngredientData, AppThunk } from '../../types/types';
export const GET_INGREDIENT_DETAILS = 'GET_INGREDIENT_DETAILS';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export type TIgredientDetailsAction =
  | { type: 'GET_INGREDIENT_DETAILS', currentIngredient: TIngredientData }
  | { type: 'CLOSE_MODAL' };

export function getIgredientDetails(ingredient: TIngredientData): AppThunk {
    return function(dispatch) {
      dispatch({
        type: GET_INGREDIENT_DETAILS,
        currentIngredient: ingredient
      });
    };
}