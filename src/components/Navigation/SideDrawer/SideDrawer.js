import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Axuliary from '../../../hoc/Auxiliary/Auxiliary';

const SideDrawer = (props) => {
  let appliedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    appliedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Axuliary>
      <Backdrop show={props.open} modalClosed={props.closed} />
      <div className={appliedClasses.join(' ')} onClick={props.closed}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Axuliary>
  );
};

export default SideDrawer;
