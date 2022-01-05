import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react';

import { profileStore } from 'shared/model/store';
import { Avatar } from 'shared/ui';

import { EditAccordion } from './ui';

import styles from './UserSettingsPage.module.scss';

export const UserSettingsPage = observer(() => {
	const { displayedName, avatarUrl } = profileStore.profile;

	return (
		<div className={styles.userSettingsPage}>
			<section className={styles.avatarSection}>
				<nav className={styles.nav}>
					<div className={styles.cancelContainer}>
						<NavLink to="/" className={styles.cancel}>
							Cancel
						</NavLink>
					</div>
					<h2 className={styles.editProfile}>Edit Profile</h2>
				</nav>
				<Avatar text={displayedName} imgSrc={avatarUrl} className={styles.avatar} />
			</section>
			<section className={styles.settings}>
				<ul>
					<li>
						<EditAccordion>
							{(open): JSX.Element => (
								<>
									<EditAccordion.Clickable isOpen={open}>Edit Avatar</EditAccordion.Clickable>
									<EditAccordion.Foldable>avatar editing</EditAccordion.Foldable>
								</>
							)}
						</EditAccordion>
					</li>
					<li>
						<EditAccordion>
							{(open): JSX.Element => (
								<>
									<EditAccordion.Clickable isOpen={open}>Edit Displayed Name</EditAccordion.Clickable>
									<EditAccordion.Foldable>disp name editing</EditAccordion.Foldable>
								</>
							)}
						</EditAccordion>
					</li>
				</ul>
			</section>
		</div>
	);
});
