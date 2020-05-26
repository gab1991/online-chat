import React from 'react';
import MainPlanet from '../../../UI/SvgBackgroundComponents/MainPlanet';
import MiddlePlanet from '../../../UI/SvgBackgroundComponents/MiddlePlanet';
import Ring from '../../../UI/SvgBackgroundComponents/Ring';
import SmallPlanet from '../../../UI/SvgBackgroundComponents/SmallPlanet';
import TinyPlanet from '../../../UI/SvgBackgroundComponents/TinyPlanet';
import styles from './Backdrop.module.scss';

export default function Backdrop(props) {
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
