import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  const inputClasses = [classes.InputElement];
  if (props.inValid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }
  let inputElement = null;
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          {...props.elementConfig}
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          {...props.elementConfig}
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;

    default:
      inputElement = null;
      break;
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
