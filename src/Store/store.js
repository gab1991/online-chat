import { createStore } from 'redux';
import rootReducer from './Reducers/ReducerCombined';

const reduxDevTools =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    : '';

const store = createStore(rootReducer, reduxDevTools);

const getToken = () => {
  const state = store.getState();
  console.log(state.logged.token);
  return state.logged.token;
};

export { store, getToken };
