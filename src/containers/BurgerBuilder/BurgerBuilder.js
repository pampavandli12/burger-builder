import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

export class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };
  componentDidMount() {
    this.props.onInitIngredients();
  }
  updatePurchasable = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, curr) => {
        return sum + curr;
      }, 0);
    return sum > 0;
  };
  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({
        purchasing: true,
      });
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  };
  modalClosed = () => {
    this.setState({
      purchasing: false,
    });
  };
  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  };
  render() {
    const disabledInfo = { ...this.props.ings };
    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummery = null;
    let burger = this.props.error ? (
      <p>Ingredient's can not be loaded</p>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            less={this.props.onIngredientRemoved}
            more={this.props.onIngredientAddd}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchasable(this.props.ings)}
            purchaseClicked={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
          />
        </Auxiliary>
      );
      orderSummery = (
        <OrderSummary
          ingredients={this.props.ings}
          purchageCancel={this.modalClosed}
          purchaseContinue={this.purchaseContinueHandler}
          price={this.props.price}
        />
      );
    }
    return (
      <Auxiliary>
        <Modal show={this.state.purchasing} modalClosed={this.modalClosed}>
          {orderSummery}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAddd: (ingName) => dispatch(actions.addIngredients(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(actions.removeIngredients(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirect(path)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
