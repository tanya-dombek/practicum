import { GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS, INCREASE_COUNTER, DECREASE_COUNTER, RESET_COUNTER, TIgredientsAction } from "./ingredients-action";
import { TIngredientData } from '../../types/types';

type TInitialState = {
  ingredients: Array<TIngredientData>;
  ingredientsFailed: boolean;
}

export const initialState: TInitialState = {
    ingredients: [],
    ingredientsFailed: false,
  };

  export const ingredientsReducer = (state = initialState, action: TIgredientsAction): TInitialState => {
    switch (action.type) {
      case GET_INGREDIENTS_SUCCESS: {
        return { ...state, ingredientsFailed: false, ingredients: action.ingredients };
      }
      case GET_INGREDIENTS_FAILED: {
        return { ...state, ingredientsFailed: true };
      }
      case INCREASE_COUNTER: {
        return {
          ...state,
          ingredients: [...state.ingredients].map(item =>
            item._id === action.item._id ? item.count ? { ...item, count: ++item.count } : {...item, count: 1} : item
          )
        };
      }
      case DECREASE_COUNTER: {
        return {
          ...state,
          ingredients: [...state.ingredients].map(item =>
            item._id === action.item._id && item.count ? { ...item, count: --item.count } : item
          )
        };
      }
      case RESET_COUNTER: {
        return {
          ...state,
          ingredients: [...state.ingredients].map(item =>
            item.count ? { ...item, count: 0 } : item
          )
        };
      }
      default: {
        return state;
      }
    }
};