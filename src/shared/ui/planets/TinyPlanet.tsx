import * as React from 'react';

import sassVars from 'Configs/Variables.module.scss';

function _TinyPlanet(props) {
	return (
		<svg viewBox="0 0 24 24" fill="none" {...props}>
			<g filter="url(#prefix__filter0_d4">
				<circle cx={12} cy={12} r={10} fill="url(#prefix__paint0_linear4)" />
			</g>
			<defs>
				<linearGradient
					id="prefix__paint0_linear4"
					x1={18.667}
					y1={4.778}
					x2={12}
					y2={22}
					gradientUnits="userSpaceOnUse">
					<stop stopColor={sassVars['palette-gamma']} />
					<stop offset={1} stopColor={sassVars['palette-epsilon']} />
				</linearGradient>
				<filter
					id="prefix__filter0_d4"
					x={0}
					y={0}
					width={24}
					height={24}
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB">
					<feFlood floodOpacity={0} result="BackgroundImageFix" />
					<feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
					<feOffset />
					<feGaussianBlur stdDeviation={1} />
					<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
					<feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
					<feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
				</filter>
			</defs>
		</svg>
	);
}

export const TinyPlanet = React.memo(_TinyPlanet);
