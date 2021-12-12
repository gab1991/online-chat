import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import cn from 'classnames';

import SearchTab from '../../Components/SearchTab/SearchTab';
import Button from '../../Components/UI/Buttons/Button/Button';
import HamburgerIcon from '../../Components/UI/SvgIcons/Hamburger';
import LookUpIcon from '../../Components/UI/SvgIcons/LookUp';
import FadingLinesSpinner from '../../Components/UI/SvgSpinners/FadingLines';
import { debounce, isEmptyObj } from '../../Utils/Utils';

// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { Chat, Menu } from './ui';

import styles from './MessagesPage.module.scss';

function sortConvByTime(convObj) {
	const sortedIds = Object.keys(convObj).sort((chatId1, chatId2) => {
		const messageArr1 = convObj[chatId1].matchedMsgs || convObj[chatId1].messages;
		const messageArr2 = convObj[chatId2].matchedMsgs || convObj[chatId2].messages;
		const lastMsg1Date = Date.parse(messageArr1[messageArr1.length - 1].created_at);
		const lastMsg2Date = Date.parse(messageArr2[messageArr2.length - 1].created_at);

		if (lastMsg1Date < lastMsg2Date) {
			return 1;
		} else if (lastMsg2Date < lastMsg1Date) {
			return -1;
		} else {
			return 0;
		}
	});

	const sortedConvArr: any[] = [];
	sortedIds.forEach((id) => {
		sortedConvArr.push(convObj[id]);
	});

	return sortedConvArr;
}

function removeConvWithoutMsgs(convObj) {
	const emptyConvsRemoved = {};

	for (const id in convObj) {
		if (convObj[id]?.messages.length > 0) {
			emptyConvsRemoved[id] = { ...convObj[id] };
		}
	}
	return emptyConvsRemoved;
}

function reducer(state, action) {
	switch (action.type) {
		case 'FILL_DISPLAYED_CONVS': {
			const conversations = action.payload;
			const { matchedConvs, searchInputValue } = state;
			let displConvs: any[] = [];

			if (!isEmptyObj(matchedConvs) || searchInputValue.length !== 0) {
				displConvs = sortConvByTime(matchedConvs);
			} else {
				const emptyConvsRemoved = removeConvWithoutMsgs(conversations);
				displConvs = sortConvByTime(emptyConvsRemoved);
			}

			return { ...state, displConvs, isUpdatingDisplConvs: false };
		}
		case 'SET_IS_UPD_DISPL_CONVS': {
			return { ...state, isUpdatingDisplConvs: action.payload };
		}
		case 'CHANGE_INPUT_VALUE': {
			const value = action.payload;
			return { ...state, searchInputValue: value };
		}
		case 'SET_IS_SEARCHING': {
			const value = action.payload;
			return { ...state, isSearching: value };
		}
		case 'SET_MATCHED_CONVS': {
			const matchedConvs = action.payload;
			return { ...state, matchedConvs };
		}
		default:
			return state;
	}
}

