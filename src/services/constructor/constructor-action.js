import {v4 as uuid} from 'uuid';
export const ADD_BUN = 'ADD_BUN';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_ITEM = 'DELETE_ITEM';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';

export function getSelectedBun(item) {
  return function(dispatch) {
    dispatch({
      type: ADD_BUN,
      selectedBun: {...item, key: uuid()}
    });
  };
}

export function getSelectedIngredient(item) {
  return function(dispatch) {
    dispatch({
      type: ADD_INGREDIENT,
      selectedIngredient: {...item, key: uuid()}
    });
  };
}

export function updateIngredientsConstructor(dragIndex, hoverIndex, selectedIngredients) {
  const dragIngredient = selectedIngredients[dragIndex];
  const newList = [...selectedIngredients];
  newList.splice(dragIndex, 1);
  newList.splice(hoverIndex, 0, dragIngredient);

  return function(dispatch) {
    dispatch({
      type: UPDATE_INGREDIENT,
      updatedIngredient: newList
    });
  };
}