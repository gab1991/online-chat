import React, { useState } from 'react';
import DarkPlanet from '../../../UI/SvgBackgroundComponents/DarkPlanet';
import styles from './Backdrop.module.scss';

export default function Backdrop(props) {
  const [visible, setVisible] = useState(true);

  return (
    <div className={styles.Backdrop}>
      <div className={styles.MainPlanetContainer} data-name="main-planet">
        <DarkPlanet />
      </div>
    </div>
  );
}
