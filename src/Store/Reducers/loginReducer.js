const initial = {
  status: false,
  initialLoading: true,
  username: null,
  token: null,
};

const loginReducer = (state = initial, action) => {
  switch (action.type) {
    case 'LOG_IN': {
      const { username, token } = action.payload;
      localStorage.removeItem('isLoggedOut');
      return { username, token, status: true, initialLoading: false };
    }
    case 'FINISH_INITIAL_LOG_IN': {
      localStorage.removeItem('isLoggedOut');
      return { ...state, initialLoading: false };
    }
    default: {
      // cheking if it wasn't logOut;
      const isLoggedOut = localStorage.getItem('isLoggedOut');
      return { ...state, initialLoading: isLoggedOut ? false : true };
    }
  }
};

export default loginReducer;
