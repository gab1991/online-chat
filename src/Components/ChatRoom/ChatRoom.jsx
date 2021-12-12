import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import Socket from '../../Backend/Socket';
import Avatar from '../../shared/ui/avatar/Avatar';
import { formatPopUpScroll } from '../../Utils/timeFormatter';
import { clearRouterLocationState, debounce, scrollToBottom, throttle } from '../../Utils/Utils';
import Message from '../Message/Message';
// import { sendMsg } from '../../Store/Actions/chatActions';
import SearchTab from '../SearchTab/SearchTab';
import Input from '../UI/Inputs/Input/Input';
import DatePopUp from '../UI/PopUps/DatePopUp/DatePopUp';
import ArrowHeadSvg from '../UI/SvgIcons/ArrowHead';
import BackArrowIcon from '../UI/SvgIcons/BackArrow';
import KeyBoardIcon from '../UI/SvgIcons/Keyboard';
import LookUpIcon from '../UI/SvgIcons/LookUp';
import SendSvg from '../UI/SvgIcons/Send';

import sassVars from '../../Configs/Variables.module.scss';
import styles from './ChatRoom.module.scss';

function reducer(state, action) {
	switch (action.type) {
		case 'UPDATE_USER_ID': {
			return { ...state, userID: action.payload };
		}
		case 'UPDATE_CHAT_DATA': {
			if (!action.payload) return { ...state };
			const { messages, type } = action.payload;
			const convPartner = action.payload.participants[0];
			return { ...state, convPartner, messages, type };
		}
		case 'SEND_MESSAGE': {
			return { ...state, inputValue: '' };
		}
		case 'CHANGE_MSG_INPUT_VALUE': {
			const value = action.payload;
			return { ...state, inputValue: value };
		}
		case 'SET_MATCHED_MSGS': {
			const matchedMsgs = action.payload;
			return { ...state, matchedMsgs };
		}
		case 'SET_SELECTED_MATCHED_MSG': {
			const selectedMatchedMsg = action.payload;
			return { ...state, selectedMatchedMsg };
		}
		case 'SELECT_PREVIOUS_MATCHED_MSG': {
			const matchedMsgs = [...state.matchedMsgs];
			const curMatchedMsg = { ...state.selectedMatchedMsg };
			const prevMatchedMsg = {
				index: curMatchedMsg.index - 1,
				msgId: matchedMsgs[curMatchedMsg.index - 2].id,
			};
			return { ...state, selectedMatchedMsg: prevMatchedMsg };
		}
		case 'SELECT_NEXT_MATCHED_MSG': {
			const matchedMsgs = [...state.matchedMsgs];
			const curMatchedMsg = { ...state.selectedMatchedMsg };
			const nextMatchedMsg = {
				index: curMatchedMsg.index + 1,
				msgId: matchedMsgs[curMatchedMsg.index].id,
			};
			return { ...state, selectedMatchedMsg: nextMatchedMsg };
		}
		case 'SET_SEARCH_INPUT_VALUE': {
			const value = action.payload;
			return { ...state, searchInputValue: value };
		}
		case 'SET_IS_SEARCHING': {
			return { ...state, isSearching: action.payload };
		}
		case 'SET_DATE_POP_UP': {
			return { ...state, datePopUp: action.payload };
		}
		case 'HIDE_DATE_POP_UP': {
			const datePopUp = { ...state.datePopUp };
			datePopUp.isActive = false;
			return { ...state, datePopUp };
		}

		default:
			return state;
	}
}
function ChatRoom(props) {
	const { chatID } = props.match.params;
	const forwardedInputValue = props.location.state?.searchInputValue;
	const { user_id } = props;
	const searchInputRef = useRef();
	const msgInputRef = useRef();
	const msgArea = useRef();
	const messageRefs = useRef({});
	const isMounted = useRef(true);
	const chatData = useSelector((state) => state.chats[chatID]);
	const [
		{
			inputValue,
			matchedMsgs,
			selectedMatchedMsg,
			searchInputValue,
			isSearching,
			datePopUp,
			messages,
			type,
			convPartner,
		},
		dispatchLocal,
	] = useReducer(reducer, {
		chatID: chatID,
		convPartner: null,
		datePopUp: {
			content: '',
			isActive: false,
		},
		inputValue: '',
		isSearching: false,
		matchedMsgs: [],
		messages: [],
		searchInputValue: '',
		selectedMatchedMsg: {
			index: 1,
			msgId: null,
		},
		type: null,
		userID: user_id,
	});
	const dispatchGlobal = useDispatch();
	const [showSearch, setShowSearch] = useState(false);

	const findMessage = (searchStr, messages) => {
		if (!isMounted.current) return;
		if (searchStr.length === 0) {
			dispatchLocal({ payload: false, type: 'SET_IS_SEARCHING' });
			dispatchLocal({ payload: [], type: 'SET_MATCHED_MSGS' });
			scrollToBottom(msgArea.current);
			return;
		}

		const resullt = messages.filter((message) => {
			return message.message.toLowerCase().includes(searchStr.toLowerCase());
		});
		dispatchLocal({ payload: resullt.reverse(), type: 'SET_MATCHED_MSGS' });
		dispatchLocal({ payload: false, type: 'SET_IS_SEARCHING' });
	};

	const delayedSearch = useCallback(debounce(findMessage, 500), [searchInputValue, messages]);

	useEffect(() => {
		return () => {
			isMounted.current = false;
		};
	}, []);

	useEffect(() => {
		dispatchLocal({ payload: user_id, type: 'UPDATE_USER_ID' });
	}, [user_id]);

	useEffect(() => {
		if (chatData) {
			dispatchLocal({ payload: chatData, type: 'UPDATE_CHAT_DATA' });
		}
	}, [chatData]);

	useEffect(() => {
		if (!isMounted.current) return;
		if (forwardedInputValue) {
			setShowSearch(true);
			dispatchLocal({
				payload: forwardedInputValue,
				type: 'SET_SEARCH_INPUT_VALUE',
			});

			clearRouterLocationState(props.history);
		}
	}, [forwardedInputValue, props.history]);

	useEffect(() => {
		Socket.markMsgAsRead(chatID);
	}, [messages.length, chatID]);

	useEffect(() => {
		if (!datePopUp.isActive) return;
		const popUpTimer = setTimeout(() => {
			dispatchLocal({ type: 'HIDE_DATE_POP_UP' });
		}, 1000);
		return () => clearTimeout(popUpTimer);
	}, [datePopUp]);

	useEffect(() => {
		if (showSearch) {
			searchInputRef.current.focus();
		} else if (msgInputRef) {
			msgInputRef.current.focus();
		}
	}, [showSearch]);

	useEffect(() => {
		if (selectedMatchedMsg.msgId) {
			focusOnMsg(selectedMatchedMsg.msgId);
		}
	}, [selectedMatchedMsg.msgId]);

	useEffect(() => {
		if (matchedMsgs.length) {
			dispatchLocal({
				payload: {
					index: 1,
					msgId: matchedMsgs[0].id,
				},
				type: 'SET_SELECTED_MATCHED_MSG',
			});
		} else {
			dispatchLocal({
				payload: {
					index: 1,
					msgId: null,
				},
				type: 'SET_SELECTED_MATCHED_MSG',
			});
		}
	}, [matchedMsgs]);

	useEffect(() => {
		if (!isMounted.current) return;
		scrollToBottom(msgArea.current);
	}, [messages.length]);

	useEffect(() => {
		if (searchInputValue) {
			dispatchLocal({ payload: true, type: 'SET_IS_SEARCHING' });
		}
		delayedSearch(searchInputValue, messages);
	}, [searchInputValue, delayedSearch, messages]);

	const getlastVisibleMsg = (containerRef, msgRefsObj) => {
		if (!containerRef || !msgRefsObj) return;

		const msgIds = Object.keys(msgRefsObj).reverse();
		const maxHeight = containerRef.scrollHeight - containerRef.scrollTop;
		let currentSum = 0;
		let lastVisibleId = msgIds[0];

		for (let msgId of msgIds) {
			const elHeight = msgRefsObj[msgId].getBoundingClientRect().height;

			if (maxHeight > currentSum + elHeight) {
				currentSum += elHeight;
				lastVisibleId = msgId;
			} else {
				break;
			}
		}
		return Number(lastVisibleId);
	};

	const goBackHandler = () => {
		props.history.goBack();
	};

	const inputChangeHandler = (e) => {
		dispatchLocal({ payload: e.target.value, type: 'CHANGE_MSG_INPUT_VALUE' });
	};

	const submitHandler = (e) => {
		e.preventDefault();

		if (inputValue) {
			dispatchLocal({ payload: inputValue, type: 'SEND_MESSAGE' });
			// dispatchGlobal(sendMsg(chatID, inputValue));
		}
		msgInputRef.current.focus();
	};

	const toggleSearchInMsgs = () => {
		if (!isMounted.current) return;
		dispatchLocal({ payload: '', type: 'SET_SEARCH_INPUT_VALUE' });
		scrollToBottom(msgArea.current);
		setShowSearch((prevState) => !prevState);
	};

	const seacrhinputChangeHandler = (e) => {
		const searchStr = e.target.value;
		dispatchLocal({ payload: searchStr, type: 'SET_SEARCH_INPUT_VALUE' });
	};

	const focusOnMsg = (id) => {
		const msgEl = messageRefs.current[id];

		msgEl.scrollIntoView({
			behavior: 'smooth',
			block: 'center',
		});
	};

	const handleSearchList = (e) => {
		const direction = e.currentTarget.getAttribute('data-direction');
		switch (direction) {
			case 'down':
				if (selectedMatchedMsg.index <= 1) return;
				dispatchLocal({
					type: 'SELECT_PREVIOUS_MATCHED_MSG',
				});
				break;
			case 'up':
				if (selectedMatchedMsg.index >= matchedMsgs.length) return;
				dispatchLocal({
					type: 'SELECT_NEXT_MATCHED_MSG',
				});
				break;
			default:
		}
	};

	const clearSearchInput = () => {
		if (!isMounted.current) return;
		scrollToBottom(msgArea.current);
		searchInputRef.current.focus();
		dispatchLocal({ payload: '', type: 'SET_SEARCH_INPUT_VALUE' });
		dispatchLocal({ payload: [], type: 'SET_MATCHED_MSGS' });
	};

	const hideSearch = () => {
		if (isMounted.current) {
			setShowSearch(false);
		}
		dispatchLocal({ payload: '', type: 'SET_SEARCH_INPUT_VALUE' });
		dispatchLocal({ payload: [], type: 'SET_MATCHED_MSGS' });
	};

	const privateChatAvatarProps = {
		color: sassVars['palette-background'],
		imgSrc: convPartner && convPartner.avatar_path,
		size: 65,
		text: type === 'private' ? convPartner.displayed_name || convPartner.username : '',
	};

	const msgAreaScrollHandler = (msgAreaRef, msgsRefs, msgArr) => {
		const lastVisibleMsgId = getlastVisibleMsg(msgAreaRef.current, msgsRefs.current);

		let lastVisibleMsgDate;

		for (let msg of msgArr) {
			if (msg.id === lastVisibleMsgId) {
				lastVisibleMsgDate = msg.created_at;
				break;
			}
		}

		if (!lastVisibleMsgDate) return;

		const formattedTime = formatPopUpScroll(lastVisibleMsgDate);

		dispatchLocal({
			payload: { isActive: true, txtContent: formattedTime },
			type: 'SET_DATE_POP_UP',
		});
	};

	const throttledScroll = useCallback(
		throttle(() => msgAreaScrollHandler(msgArea, messageRefs, messages), 500),
		[msgArea, messageRefs, messages],
	);

	return (
		<div className={styles.ChatRoom}>
			<div className={styles.Header}>
				<DatePopUp
					className={`${styles.DatePopUp} ${datePopUp.isActive ? styles.DatePopUpActive : ''}`}
					txtContent={datePopUp.txtContent}
				/>
				<div className={styles.HeaderContent}>
					{!showSearch && (
						<>
							<div className={styles.BackArrowSvg} onClick={showSearch ? hideSearch : goBackHandler}>
								<BackArrowIcon className={styles.BackArrowSvg} />
							</div>
							<div className={styles.AvatarName}>
								<Avatar {...privateChatAvatarProps} className={styles.Avatar} />
								<h3>{type === 'private' ? convPartner.displayed_name || convPartner.username : ''}</h3>
								<div className={styles.LookUpSvg} onClick={toggleSearchInMsgs}>
									<LookUpIcon className={styles.LookUpSvg} />
								</div>
							</div>
						</>
					)}
					{showSearch && (
						<SearchTab
							inputRef={searchInputRef}
							isSearching={isSearching}
							toggleSearchInMsgs={toggleSearchInMsgs}
							seacrhinputChangeHandler={seacrhinputChangeHandler}
							searchInputValue={searchInputValue}
							clearInput={clearSearchInput}
						/>
					)}
				</div>
			</div>
			<div className={styles.MessageArea} ref={msgArea} onWheel={throttledScroll}>
				{messages.map((msg) => (
					<Message
						{...msg}
						key={msg.id}
						focused={selectedMatchedMsg.msgId === msg.id ? true : false}
						refCb={(msgId) => {
							return (messageRefs.current[msg.id] = msgId);
						}}
					/>
				))}
			</div>
			<form className={styles.TypeArea} onSubmit={submitHandler}>
				<div className={styles.TypeAreaSeparator}></div>
				{showSearch && (
					<div className={styles.SearchResultToggler}>
						{matchedMsgs.length > 0 && (
							<>
								<p>
									{selectedMatchedMsg.index}
									{` of `}
									{matchedMsgs.length}
								</p>
								<div className={styles.ArrowsContainer}>
									<div className={styles.ArrowSvgContainer} data-direction={'down'} onClick={handleSearchList}>
										<ArrowHeadSvg />
									</div>
									<div className={styles.ArrowSvgContainer} onClick={handleSearchList} data-direction={'up'}>
										<ArrowHeadSvg className={styles.ArrowHeadSvgReversed} />
									</div>
								</div>
							</>
						)}
						{!matchedMsgs.length && <p>No results</p>}
					</div>
				)}
				{!showSearch && (
					<div className={styles.InputContainer}>
						<Input
							onChange={inputChangeHandler}
							placeholder={'Type a message'}
							value={inputValue}
							type={'text'}
							className={styles.Input}
							inputRef={msgInputRef}
						/>
						{!!inputValue.length ? (
							<SendSvg className={`${styles.SvgIcon} ${styles.SendSvg} `} onClick={submitHandler} />
						) : (
							<KeyBoardIcon className={styles.SvgIcon} />
						)}
					</div>
				)}
			</form>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		user_id: state.profile.id,
	};
}

export default connect(mapStateToProps)(ChatRoom);
ChatRoom.propTypes = {
	user_id: PropTypes.number,
};
