import { IChat } from '../../../../types';

import {
	ADD_MESSAGE,
	calculateUnreadMsgs,
	CREATE_DUMMY_MSG,
	FILL_CHATS,
	SWAP_DUMMY_MSG_TO_DELIVERED,
	UPDATE_LAST_SEEN_MSG,
} from '../Actions/chatActions';

const chatReducer = (state = [], action) => {
	switch (action.type) {
		case FILL_CHATS: {
			// const updChats: IChat[] = action.payload;

			// console.log(updChats);

			// for (let chatId in updChats) {
			// 	// updChats[chatId].unreadCounter = 0;
			// }
			return [];
		}

		case ADD_MESSAGE: {
			// const { user_id, message } = action.payload;
			// const { conversation_id } = message;
			// const updChats = { ...state };
			// updChats[conversation_id].messages.push(message);
			// if (message.sender_id !== user_id) {
			// 	// update unread Counter
			// 	updChats[conversation_id].unreadCounter = calculateUnreadMsgs(
			// 		updChats[conversation_id].last_seen_msg_id,
			// 		updChats[conversation_id].messages,
			// 	);
			// } else {
			// 	updChats[conversation_id].unreadCounter = 0;
			// }
			// return updChats;
		}

		case CREATE_DUMMY_MSG: {
			// 	const dummyMsgBody = action.payload;
			// 	const updChats = { ...state };
			// 	updChats[dummyMsgBody.conversation_id].messages.push(dummyMsgBody);
			// 	updChats[dummyMsgBody.conversation_id].unreadCounter = 0;
			// 	return updChats;
			// }
			// case SWAP_DUMMY_MSG_TO_DELIVERED: {
			// 	const { newMsg, dummyID } = action.payload;
			// 	const { conversation_id } = newMsg;
			// 	const updChats = { ...state };
			// 	const msgsArr = updChats[conversation_id].messages;
			// 	for (let i = msgsArr.length - 1; i >= 0; i--) {
			// 		if (msgsArr[i].id === dummyID) {
			// 			msgsArr[i] = newMsg;
			// 			break;
			// 		}
			// 	}
			// 	return updChats;
		}

		case UPDATE_LAST_SEEN_MSG: {
			//@ts-ignore
			// const { conversation_id, last_seen_msg_id } = { ...action.payload };
			// const updChats = {
			// 	...state,
			// };
			// updChats[conversation_id].last_seen_msg_id = last_seen_msg_id;

			// updChats[conversation_id].unreadCounter = calculateUnreadMsgs(
			// 	updChats[conversation_id].last_seen_msg_id,
			// 	updChats[conversation_id].messages,
			// );

			return updChats;
		}

		default:
			return state;
	}
};

export default chatReducer;
