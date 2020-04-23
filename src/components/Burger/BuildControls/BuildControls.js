import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const buildControls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];
const BuildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current price $: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {buildControls.map((ctrl) => {
        return (
          <BuildControl
            key={ctrl.label}
            label={ctrl.label}
            clickLess={() => props.less(ctrl.type)}
            clickMore={() => props.more(ctrl.type)}
            disabled={props.disabled[ctrl.type]}
          />
        );
      })}
      <button
        disabled={!props.purchasable}
        className={classes.OrderButton}
        onClick={props.purchaseClicked}
      >
        {props.isAuth ? 'ORDER NOW' : 'SIGNUP TO ORDER'}
      </button>
    </div>
  );
};

export default BuildControls;
