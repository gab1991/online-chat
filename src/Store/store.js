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
  return state.logged.token;
};

const dispatch = store.dispatch;

export { store, getToken, dispatch };
