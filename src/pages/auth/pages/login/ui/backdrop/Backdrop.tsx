import { DarkPlanet } from 'shared/ui';

import styles from './Backdrop.module.scss';

export function Backdrop(): JSX.Element {
	return (
		<div className={styles.backdrop}>
			<DarkPlanet className={styles.mainPlaner} data-name="main-planet" />
		</div>
	);
}
