import * as React from 'react';
import sassVars from '../../../Configs/Variables.scss';

function MainPlanet(props) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 457 457"
      fill="none"
      {...props}>
      <g filter="url(#prefix__filter0_d)">
        <path
          d="M410.899 119.303c60.622 101.266 28.103 232.245-72.633 292.55-100.737 60.304-231.543 27.098-292.165-74.168-60.622-101.267-28.103-232.246 72.633-292.55C219.47-15.17 350.277 18.035 410.899 119.302z"
          fill="url(#prefix__paint0_linear1)"
          fillOpacity={1}
        />
      </g>
      <defs>
        <linearGradient
          id="prefix__paint0_linear1"
          x1={365}
          y1={64.5}
          x2={125.591}
          y2={404.587}
          gradientUnits="userSpaceOnUse">
          <stop stopColor={sassVars['palette-beta']} />
          <stop offset={0.333} stopColor={sassVars['palette-gamma']} />
          <stop offset={0.677} stopColor={sassVars['palette-delta']} />
          <stop offset={1} stopColor={sassVars['palette-zeta']} />
        </linearGradient>
        <filter
          id="prefix__filter0_d"
          x={0.588}
          y={0.052}
          width={455.824}
          height={456.883}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB">
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset />
          <feGaussianBlur stdDeviation={7.5} />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>
  );
}

const MemoMainPlanet = React.memo(MainPlanet);
export default MemoMainPlanet;
