export const GET_INGREDIENT_DETAILS = 'GET_INGREDIENT_DETAILS';
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export function getIgredientDetails(ingredient) {
    return function(dispatch) {
      dispatch({
        type: GET_INGREDIENT_DETAILS,
        currentIngredient: ingredient
      });
    };
}