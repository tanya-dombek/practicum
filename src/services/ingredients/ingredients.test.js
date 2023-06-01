import { ingredientsReducer, initialState } from './ingredients-reducer';

describe('ingredientsReducer', () => {
  const ingredient = {
    _id: "643d69a5c3f7b9001cfa093d",
    name: "Флюоресцентная булка R2-D3",
    type: "bun",
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: "image",
    image_mobile: "mobile",
    image_large: "large",
    __v: 0,
    key: "777"
  }

  it('should return the initial state', () => {
    expect(ingredientsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle GET_INGREDIENTS_SUCCESS', () => {
    const action = {
      type: 'GET_INGREDIENTS_SUCCESS',
      ingredients: [ingredient],
    };

    expect(ingredientsReducer(initialState, action)).toEqual({
      ...initialState,
      ingredientsFailed: false,
      ingredients: [ingredient],
    });
  });

  it('should handle GET_INGREDIENTS_FAILED', () => {
    const action = {type: 'GET_INGREDIENTS_FAILED'};

    expect(ingredientsReducer(initialState, action)).toEqual({
      ...initialState,
      ingredientsFailed: true,
    });
  });

  it('should handle INCREASE_COUNTER', () => {
    const item = { ...ingredient, count: 2 };
    const prevState = { ...initialState, ingredients: [item] };
    const action = {type: 'INCREASE_COUNTER', item};

    expect(ingredientsReducer(prevState, action)).toEqual({
      ...initialState,
      ingredients: [{...item, count: 3}],
    });
  });

  it('should handle DECREASE_COUNTER', () => {
    const item = { ...ingredient, count: 2 };
    const prevState = { ...initialState, ingredients: [item] };
    const action = {type: 'DECREASE_COUNTER', item};

    expect(ingredientsReducer(prevState, action)).toEqual({
      ...initialState,
      ingredients: [{ ...item, count: 1 }],
    });
  });

  it('should handle RESET_COUNTER', () => {
    const action = {type: 'RESET_COUNTER'};
    const item = { ...ingredient, count: 2 };
    const prevState = { ...initialState, ingredients: [item] };

    expect(ingredientsReducer(prevState, action)).toEqual({
      ...initialState,
      ingredients: [{...item, count: 0}],
    });
  });

  it('should return the current state for unknown action types', () => {
    const action = { type: 'UNKNOWN_ACTION' };

    expect(ingredientsReducer(initialState, action)).toEqual(initialState);
  });
});