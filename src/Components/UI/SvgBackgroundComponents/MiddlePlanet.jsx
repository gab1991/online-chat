import * as React from 'react';
import sassVars from '../../../Configs/Variables.scss';

function MiddlePlanet(props) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 152 152"
      fill="none"
      {...props}>
      <circle cx={76} cy={76} r={76} fill="url(#prefix__paint0_linear)" />
      <defs>
        <linearGradient
          id="prefix__paint0_linear"
          x1={76}
          y1={27.954}
          x2={142.623}
          y2={112.118}
          gradientUnits="userSpaceOnUse">
          <stop offset={0.036} stopColor={sassVars['palette-zeta']} />
          <stop offset={0.224} stopColor={sassVars['palette-epsilon']} />
          <stop offset={0.297} stopColor={sassVars['palette-epsilon']} />
          <stop offset={0.625} stopColor={sassVars['palette-gamma']} />
          <stop offset={1} stopColor={sassVars['palette-alpha']} />
        </linearGradient>
      </defs>
    </svg>
  );
}

const MemoMiddlePlanet = React.memo(MiddlePlanet);
export default MemoMiddlePlanet;
