import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../UI/Avatar/Avatar';
import styles from './Contact.module.scss';
import { IContact } from '../../types';
import { makeAvatarUrlPath } from '../../Backend/Backend';

export function Contact(props: { contact: IContact; onClick: any }) {
	const { contact, onClick } = props;

	const { avatarUrl, displayedName, username } = contact;

	return (
		<div className={styles.Contact} onClick={onClick}>
			<Avatar text={displayedName} size={75} imgSrc={avatarUrl} className={styles.Avatar} />
			<div className={styles.NameSection}>
				<p className={styles.Username}>{`@${username}`}</p>
				<p className={styles.DisplayedName}>{displayedName}</p>
			</div>
		</div>
	);
}

Contact.propTypes = {
	username: PropTypes.string,
	displayedName: PropTypes.string,
	avatarPath: PropTypes.string,
	onLCick: PropTypes.func,
};
