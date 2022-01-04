import { useState } from 'react';
import { observer } from 'mobx-react';

import { IChat } from 'shared/types';

import { chatsStore, profileStore } from 'shared/model/store';
import { SearchBar } from 'shared/ui';

import styles from './ChatRoomHeader.module.scss';

import { AvatarName } from '..';

interface IChatRoomHeader {
	chat: IChat;
}

export const ChatRoomHeader = observer((props: IChatRoomHeader) => {
	const { chat } = props;
	const [inputValue, setInputValue] = useState(chatsStore.searchMsgStr);

	const [showSearchBar, setShowSearchBar] = useState(!!chatsStore.searchMsgStr);

	const chatParticipant = chat.participants.find((participant) => participant.id !== profileStore.profile.id);

	const onLookUpBtnClick = (): void => setShowSearchBar(true);
	const onSearchBarBackArrowClick = (): void => setShowSearchBar(false);

	return (
		<header className={styles.header}>
			{showSearchBar ? (
				<SearchBar
					onBackArrowClick={onSearchBarBackArrowClick}
					placeholder="Search messages"
					value={inputValue}
					onValueChange={setInputValue}
				/>
			) : (
				chatParticipant && <AvatarName chatParticipant={chatParticipant} onLookUpBtnClick={onLookUpBtnClick} />
			)}
		</header>
	);
});
