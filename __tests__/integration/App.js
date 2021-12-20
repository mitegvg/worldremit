import {configure, shallow, mount, render} from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({adapter: new Adapter()});
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import App from '../../App';
it('renders correctly', () => {
  renderer.create(<App />);
});
