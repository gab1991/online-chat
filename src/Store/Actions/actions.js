import Backend from '../../Backend/Backend';
import Socket from '../../Backend/Socket';
import { fillChats } from './chatActions';

const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';
const UPDATE_PROFILE = 'UPDATE_PROFILE';
const FINISH_INITIAL_LOG_IN = 'FINISH_INITIAL_LOG_IN';
const PLAY_TRACK = 'PLAY_TRACK';

const logIn = (username, token) => {
  return (dispatch) => {
    Socket.setIsOnline(username);
    return dispatch({
      type: LOG_IN,
      payload: {
        username,
        token,
      },
    });
  };
};

const logInIfValid = (username, token) => {
  return async (dispatch) => {
    await Backend.checkTokenValidity(username, token, (err) => {
      if (err?.response?.status === 401) {
        localStorage.clear();
        dispatch(logOut());
      }
    });

    dispatch(logIn(username, token));
  };
};

const finishInitialLogIn = () => {
  return {
    type: FINISH_INITIAL_LOG_IN,
  };
};

const logOut = () => {
  return {
    type: LOG_OUT,
  };
};

const updateProfile = (obj) => {
  return {
    type: UPDATE_PROFILE,
    payload: {
      ...obj,
    },
  };
};

const getProfile = () => {
  return async (dispatch) => {
    const { data } = await Backend.getProfile();
    if (!data) return;

    const profile = {
      avatar_path: data?.avatar_path,
      id: data?.id,
      username: data?.username,
      displayed_name: data?.displayed_name,
    };
    const conversations = {
      ...data?.conversations,
    };

    dispatch(updateProfile(profile));
    dispatch(fillChats(conversations));
  };
};

const playTrack = (trackname) => {
  return {
    type: PLAY_TRACK,
    payload: { trackname },
  };
};

export {
  logIn,
  logOut,
  updateProfile,
  playTrack,
  logInIfValid,
  getProfile,
  finishInitialLogIn,
};

export { LOG_IN, LOG_OUT, UPDATE_PROFILE, FINISH_INITIAL_LOG_IN, PLAY_TRACK };
