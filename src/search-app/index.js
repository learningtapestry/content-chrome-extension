import 'babel-polyfill';
import 'perfect-scrollbar/dist/css/perfect-scrollbar.css';
import 'normalize.css/normalize.css';
import 'font-awesome/scss/font-awesome.scss'

import React from 'react';
import ReactDOM from 'react-dom';
import Search from './components/search';

const app = {
  mount: function (container) {
    ReactDOM.render(<Search />, container);
  }
};

export default app;
