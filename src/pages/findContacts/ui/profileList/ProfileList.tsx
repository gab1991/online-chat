import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { observer } from 'mobx-react';

import { ProfilePlank } from '../profilePlank';
import { findContactsPageStore } from 'pages/findContacts/model/store';

import styles from './ProfileList.module.scss';

export const ProfileList = observer((): JSX.Element => {
	return (
		<ul className={styles.profileList}>
			<TransitionGroup>
				{findContactsPageStore.profiles.map((profile) => (
					<CSSTransition key={profile.id} timeout={200} classNames={{ ...styles }} in={true} unmountOnExit appear>
						<li>
							<ProfilePlank profile={profile} />
						</li>
					</CSSTransition>
				))}
			</TransitionGroup>
		</ul>
	);
});
