import React from 'react';

import PropTypes from 'prop-types';

import { getHoursMinutes } from '../../../../Utils/timeFormatter';
import { Avatar } from 'shared/ui';

import styles from './Chat.module.scss';

export function Chat(props) {
	const { participants, onClick, matchedMsgs, messages, unreadCounter: unreadMsgs } = props;
	const privateContact = {
		...participants[0],
	};
	const msgPreview = matchedMsgs ? matchedMsgs[0] : messages[messages.length - 1];
	const [hours, minutes] = msgPreview ? getHoursMinutes(msgPreview.created_at) : [null, null];

	const privateAvatarProps = {
		imgSrc: privateContact.avatar_path,
		size: 65,
		text: privateContact.displayed_name || privateContact.username,
	};

	return (
		<div className={styles.Chat} onClick={onClick}>
			<Avatar {...privateAvatarProps} className={styles.Avatar} />
			<div className={styles.MessagePreview}>
				<p className={styles.ContactName}>{privateContact.displayed_name || privateContact.username}</p>
				<p>{msgPreview && msgPreview.message}</p>
			</div>
			<div className={styles.TimeSection}>
				<p>
					{hours}:{minutes}
				</p>
				{matchedMsgs && (
					<div className={styles.FoundMsgsNum}>
						<p>{matchedMsgs.length}</p>
					</div>
				)}
				{!matchedMsgs && !!unreadMsgs && (
					<div className={styles.UnreadMsgsNum}>
						<p>{unreadMsgs}</p>
					</div>
				)}
			</div>
		</div>
	);
}

Chat.propTypes = {
	lastSeenMsgId: PropTypes.number,
	messages: PropTypes.array,
	onClick: PropTypes.func,
	participants: PropTypes.array,
	type: PropTypes.string,
};
