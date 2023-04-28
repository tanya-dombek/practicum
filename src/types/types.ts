import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../services/root-reducer";
import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook,
  } from "react-redux";
import type {} from "redux-thunk/extend-redux";
import { TOrderAction } from "../services/order/order-action";
import { TConstructorAction } from "../services/constructor/constructor-action";
import { TForgotPasswordAction } from "../services/forgot-password/forgot-password-action";
import { TIgredientDetailsAction } from "../services/ingredient-details/ingredient-details-action";
import { TIgredientsAction } from "../services/ingredients/ingredients-action";
import { TRegistrationAction } from "../services/register/register-action";
import { TSignInAction } from "../services/login/login-action";
import { TSignOutAction } from "../services/logout/logout-action";
import { TResetPasswordAction } from "../services/reset-password/reset-password-action";
import { TUserAction } from "../services/user/user-action";

export type TIngredientData = {
    _id: string;
    calories: number;
    carbohydrates: number;
    fat: number;
    image: string;
    image_large: string;
    image_mobile: string;
    name: string;
    price: number;
    proteins: number;
    type: string;
    __v: number;
    isLocked?: boolean;
    key: string;
    count?: number;
}

export type TUserType = {
    name: string;
    email: string;
    [key: string]: string;
}

export type TRegistrationType = TUserType & {
    password: string
}

export type TResetPasswordType = {
    password: string;
    code: string;
}

export type TLoginType = {
    email: string;
    password: string;
}

export type AppActions =
    | TConstructorAction
    | TForgotPasswordAction
    | TIgredientDetailsAction
    | TIgredientsAction
    | TSignInAction
    | TSignOutAction
    | TOrderAction
    | TRegistrationAction
    | TResetPasswordAction
    | TUserAction

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AppActions
>;

type AppDispatch<TReturnType = void> = (
    action: AppActions | AppThunk<TReturnType>
  ) => TReturnType;

export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
