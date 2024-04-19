import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

describe('Index', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    div.id = 'root';
    document.body.appendChild(div);
    require('../index.js');
    expect(ReactDOM.render).toHaveBeenCalledWith(<React.StrictMode><App /></React.StrictMode>, div);
    document.body.removeChild(div);
  });
});