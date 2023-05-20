import {ADD_BUN, ADD_INGREDIENT, DELETE_ITEM, UPDATE_INGREDIENT, RESET_CONSTRUCTOR, TConstructorAction} from './constructor-action';
import { TIngredientData } from '../../types/types';

type TInitialState = {
  selectedIngredients: Array<TIngredientData>;
  selectedBun: TIngredientData | null;
} 

const initialState: TInitialState = {
  selectedIngredients: [],
  selectedBun: null,
  };

  export const constructorReducer = (state = initialState, action: TConstructorAction): TInitialState => {
    switch (action.type) {
      case ADD_BUN: {
        return {
          ...state,
          selectedBun: action.selectedBun
        };
      }
      case ADD_INGREDIENT: {
        return {
          ...state,
          selectedIngredients: [...state.selectedIngredients, action.selectedIngredient]
        };
      }
      case DELETE_ITEM: {
        return {
          ...state,
          selectedIngredients: [...state.selectedIngredients].filter(item => item.key !== action.item.key)
        };
      }
      case UPDATE_INGREDIENT: {
        const dragIngredient = state.selectedIngredients[action.dragIndex];
        const newList = [...state.selectedIngredients];
        newList.splice(action.dragIndex, 1);
        newList.splice(action.hoverIndex, 0, dragIngredient);
        return {
          ...state,
          selectedIngredients: newList
        };
      }
      case RESET_CONSTRUCTOR: {
        return {
          ...state,
          selectedBun: null,
          selectedIngredients: []
        };
      }
        default: {
            return state;
          }
    }
  }