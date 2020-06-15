import React from 'react';
import PropTypes from 'prop-types';
import Elipse from '../../UI/SvgIcons/Elipse';
import sassVars from '../../../Configs/Variables.scss';
import styles from './Avatar.module.scss';

function hexToRGB(h, delta = 0) {
  const color = { r: 0, g: 0, b: 0 };

  if (h.length === 4) {
    color.r = '0x' + h[1] + h[1];
    color.g = '0x' + h[2] + h[2];
    color.b = '0x' + h[3] + h[3];
  } else if (h.length === 7) {
    color.r = '0x' + h[1] + h[2];
    color.g = '0x' + h[3] + h[4];
    color.b = '0x' + h[5] + h[6];
  }

  if (delta) {
    const randomizer = (multiplier) => {
      const sign = Math.random() < 0.5 ? -1 : 1;
      return sign * Math.round(Math.random() * multiplier);
    };

    for (let channel in color) {
      if (+color[channel] + randomizer(delta) > 255) {
        color[channel] = 255;
      } else if (+color[channel] + randomizer(delta) < 0) {
        color[channel] = 0;
      } else {
        color[channel] = +color[channel] + randomizer(delta);
      }
    }
  }

  return `rgb(${+color.r}, ${+color.g}, ${+color.b})`;
}

function randomizePalette(palette, delta) {
  const randEl = Math.floor(Math.random() * palette.length);
  return hexToRGB(palette[randEl], delta);
}

const palette = [
  sassVars['palette-gamma'],
  sassVars['palette-epsilon'],
  sassVars['palette-delta'],
  sassVars['palette-zeta'],
];

export default function Avatar(props) {
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

Avatar.Protypes = {
  text: PropTypes.string.isRequired,
  size: PropTypes.number,
  imgSrc: PropTypes.string,
  className: PropTypes.string,
};
