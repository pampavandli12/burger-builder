import React from "react";
import classes from "./BuildControl.module.css";

const BuildControl = (props) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button
        className={classes.Less}
        onClick={() => props.clickLess(props.label)}
        disabled={props.disabled}
      >
        Less
      </button>
      <button className={classes.More} onClick={props.clickMore}>
        More
      </button>
    </div>
  );
};

export default BuildControl;
