import { GET_INGREDIENT_DETAILS, OPEN_MODAL } from "./ingredient-details-action";

const initialState = {
    currentIngredient: null,
    openModal: false,
  };

  export const ingredientDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_INGREDIENT_DETAILS: {
        return {
          ...state,
          currentIngredient: action.currentIngredient
        };
      }
      case OPEN_MODAL: {
        return {
          ...state,
          openModal: !state.openModal
        };
      }
      default: {
        return state;
      }
    }
};