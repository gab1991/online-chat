import { PLAY_TRACK } from '../Actions/actions';

const audioReducer = (state = {}, action) => {
  switch (action.type) {
    case PLAY_TRACK: {
      const trackname = action.payload.trackname;
      return {
        ...state,
        [trackname]: true,
      };
    }
    default:
      return state;
  }
};

export default audioReducer;
