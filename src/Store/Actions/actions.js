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

export { logIn, logOut, updateProfile };
