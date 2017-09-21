import React from 'react';
import renderer from 'react-test-renderer';
import { getDropDownItems, getSearchResults } from '../src/api/api';
import Header from '../src/components/NavigationBar';

const props = {
  onMenuClick: jest.fn()
};

describe('Drop down menus', () => {
  it('should render drop down menu', () => {
    const component = renderer.create(<Header {...props} />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