export function Messages(props: any) {
	const { conversations } = props;
	const inputRef = useRef();
	const [{ displConvs, matchedConvs, searchInputValue, isSearching, isUpdatingDisplConvs }, dispatchLocal] = useReducer(
		reducer,
		{
			displConvs: [],
			isSearching: false,
			isUpdatingDisplConvs: false,
			matchedConvs: {},
			searchInputValue: '',
		},
	);
	const [showMenu, setShowMenu] = useState(false);
	const [showSearchTab, setSearchTab] = useState(false);

	const findMessage = (searchStr, conversations) => {
		const foundConvs = {};
		if (searchStr.length === 0) {
			dispatchLocal({ payload: false, type: 'SET_IS_SEARCHING' });
			dispatchLocal({
				payload: foundConvs,
				type: 'SET_MATCHED_CONVS',
			});
			return;
		}
		for (const id in conversations) {
			const conversation = { ...conversations[id] };
			if (!conversation.messages.length) continue;
			const convResult = conversation.messages.filter((message) => {
				return message.message.toLowerCase().includes(searchStr.toLowerCase());
			});
			if (convResult.length) {
				foundConvs[conversation.id] = conversation;
				foundConvs[conversation.id].matchedMsgs = convResult;
			}
		}
		dispatchLocal({ payload: false, type: 'SET_IS_SEARCHING' });
		dispatchLocal({
			payload: foundConvs,
			type: 'SET_MATCHED_CONVS',
		});
	};

	const delayedSearch = useCallback(debounce(findMessage, 500), [searchInputValue, conversations]);

	useEffect(() => {
		dispatchLocal({ payload: true, type: 'SET_IS_UPD_DISPL_CONVS' });
		dispatchLocal({ payload: conversations, type: 'FILL_DISPLAYED_CONVS' });
	}, [conversations, matchedConvs]);

	useEffect(() => {
		if (searchInputValue) {
			dispatchLocal({ payload: true, type: 'SET_IS_SEARCHING' });
		}
		delayedSearch(searchInputValue, conversations);
	}, [searchInputValue, conversations, delayedSearch]);

	useEffect(() => {
		if (showSearchTab) {
			(inputRef.current as any).focus();
		}
	}, [showSearchTab]);

	const enterChat = (conversationID) => {
		const matchedMsgs = matchedConvs[conversationID] ? matchedConvs[conversationID].matchedMsgs : [];
		props.history.push({
			pathname: `/chats/${conversationID}`,
			state: { matchedMsgs, searchInputValue },
		});
	};

	const toggleSearchInMsgs = () => {
		setSearchTab((prev) => !prev);
		dispatchLocal({ payload: '', type: 'CHANGE_INPUT_VALUE' });
		dispatchLocal({ payload: {}, type: 'SET_MATCHED_CONVS' });
	};

	const seacrhinputChangeHandler = (e) => {
		const searchStr = e.target.value;
		dispatchLocal({ payload: searchStr, type: 'CHANGE_INPUT_VALUE' });
	};

	const clearInput = () => {
		dispatchLocal({ payload: '', type: 'CHANGE_INPUT_VALUE' });
		(inputRef.current as any).focus();
	};

	const goToContactSearch = () => {
		props.history.push('/findContact');
	};

	return (
		<div className={styles.Messages}>
			<div className={styles.Header}>
				<div className={styles.HeaderContent}>
					{!showSearchTab && (
						<>
							<HamburgerIcon
								className={styles.HamburgerSvg}
								onClick={() => {
									setShowMenu(true);
								}}
							/>
							<h3>Messages</h3>
							<div className={styles.LookUpSvg} onClick={toggleSearchInMsgs}>
								<LookUpIcon className={styles.LookUpSvg} />
							</div>
						</>
					)}
					{showSearchTab && (
						<SearchTab
							inputRef={inputRef}
							isSearching={isSearching}
							toggleSearchInMsgs={toggleSearchInMsgs}
							seacrhinputChangeHandler={seacrhinputChangeHandler}
							searchInputValue={searchInputValue}
							clearInput={clearInput}
						/>
					)}
				</div>
			</div>
			<div className={styles.ChatsContainer}>
				{!!displConvs.length &&
					displConvs.map((conversation) => {
						return (
							<Chat
								key={conversation.id}
								matchedMsgs={matchedConvs.id}
								{...conversation}
								onClick={() => enterChat(conversation.id)}
							/>
						);
					})}
				{!displConvs.length && !isUpdatingDisplConvs && (
					<>
						<p className={styles.NothingFound}>{showSearchTab ? 'No messages found' : 'No chats yet!'}</p>
						{!showSearchTab && (
							<Button txtContent={'Go to find a friend'} onClick={goToContactSearch} className={styles.FindFriendBtn} />
						)}
					</>
				)}
				{!displConvs.length && isUpdatingDisplConvs && (
					<div className={styles.SpinnerContainer}>
						<FadingLinesSpinner />
					</div>
				)}
			</div>
			{showMenu && (
				<div
					className={styles.BackDrop}
					onClick={() => {
						setShowMenu(false);
					}}></div>
			)}
			<Menu className={cn(styles.slidingMenu, { [styles.slidingMenu_show]: showMenu })} />
		</div>
	);
}
