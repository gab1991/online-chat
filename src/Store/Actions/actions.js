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

const fillChats = (obj) => {
  return {
    type: 'FILL_CHATS',
    payload: {
      ...obj,
    },
  };
};

const addMessage = (obj) => {
  return {
    type: 'ADD_MESSAGE',
    payload: {
      ...obj,
    },
  };
};

export { logIn, logOut, updateProfile, fillChats, addMessage };
