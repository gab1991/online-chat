import { playTrack } from './actions';
import Socket from '../../Backend/Socket';
import Backend from '../../Backend/Backend';
import { IChat } from '../../types';

const FILL_CHATS = 'FILL_CHATS';
const ADD_MESSAGE = 'ADD_MESSAGE';
const CREATE_DUMMY_MSG = 'CREATE_DUMMY_MSG';
const SWAP_DUMMY_MSG_TO_DELIVERED = 'SWAP_DUMMY_MSG_TO_DELIVERED';
const UPDATE_LAST_SEEN_MSG = 'UPDATE_LAST_SEEN_MSG';

const fillChats = (chats: IChat[]) => {
	return {
		type: FILL_CHATS,
		payload: {
			...chats,
		},
	};
};

const addMessageBase = (message, user_id) => {
	return {
		type: ADD_MESSAGE,
		payload: {
			message,
			user_id,
		},
	};
};

const createDummyMsg = (dummyMsgBody) => {
	return {
		type: CREATE_DUMMY_MSG,
		payload: dummyMsgBody,
	};
};

const swapDummyMsgToDelivered = ({ newMsg, dummyID }) => {
	return {
		type: SWAP_DUMMY_MSG_TO_DELIVERED,
		payload: { newMsg, dummyID },
	};
};

const addMessage = (message) => {
	return (dispatch, getState) => {
		const user_id = getState().profile.id;

		dispatch(playTrack('incomeMsg'));

		return dispatch(addMessageBase(message, user_id));
	};
};

const sendMsg = (chatID, messageTxt) => {
	return (dispatch, getState) => {
		const user_id = getState().profile.id;
		const dummyMsgBody = {
			conversation_id: chatID,
			created_at: new Date().toString(),
			id: Date.now(),
			message: messageTxt,
			sender_id: user_id,
			user_id: user_id,
			isDummy: true,
		};

		Socket.sendMessage(user_id, chatID, messageTxt, dummyMsgBody.id);

		return dispatch(createDummyMsg(dummyMsgBody));
	};
};

const updateLastSeenMsg = (obj) => {
	return {
		type: UPDATE_LAST_SEEN_MSG,
		payload: {
			...obj,
		},
	};
};

const calculateUnreadMsgs = (lastSeenMsgId, messages) => {
	const lastMsgId = messages[messages.length - 1]?.id || 0;

	if (lastMsgId <= lastSeenMsgId) return 0;

	let unreadCounter = 0;
	for (let i = messages.length - 1; i >= 0; i--) {
		if (messages[i].id > lastSeenMsgId) {
			unreadCounter++;
		}
	}
	return unreadCounter;
};

const uploadNewConv = (chatData) => {
	return async (dispatch, getState) => {
		const user_id = getState().profile.id;
		const { chatID, sender_id } = chatData;

		// const { data } = await Backend.uploadNewConv(user_id, chatID);
		// if (!data) return;

		// dispatch(FILL_CHATS(data));
		//Play sound if sender is not me

		if (sender_id !== user_id) {
			dispatch(playTrack('incomeMsg'));
		}
	};
};

export {
	fillChats,
	addMessage,
	updateLastSeenMsg,
	calculateUnreadMsgs,
	uploadNewConv,
	sendMsg,
	swapDummyMsgToDelivered,
};

export { ADD_MESSAGE, CREATE_DUMMY_MSG, UPDATE_LAST_SEEN_MSG, FILL_CHATS, SWAP_DUMMY_MSG_TO_DELIVERED };
