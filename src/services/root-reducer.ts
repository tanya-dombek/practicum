import { combineReducers } from 'redux';
import { constructorReducer } from './constructor/constructor-reducer';
import { ingredientsReducer } from './ingredients/ingredients-reducer';
import { orderReducer } from './order/order-reducer';
import { forgotPasswordReducer } from './forgot-password/forgot-password-reducer';
import { resetPasswordReducer } from './reset-password/reset-password-reducer';
import { registrationReducer } from './register/register-reducer';
import { loginReducer } from './login/login-reducer';
import { logoutReducer } from './logout/logout-reducer';
import { userReducer } from './user/user-reducer';
import { wsFeedReducer } from './middleware/ws-reducer';
import { wsProfileReducer } from './middleware/ws-profile-reducer';
import { orderDetailsReducer } from './order-details/order-details-reducer';

export const rootReducer = combineReducers({
    cart: constructorReducer,
    ingredients: ingredientsReducer,
    order: orderReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
    registration: registrationReducer,
    login: loginReducer,
    logout: logoutReducer,
    user: userReducer,
    feedOrders: wsFeedReducer,
    profileOrders: wsProfileReducer,
    orderDetails: orderDetailsReducer,
  });

  export type RootState = ReturnType<typeof rootReducer>;