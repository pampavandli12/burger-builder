import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adaptor from 'enzyme-adapter-react-16';

configure({ adapter: new Adaptor() });

describe('<BurgerBuilder />', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
  });
  it('should render <BuildControls /> when recieving ingredients', () => {
    wrapper.setProps({ ings: { salad: 0 } });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
