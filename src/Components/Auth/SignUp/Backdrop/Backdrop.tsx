import { MainPlanet, MiddlePlanet, Ring, SmallPlanet, TinyPlanet } from 'shared/ui';

import styles from './Backdrop.module.scss';

export function Backdrop() {
	return (
		<div className={styles.Backdrop}>
			<div className={styles.MainPlanetContainer}>
				<MainPlanet />
			</div>
			<div className={styles.RingContainer}>
				<Ring />
			</div>
			<div className={styles.MiddlePlanetContainer}>
				<MiddlePlanet />
			</div>
			<div className={styles.SmallPlanetContainer}>
				<SmallPlanet />
			</div>
			<div className={styles.TinyPlanetContainer}>
				<TinyPlanet />
			</div>
		</div>
	);
}
