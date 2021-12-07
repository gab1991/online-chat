import { MainPlanet, MiddlePlanet, Ring, SmallPlanet, TinyPlanet } from 'shared/ui';

import styles from './Backdrop.module.scss';

export function Backdrop() {
	return (
		<div className={styles.backdrop}>
			<MainPlanet className={styles.mainPlaner} />
			<Ring className={styles.ringPlanet} />
			<MiddlePlanet className={styles.middlePlanet} />
			<SmallPlanet className={styles.smallPlanet} />
			<TinyPlanet className={styles.tinyPlanet} />
		</div>
	);
}
