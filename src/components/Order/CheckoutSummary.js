import React from "react";
import classes from "./CheckoutSummary.module.css";
import Burger from "../Burger/Burger";
import Button from "../UI/Button/Button";

const CheckSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it taste good</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.checkoutCancled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.checkoutContinue}>
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckSummary;
