import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './Store/store';
import { Provider } from 'react-redux';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
