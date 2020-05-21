import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import profileReducer from './profileReducer';
import chatReducer from './chatReducer';

const appReducer = combineReducers({
  logged: loginReducer,
  profile: profileReducer,
  chats: chatReducer,
  // showAuth: showHideAuth,
  // showErr: showHideErr,
  // showInfo: showHideInfo,
  // showCornNotifier: showHideCornerNotifier,
  // dataCache: dataCache,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOG_OUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
