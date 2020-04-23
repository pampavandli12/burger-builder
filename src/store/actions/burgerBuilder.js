import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

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

const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};
const fetIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};
export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get('https://burger-builder-acde8.firebaseio.com/ingredients.json')
      .then((res) => {
        dispatch(setIngredients(res.data));
      })
      .catch((error) => {
        dispatch(fetIngredientsFailed());
      });
  };
};
