import Backend from '../../Backend/Backend';

const logIn = (username, token) => {
  return {
    type: 'LOG_IN',
    payload: {
      username,
      token,
    },
  };
};

const logInIfValid = (username, token) => {
  return (dispatch) => {
    Backend.checkTokenValidity(username, token)
      .then((res) => {
        return dispatch(logIn(username, token));
      })
      .catch((err) => {
        localStorage.clear();
      });
    return null;
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

const playTrack = (trackname) => {
  return {
    type: 'PLAY_TRACK',
    payload: { trackname },
  };
};

export { logIn, logOut, updateProfile, playTrack, logInIfValid };
