const logIn = (username, token) => {
  return {
    type: 'LOG_IN',
    payload: {
      username,
      token,
    },
  };
};

const logOut = () => {
  console.log('in actions');
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

export { logIn, logOut, updateProfile, playTrack };
