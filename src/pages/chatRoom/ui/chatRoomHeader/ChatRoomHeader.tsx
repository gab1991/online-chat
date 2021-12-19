import { useState } from 'react';
import { observer } from 'mobx-react';

import { IChat } from 'shared/types';

import { profileStore } from 'shared/model/store';
import { SearchBar } from 'shared/ui';

import styles from './ChatRoomHeader.module.scss';

import { AvatarName } from '..';

interface IChatRoomHeader {
	chat: IChat;
}

export const ChatRoomHeader = observer((props: IChatRoomHeader) => {
	const { chat } = props;

	const [showSearchBar, setShowSearchBar] = useState(false);

	const chatParticipant = chat.participants.find((participant) => participant.id !== profileStore.profile.id);

	const onLookUpBtnClick = () => setShowSearchBar(true);
	const onSearchBarBackArrowClick = () => setShowSearchBar(false);

	return (
		<header className={styles.header}>
			{showSearchBar ? (
				<SearchBar onBackArrowClick={onSearchBarBackArrowClick} />
			) : (
				chatParticipant && <AvatarName chatParticipant={chatParticipant} onLookUpBtnClick={onLookUpBtnClick} />
			)}
		</header>
	);
});
