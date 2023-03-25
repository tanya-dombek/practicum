import { GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS, INCREASE_COUNTER, DECREASE_COUNTER } from "./ingredients-action";

const initialState = {
    ingredients: [],
    ingredientsFailed: false,
  };

  export const ingredientsReducer = (state = initialState, action) => {
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
      default: {
        return state;
      }
    }
};