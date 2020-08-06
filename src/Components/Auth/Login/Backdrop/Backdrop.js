import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import DarkPlanet from '../../../UI/SvgBackgroundComponents/DarkPlanet';
import styles from './Backdrop.module.scss';

export default function Backdrop(props) {
  const [visible, setVisible] = useState(true);

  return (
    <div className={styles.Backdrop}>
      {/* <CSSTransition
        timeout={2000}
        classNames={'MainPlanetContainer-'}
        in={visible}
        unmountOnExit
        appear> */}
      <div className={styles.MainPlanetContainer}>
        <DarkPlanet />
      </div>
      {/* </CSSTransition> */}
    </div>
  );
}
