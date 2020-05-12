const initial = false;

const loginReducer = (state = initial, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return action.payload;
    default:
      return state;
  }
};

export default loginReducer;
