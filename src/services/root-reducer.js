import { combineReducers } from 'redux';
import { constructorReducer } from './constructor/constructor-reducer';
import { ingredientsReducer } from './ingredients/ingredients-reducer';
import { ingredientDetailsReducer } from './ingredient-details/ingredient-details-reducer';
import { orderReducer } from './order/order-reducer';
import { forgotPasswordReducer } from './forgot-password/forgot-password-reducer';
import { resetPasswordReducer } from './reset-password/reset-password-reducer';
import { registrationReducer } from './register/register-reducer';
import { loginReducer } from './login/login-reducer';
import { logoutReducer } from './logout/logout-reducer';
import { userReducer } from './user/user.reducer';

export const rootReducer = combineReducers({
    cart: constructorReducer,
    ingredients: ingredientsReducer,
    details: ingredientDetailsReducer,
    order: orderReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
    registration: registrationReducer,
    login: loginReducer,
    logout: logoutReducer,
    user: userReducer,
  });