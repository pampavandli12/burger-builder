import React from 'react';
import { configure, shallow } from 'enzyme';
import Adaptor from 'enzyme-adapter-react-16';
import NavigationIntems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adaptor() });

describe('<NavigationIntems />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationIntems />);
  });
  it('Shoud render 2 <NavigationItem /> if not authenticated', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });
  it('Shoud render 3 <NavigationItem /> if authenticated', () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });
  it('Shoud render 3 <NavigationItem /> if authenticated', () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(
      wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)
    ).toEqual(true);
  });
});
