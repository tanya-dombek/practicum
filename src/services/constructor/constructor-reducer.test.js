import { constructorReducer, initialState } from './constructor-reducer';

describe('constructorReducer', () => {
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
    expect(constructorReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ADD_BUN', () => {
    const action = { type: 'ADD_BUN', selectedBun: ingredient };

    expect(constructorReducer(initialState, action)).toEqual({
      ...initialState,
      selectedBun: ingredient,
    });
  });

  it('should handle ADD_INGREDIENT', () => {
    const action = { type: 'ADD_INGREDIENT', selectedIngredient: ingredient };

    expect(constructorReducer(initialState, action)).toEqual({
      ...initialState,
      selectedIngredients: [ingredient],
    });
  });

  it('should handle DELETE_ITEM', () => {
    let state = {
      ...initialState,
      selectedIngredients: [ingredient],
    }
    const action = { type: 'DELETE_ITEM', item: ingredient };

    expect(constructorReducer(state, action)).toEqual(initialState);
  });

  it('should handle UPDATE_INGREDIENT', () => {
    let state = {
      ...initialState,
      selectedIngredients: [ingredient],
    }
    const dragIndex = 0;
    const hoverIndex = 1;
    const action = { type: 'UPDATE_INGREDIENT', dragIndex, hoverIndex };

    expect(constructorReducer(state, action)).toEqual({
      ...initialState,
      selectedIngredients: [ingredient],
    });
  });

  it('should handle RESET_CONSTRUCTOR', () => {
    let state = {
      selectedBun: ingredient,
      selectedIngredients: [ingredient],
    }
    const action = { type: 'RESET_CONSTRUCTOR' };

    expect(constructorReducer(state, action)).toEqual(initialState);
  });

  it('should return the current state for unknown action types', () => {
    const action = { type: 'UNKNOWN_ACTION' };

    expect(constructorReducer(initialState, action)).toEqual(initialState);
  });
});