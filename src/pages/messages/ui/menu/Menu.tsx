import { HTMLAttributes, useRef } from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react';

import { NavPanel } from '../navPanel';
import { messagePagestore } from 'pages/messages/model/store';
import { DisplayedNameForm } from 'pages/messages/ui';
import { useClickOutside } from 'shared/lib';
import { profileStore } from 'shared/model/store';
import { Avatar } from 'shared/ui';

import styles from './Menu.module.scss';

interface IMenuProps extends HTMLAttributes<HTMLDivElement> {
	refProp?: React.LegacyRef<HTMLElement>;
}

export const Menu = observer((props: IMenuProps) => {
	const { className, ...htmlProps } = props;
	const { displayedName, avatarUrl } = profileStore.profile;

	const menuRef = useRef<HTMLDivElement>(null);

	useClickOutside(menuRef, () => messagePagestore.setShowMenu(false));

	return (
		<aside className={cn(styles.menu, className)} ref={menuRef} {...htmlProps}>
			<DisplayedNameForm />
			<Avatar text={displayedName} imgSrc={avatarUrl} className={styles.avatar} />
			<NavPanel className={styles.linksList} />
		</aside>
	);
});
