import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ErrorPage from '../ErrorPage';

// Mock the useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: key => key }),
}));

// Configure Enzyme with the adapter
configure({ adapter: new Adapter() });

describe('ErrorPage component', () => {
  it('renders without crashing', () => {
    shallow(<ErrorPage />);
  });

  it('displays error messages correctly', () => {
    const wrapper = shallow(<ErrorPage />);
    const errorMessage1 = "errorPage.emptyClassroomError";
    const errorMessage2 = "errorPage.tryAnotherCodeMessage";

    expect(wrapper.text()).toContain(errorMessage1);
    expect(wrapper.text()).toContain(errorMessage2);
  });

  it('renders an image', () => {
    const wrapper = shallow(<ErrorPage />);
    expect(wrapper.find('img')).toHaveLength(1);
  });

  it('renders the image with the correct alt text', () => {
    const wrapper = shallow(<ErrorPage />);
    const image = wrapper.find('img');
    expect(image.prop('alt')).toEqual('error');
  });
});
