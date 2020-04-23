import React, { Component } from 'react';
import CheckSummary from '../../components/Order/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class CheckOut extends Component {
  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };
  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };
  render() {
    let summary = <Redirect to='/' />;

    if (this.props.ings) {
      const purchased = this.props.purchased ? <Redirect to='/' /> : null;
      summary = (
        <div>
          {purchased}
          <CheckSummary
            ingredients={this.props.ings}
            checkoutCancled={this.checkoutCancelHandler}
            checkoutContinue={this.checkoutContinueHandler}
          />
          <Route
            path={`${this.props.match.url}/contact-data`}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(CheckOut);
