import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import profileReducer from './profileReducer';
import chatReducer from './chatReducer';

const appReducer = combineReducers({
  logged: loginReducer,
  profile: profileReducer,
  chats: chatReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOG_OUT') {
    state = undefined;
    console.log('logged out');
  }
  return appReducer(state, action);
};

export default rootReducer;
