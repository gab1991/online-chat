import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import DarkPlanet from '../../../UI/SvgBackgroundComponents/DarkPlanet';
import styles from './Backdrop.module.scss';

export default function Backdrop(props) {
  return (
    <div className={styles.Backdrop}>
      <CSSTransition
        timeout={1000}
        classNames={'list-transition'}
        onEnter={() => console.log('asdasd')}>
        <div className={styles.MainPlanetContainer}>
          <DarkPlanet />
        </div>
      </CSSTransition>
    </div>
  );
}
