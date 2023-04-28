import {v4 as uuid} from 'uuid';
import { TIngredientData, AppThunk } from '../../types/types';
export const ADD_BUN = 'ADD_BUN';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_ITEM = 'DELETE_ITEM';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const RESET_CONSTRUCTOR = 'RESET_CONSTRUCTOR';

export type TConstructorAction =
  | { type: 'ADD_INGREDIENT', selectedIngredient: TIngredientData }
  | { type: 'ADD_BUN', selectedBun: TIngredientData }
  | { type: 'UPDATE_INGREDIENT', dragIndex: number, hoverIndex: number }
  | { type: 'DELETE_ITEM' }
  | { type: 'RESET_CONSTRUCTOR' };


export function getSelectedBun(item: TIngredientData): AppThunk {  
  return function(dispatch) {
    dispatch({
      type: ADD_BUN,
      selectedBun: {...item, key: uuid()}
    });
  };
}

export function getSelectedIngredient(item: TIngredientData): AppThunk {
  return function(dispatch) {
    dispatch({
      type: ADD_INGREDIENT,
      selectedIngredient: {...item, key: uuid()}
    });
  };
}

export function updateIngredientsConstructor(dragIndex: number, hoverIndex: number): AppThunk {
  return function(dispatch) {
    dispatch({
      type: UPDATE_INGREDIENT,
      dragIndex: dragIndex,
      hoverIndex: hoverIndex,
    });
  };
}