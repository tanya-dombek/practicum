import { combineReducers } from 'redux';
import { constructorReducer } from './constructor/constructor-reducer';
import { ingredientsReducer } from './ingredients/ingredients-reducer';
import { ingredientDetailsReducer } from './ingredient-details/ingredient-details-reducer';
import { orderReducer } from './order/order-reducer';

export const rootReducer = combineReducers({
    cart: constructorReducer,
    ingredients: ingredientsReducer,
    details: ingredientDetailsReducer,
    order: orderReducer,
  });