import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { checkValidity } from '../../../shared/utility';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zipcode',
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-mail',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'fastest' },
            { value: 'cheapest', displayValue: 'cheapest' },
          ],
        },
        value: 'fastest',
        validation: {},
        valid: true,
      },
    },
    formIsValid: false,
    loading: false,
  };
  oderHandler = (event) => {
    event.preventDefault();
    let formData = {};
    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price.toFixed(2),
      oderData: formData,
      userId: this.props.userId,
    };
    this.props.onOrderBurger(order, this.props.token);
  };
  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderElements = { ...this.state.orderForm };
    const updatedOrder = {
      ...updatedOrderElements[inputIdentifier],
    };
    updatedOrder.value = event.target.value;
    updatedOrder.touched = true;
    updatedOrder.valid = checkValidity(
      updatedOrder.value,
      updatedOrder.validation
    );
    updatedOrderElements[inputIdentifier] = updatedOrder;
    let formIsValid = true;
    for (let key in updatedOrderElements) {
      formIsValid = updatedOrderElements[key].valid && formIsValid;
    }
    this.setState({
      orderForm: updatedOrderElements,
      formIsValid: formIsValid,
    });
  };

  render() {
    let formArrayElements = [];
    for (let key in this.state.orderForm) {
      formArrayElements.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.oderHandler}>
        {formArrayElements.map((element) => {
          return (
            <Input
              key={element.id}
              elementType={element.config.elementType}
              elementConfig={element.config.elementConfig}
              value={element.config.value}
              changed={(event) => this.inputChangedHandler(event, element.id)}
              inValid={!element.config.valid}
              shouldValidate={element.config.validation}
              touched={element.config.touched}
            />
          );
        })}
        <Button btnType='Success' disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
