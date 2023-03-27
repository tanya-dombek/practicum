import { GET_INGREDIENT_DETAILS, CLOSE_MODAL } from "./ingredient-details-action";

const initialState = {
    currentIngredient: null,
    openModal: false,
  };

  export const ingredientDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_INGREDIENT_DETAILS: {
        return {
          ...state,
          currentIngredient: action.currentIngredient,
          openModal: action.currentIngredient ? true : false
        };
      }
      case CLOSE_MODAL: {
        return {
          ...state,
          openModal: false,
          currentIngredient: null
        };
      }
      default: {
        return state;
      }
    }
};