import { DarkPlanet } from 'shared/ui';

import styles from './Backdrop.module.scss';

export function Backdrop() {
	return (
		<div className={styles.Backdrop}>
			<div className={styles.MainPlanetContainer} data-name="main-planet">
				<DarkPlanet />
			</div>
		</div>
	);
}
