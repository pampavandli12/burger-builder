import React from 'react';
import classes from './Order.module.css';

const Order = (props) => {
  const ingredients = [];
  for (const ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      ammount: props.ingredients[ingredientName],
    });
  }
  return (
    <div className={classes.Order}>
      <div className={classes.FlexAlign}>
        Ingredients:
        {ingredients.map((ig) => {
          return (
            <span
              key={ig.name}
              style={{ margin: '2px', border: '1px solid ', padding: '5px' }}
            >
              {ig.name}: ({ig.ammount})
            </span>
          );
        })}
      </div>
      <p>
        Price <strong>USD {props.price}</strong>
      </p>
    </div>
  );
};

export default Order;
