import { IChat } from '../../../../types';

import Backend from '../../../../Backend/Backend';
import Socket from '../../../../Backend/Socket';

import { playTrack } from './actions';

const FILL_CHATS = 'FILL_CHATS';
const ADD_MESSAGE = 'ADD_MESSAGE';
const CREATE_DUMMY_MSG = 'CREATE_DUMMY_MSG';
const SWAP_DUMMY_MSG_TO_DELIVERED = 'SWAP_DUMMY_MSG_TO_DELIVERED';
const UPDATE_LAST_SEEN_MSG = 'UPDATE_LAST_SEEN_MSG';

const fillChats = (chats: IChat[]) => {
	return {
		payload: {
			...chats,
		},
		type: FILL_CHATS,
	};
};

const addMessageBase = (message, user_id) => {
	return {
		payload: {
			message,
			user_id,
		},
		type: ADD_MESSAGE,
	};
};

const createDummyMsg = (dummyMsgBody) => {
	return {
		payload: dummyMsgBody,
		type: CREATE_DUMMY_MSG,
	};
};

const swapDummyMsgToDelivered = ({ newMsg, dummyID }) => {
	return {
		payload: { dummyID, newMsg },
		type: SWAP_DUMMY_MSG_TO_DELIVERED,
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
			isDummy: true,
			message: messageTxt,
			sender_id: user_id,
			user_id: user_id,
		};

		Socket.sendMessage(user_id, chatID, messageTxt, dummyMsgBody.id);

		return dispatch(createDummyMsg(dummyMsgBody));
	};
};

const updateLastSeenMsg = (obj) => {
	return {
		payload: {
			...obj,
		},
		type: UPDATE_LAST_SEEN_MSG,
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
	addMessage,
	calculateUnreadMsgs,
	fillChats,
	sendMsg,
	swapDummyMsgToDelivered,
	updateLastSeenMsg,
	uploadNewConv,
};

export { ADD_MESSAGE, CREATE_DUMMY_MSG, FILL_CHATS, SWAP_DUMMY_MSG_TO_DELIVERED, UPDATE_LAST_SEEN_MSG };
