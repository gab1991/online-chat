import Backend from '../../Backend/Backend';
import Socket from '../../Backend/Socket';
import { fillChats } from './chatActions';

const logIn = (username, token) => {
  return (dispatch) => {
    Socket.setIsOnline(username);
    return dispatch({
      type: 'LOG_IN',
      payload: {
        username,
        token,
      },
    });
  };
};

const logInIfValid = (username, token) => {
  return (dispatch) => {
    Backend.checkTokenValidity(username, token)
      .then((res) => {
        return dispatch(logIn(username, token));
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          localStorage.clear();
          dispatch(logOut());
        }
        console.log(err);
      });
    return;
  };
};

const finishInitialLogIn = () => {
  return {
    type: 'FINISH_INITIAL_LOG_IN',
  };
};

const logOut = () => {
  return {
    type: 'LOG_OUT',
  };
};

const updateProfile = (obj) => {
  return {
    type: 'UPDATE_PROFILE',
    payload: {
      ...obj,
    },
  };
};

const getProfile = (token) => {
  return async (dispatch) => {
    const res = await Backend.getProfile(token).catch((err) =>
      console.log(err)
    );

    if (res) {
      const profile = {
        avatar_path: res.data?.avatar_path,
        id: res.data?.id,
        username: res.data?.username,
        displayed_name: res.data?.displayed_name,
      };
      const conversations = {
        ...res.data?.conversations,
      };
      dispatch(updateProfile(profile));
      dispatch(fillChats(conversations));
    }
    return;
  };
};

const playTrack = (trackname) => {
  return {
    type: 'PLAY_TRACK',
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
