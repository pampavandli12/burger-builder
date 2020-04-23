import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import AsyncComponent from './hoc/AsyncComponent/AsyncComponent';

const asyncCheckout = AsyncComponent(() => {
  return import('./containers/Chekout/Checkout');
});
const asyncOrders = AsyncComponent(() => {
  return import('./containers/Orders/Orders');
});
const asyncAuth = AsyncComponent(() => {
  return import('./containers/Auth/Auth');
});
class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <Switch>
        <Route path='/auth' component={asyncAuth} />
        <Route path='/burger-builder' exact component={BurgerBuilder} />
        <Redirect from='/' to='/burger-builder' />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/checkout' component={asyncCheckout} />
          <Route path='/orders' component={asyncOrders} />
          <Route path='/logout' component={Logout} />
          <Route path='/auth' component={asyncAuth} />
          <Route path='/burger-builder' exact component={BurgerBuilder} />
          <Redirect from='/' to='/burger-builder' />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.checkAuthState()),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
