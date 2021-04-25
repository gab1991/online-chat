import React from 'react';
import MainPlanet from '../UI/SvgBackgroundComponents/MainPlanet';
import MiddlePlanet from '../UI/SvgBackgroundComponents/MiddlePlanet';
import Ring from '../UI/SvgBackgroundComponents/Ring';
import SmallPlanet from '../UI/SvgBackgroundComponents/SmallPlanet';
import TinyPlanet from '../UI/SvgBackgroundComponents/TinyPlanet';
import styles from './Loading.module.scss';

export default function Loading(props) {
	return (
		<div className={styles.Loading}>
			<div className={styles.RingContainer}>
				<Ring />
			</div>
			<div className={styles.MainPlanetContainer}>
				<MainPlanet />
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
			<h1 className={styles.LoadingPhrase}>Loading</h1>
		</div>
	);
}
