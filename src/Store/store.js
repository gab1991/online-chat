import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './Reducers/ReducerCombined';

const composeEnhancer = (import.meta.env === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

const getToken = () => {
	const state = store.getState();
	return state.logged.token;
};

const dispatch = store.dispatch;

export { store, getToken, dispatch };
