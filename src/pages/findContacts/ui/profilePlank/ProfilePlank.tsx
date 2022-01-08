import { ButtonHTMLAttributes } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { observer } from 'mobx-react';

import { IProfile } from 'shared/types';

import { api } from 'shared/api/rest';
import { chatsStore } from 'shared/model/store';
import { Avatar, EmptyBtn } from 'shared/ui';

import styles from './ProfilePlank.module.scss';

interface IProfilePlankProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	profile: IProfile;
}

export const ProfilePlank = observer((props: IProfilePlankProps) => {
	const { profile, className, ...htmlProps } = props;
	const navigate = useNavigate();

	const onProfilePlankClick = async (): Promise<void> => {
		const { data: chat } = await api.chatApiService.enterChat({ participantId: profile.id });

		if (chat) {
			chatsStore.mergeChats(chat);
			navigate(`/chats/${chat.id}`);
		}
	};

	return (
		<EmptyBtn className={cn(styles.profilePlank, className)} onClick={onProfilePlankClick} {...htmlProps}>
			<Avatar text={profile.displayedName} imgSrc={profile.avatarUrl} className={styles.avatar} />
			<h3 className={styles.dispNameHeader}>{profile.displayedName}</h3>
			<p className={styles.userName}>@{profile.username}</p>
		</EmptyBtn>
	);
});
