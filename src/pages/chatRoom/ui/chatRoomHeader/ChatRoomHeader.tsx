import { useState } from 'react';
import { observer } from 'mobx-react';

import { IChat } from 'shared/types';

import { useSearchMessagesInChat } from 'pages/chatRoom/model/hooks/useSearchMsgInChat';
import { chatsStore, profileStore } from 'shared/model/store';
import { SearchBar } from 'shared/ui';

import styles from './ChatRoomHeader.module.scss';

import { AvatarName } from '..';

interface IChatRoomHeader {
	chat: IChat;
}

export const ChatRoomHeader = observer((props: IChatRoomHeader) => {
	const { chat } = props;

	const { isSearching, onChange, searchValue } = useSearchMessagesInChat(chat.id, chatsStore.searchMsgStr);

	const [showSearchBar, setShowSearchBar] = useState(!!chatsStore.searchMsgStr);

	const chatParticipant = chat.participants.find((participant) => participant.id !== profileStore.profile.id);

	const onLookUpBtnClick = (): void => setShowSearchBar(true);
	const onSearchBarBackArrowClick = (): void => {
		setShowSearchBar(false);
		onChange('');
	};

	return (
		<header className={styles.header}>
			{showSearchBar ? (
				<SearchBar
					onBackArrowClick={onSearchBarBackArrowClick}
					placeholder="Search messages"
					value={searchValue}
					onValueChange={onChange}
					showSpinner={isSearching}
				/>
			) : (
				chatParticipant && <AvatarName chatParticipant={chatParticipant} onLookUpBtnClick={onLookUpBtnClick} />
			)}
		</header>
	);
});
