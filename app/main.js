import 'babel-polyfill';
import 'perfect-scrollbar/dist/css/perfect-scrollbar.css';
import 'normalize.css/normalize.css';
import 'font-awesome/scss/font-awesome.scss'

import React from 'react';
import ReactDOM from 'react-dom';
import Search from './components/search';

function main() {
  ReactDOM.render(<Search />, document.getElementById('app'));
}

main();
