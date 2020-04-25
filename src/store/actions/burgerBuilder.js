import * as actionTypes from './actionTypes';

export const addIngredients = (ingredientName) => {
  return {
    type: actionTypes.ADD_INGREDIENTS,
    ingredientName: ingredientName,
  };
};

export const removeIngredients = (ingredientName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENTS,
    ingredientName: ingredientName,
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};
export const fetIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};
export const initIngredients = () => {
  return {
    type: actionTypes.INITIATE_INGREDIENTS,
  };
};
