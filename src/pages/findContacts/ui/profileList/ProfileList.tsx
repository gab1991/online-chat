import { HTMLAttributes } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import cn from 'classnames';
import { observer } from 'mobx-react';

import { ProfilePlank } from '../profilePlank';
import { findContactsPageStore } from 'pages/findContacts/model/store';

import styles from './ProfileList.module.scss';

export const ProfileList = observer((props: HTMLAttributes<HTMLUListElement>): JSX.Element => {
	const { className, ...htmlProps } = props;

	return (
		<ul className={cn(styles.profileList, className)} {...htmlProps}>
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
