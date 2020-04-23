import Axuliary from '../Auxiliary/Auxiliary';
import React, { Component } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends Component {
  state = {
    showSidedrawer: false,
  };
  sideDrawercloseHandler = () => {
    this.setState({
      showSidedrawer: false,
    });
  };
  openSidedrawer = () => {
    this.setState((prevState) => {
      return { showSidedrawer: !prevState.showSidedrawer };
    });
  };
  render() {
    return (
      <Axuliary>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          openSidedrwaer={this.openSidedrawer}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSidedrawer}
          closed={this.sideDrawercloseHandler}
        />
        <main className={classes.content}>{this.props.children}</main>
      </Axuliary>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
export default connect(mapStateToProps)(Layout);
