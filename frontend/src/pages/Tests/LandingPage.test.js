import React from 'react';
import { shallow } from 'enzyme';
import LandingPage from '../LandingPage';

describe('LandingPage component', () => {
  it('renders without crashing', () => {
    shallow(<LandingPage />);
  });

  it('updates lectureCode state on input change', () => {
    const wrapper = shallow(<LandingPage />);
    const input = wrapper.find('input');

    input.simulate('change', { target: { value: 'ABC123' } });

    expect(wrapper.state('lectureCode')).toEqual('ABC123');
  });

  it('logs lectureCode when evaluate button is clicked', () => {
    const wrapper = shallow(<LandingPage />);
    const instance = wrapper.instance();
    const consoleSpy = jest.spyOn(console, 'log');

    instance.setState({ lectureCode: 'XYZ456' });

    wrapper.find('button').simulate('click');

    expect(consoleSpy).toHaveBeenCalledWith('XYZ456');
  });
});
