import React from 'react';

// import { IContact } from '../../shared/types';
import PropTypes from 'prop-types';

// import { makeAvatarUrlPath } from '../../Backend/Backend';
import { Avatar } from 'shared/ui';

import styles from './Contact.module.scss';

export function Contact(props: { contact: any; onClick: any }) {
	const { contact, onClick } = props;

	const { avatarUrl, displayedName, username } = contact;

	return (
		<div className={styles.Contact} onClick={onClick}>
			{/* <Avatar text={displayedName} size={75} imgSrc={avatarUrl} className={styles.Avatar} />
			<div className={styles.NameSection}>
				<p className={styles.Username}>{`@${username}`}</p>
				<p className={styles.DisplayedName}>{displayedName}</p>
			</div> */}
		</div>
	);
}

Contact.propTypes = {
	avatarPath: PropTypes.string,
	displayedName: PropTypes.string,
	onLCick: PropTypes.func,
	username: PropTypes.string,
};
