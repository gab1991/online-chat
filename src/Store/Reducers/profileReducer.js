const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_PROFILE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default profileReducer;
