import { HTMLAttributes } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { observer } from 'mobx-react';

import { authApiService } from 'shared/api';
import { profileStore } from 'shared/model/store';
import { CogSvg, EmptyBtn, ExitSvg, HumanSvg } from 'shared/ui';

import styles from './NavPanel.module.scss';

export const NavPanel = observer((props: HTMLAttributes<HTMLUListElement>) => {
	const { className, ...htmlProps } = props;

	const sendLogOut = () => {
		profileStore.clearProfile();
		authApiService.logout();
	};

	const navElelemts = [
		{
			icon: HumanSvg,
			text: 'Contacts',
			to: '/findContact',
		},
		{
			icon: CogSvg,
			text: 'Settings',
			to: '/userSettings',
		},
		{
			icon: ExitSvg,
			onClick: sendLogOut,
			text: 'Exit',
		},
	];

	return (
		<ul className={cn(styles.navPanel, className)} {...htmlProps}>
			{navElelemts.map((navEl) => {
				if (navEl.to) {
					return (
						<NavLink key={navEl.text} to={navEl.to} className={styles.navlink}>
							<navEl.icon className={styles.svgIcon} />
							<span className={styles.textContainer}>{navEl.text}</span>
						</NavLink>
					);
				}
				return (
					<EmptyBtn key={navEl.text} onClick={navEl.onClick} className={styles.navlink}>
						<navEl.icon className={styles.svgIcon} />
						<span className={styles.textContainer}>{navEl.text}</span>
					</EmptyBtn>
				);
			})}
		</ul>
	);
});
