import React from 'react';
import PropTypes from 'prop-types';
import Elipse from '../../UI/SvgIcons/Elipse';
import { randomizePalette } from '../../../Utils/colorWorks';
import sassVars from '../../../Configs/Variables.scss';
import styles from './Avatar.module.scss';

const palette = [
  sassVars['palette-gamma'],
  sassVars['palette-epsilon'],
  sassVars['palette-delta'],
  sassVars['palette-zeta'],
];

function Avatar(props) {
  const { text, size = 50, imgSrc, className, color } = props;
  const name = text.slice(0, 2);
  const randColor = randomizePalette(palette, 10);

  return (
    <div
      className={`${styles.Avatar} ${className}`}
      style={{
        backgroundSize: `cover`,
        backgroundPosition: `center center`,
        width: size,
        height: size,
      }}>
      {imgSrc && <img src={imgSrc} alt={text}></img>}
      {!imgSrc && (
        <>
          <Elipse className={styles.ElipseSvg} strokeclr={color || randColor} />
          <span
            className={styles.Username}
            style={{ color: color || randColor }}>
            {name}
          </span>
        </>
      )}
    </div>
  );
}

export default React.memo(Avatar);

Avatar.Protypes = {
  text: PropTypes.string.isRequired,
  size: PropTypes.number,
  imgSrc: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
};
