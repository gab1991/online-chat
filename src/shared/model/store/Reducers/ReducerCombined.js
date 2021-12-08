import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import profileReducer from './profileReducer';
import chatReducer from './chatReducer';
import audioReducer from './audioReducer';
import { LOG_OUT } from '../Actions/actions';

const appReducer = combineReducers({
  logged: loginReducer,
  profile: profileReducer,
  chats: chatReducer,
  audio: audioReducer,
});

const rootReducer = (state, action) => {
  if (action.type === LOG_OUT) {
    state = undefined;
    localStorage.setItem('isLoggedOut', true);
  }
  return appReducer(state, action);
};

export default rootReducer;
