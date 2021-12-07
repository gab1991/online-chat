import * as React from 'react';

import sassVars from 'Configs/Variables.module.scss';

function _SmallPlanet(props: React.SVGAttributes<SVGElement>) {
	return (
		<svg width="100%" height="100%" viewBox="0 0 50 50" fill="none" {...props}>
			<g filter="url(#prefix__filter0_d3)">
				<path
					d="M25 42c11.598 0 21-9.402 21-21S36.598 0 25 0 4 9.402 4 21s9.402 21 21 21z"
					fill="url(#prefix__paint0_linear3)"
				/>
			</g>
			<defs>
				<linearGradient id="prefix__paint0_linear3" x1={46} y1={0} x2={25} y2={42} gradientUnits="userSpaceOnUse">
					<stop offset={0.401} stopColor={sassVars['palette-epsilon']} />
					<stop offset={1} stopColor={sassVars['palette-gamma']} />
				</linearGradient>
				<filter
					id="prefix__filter0_d3"
					x={0}
					y={0}
					width={50}
					height={50}
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB">
					<feFlood floodOpacity={0} result="BackgroundImageFix" />
					<feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
					<feOffset dy={4} />
					<feGaussianBlur stdDeviation={2} />
					<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
					<feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
					<feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
				</filter>
			</defs>
		</svg>
	);
}

export const SmallPlanet = React.memo(_SmallPlanet);
