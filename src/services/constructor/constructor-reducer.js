import {ADD_BUN, ADD_INGREDIENT, DELETE_ITEM, UPDATE_INGREDIENT} from './constructor-action';

const initialState = {
  selectedIngredients: [],
  selectedBun: {},
  };

  export const constructorReducer = (state = initialState, action) => {
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
        return {
          ...state,
          selectedIngredients: action.updatedIngredient
        };
      }
        default: {
            return state;
          }
    }
  }