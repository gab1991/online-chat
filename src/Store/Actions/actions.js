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

export { logIn, logOut };
