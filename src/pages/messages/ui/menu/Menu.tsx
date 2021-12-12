import { HTMLAttributes } from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react';

import { NavPanel } from '../navPanel';
import { DisplayedNameForm } from 'pages/messages/ui';
import { profileStore } from 'shared/model/store';
import { Avatar } from 'shared/ui';

import styles from './Menu.module.scss';

export const Menu = observer((props: HTMLAttributes<HTMLDivElement>) => {
	const { className } = props;
	const { displayedName, avatarUrl } = profileStore.profile;

	return (
		<aside className={cn(styles.menu, className)}>
			<DisplayedNameForm />
			<Avatar text={displayedName} imgSrc={avatarUrl} className={styles.avatar} />
			<NavPanel className={styles.linksList} />
		</aside>
	);
});
