import Backend from '../../Backend/Backend';
import Socket from '../../Backend/Socket';
import { fillChats } from './chatActions';
import { CurrentUserProfile } from '../../types';
import { profileStore } from '..';

const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';
const UPDATE_PROFILE = 'UPDATE_PROFILE';
const FINISH_INITIAL_LOG_IN = 'FINISH_INITIAL_LOG_IN';
const PLAY_TRACK = 'PLAY_TRACK';

const logIn = (username, token) => {
	return (dispatch) => {
		Socket.setIsOnline(username);
		return dispatch({
			type: LOG_IN,
			payload: {
				username,
				token,
			},
		});
	};
};

const logInIfValid = (username, token) => {
	return async (dispatch) => {
		await Backend.checkTokenValidity(username, token, (err) => {
			if (err?.response?.status === 401) {
				localStorage.clear();
				dispatch(logOut());
			}
		});

		dispatch(logIn(username, token));
	};
};

const finishInitialLogIn = () => {
	return {
		type: FINISH_INITIAL_LOG_IN,
	};
};

const logOut = () => {
	return {
		type: LOG_OUT,
	};
};

const updateProfile = (profile: Omit<CurrentUserProfile, 'chats'>) => {
	return {
		type: UPDATE_PROFILE,
		payload: profile,
	};
};

const getProfile = () => {
	return async (dispatch) => {
		const { data } = await Backend.getProfile();
		if (!data) return;

		const profile = {
			avatar_path: data?.avatarUrl,
			id: data?.id,
			username: data?.username,
			displayed_name: data?.displayedName,
		};

		profileStore.fillProfile(profile);

		dispatch(updateProfile(profile as any));
		dispatch(fillChats(data.chats));
	};
};

const playTrack = (trackname) => {
	return {
		type: PLAY_TRACK,
		payload: { trackname },
	};
};

const fetchCurrentUserProfile = () => async (dispatch) => {
	const { data }: { data: CurrentUserProfile } = await Backend.fetchCurrentUserProfile();

	const { chats, ...profile } = data;

	dispatch(logIn(data.displayedName, 'aaaa'));

	dispatch(updateProfile(profile));
	dispatch(fillChats(chats));
};

export {
	logIn,
	logOut,
	updateProfile,
	playTrack,
	logInIfValid,
	getProfile,
	finishInitialLogIn,
	fetchCurrentUserProfile,
};

export { LOG_IN, LOG_OUT, UPDATE_PROFILE, FINISH_INITIAL_LOG_IN, PLAY_TRACK };
