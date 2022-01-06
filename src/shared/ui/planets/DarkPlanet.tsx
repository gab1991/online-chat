import React from 'react';

import sassVars from 'vars.module.scss';

function _DarkPlanet(props: React.SVGAttributes<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 790 785" fill="none" {...props}>
			<g filter="url(#prefix__filter0_d5)">
				<ellipse cx={404} cy={392.5} rx={370} ry={367.5} fill="url(#prefix__paint0_linear5)" />
			</g>
			<defs>
				<linearGradient id="prefix__paint0_linear5" x1={404} y1={25} x2={404} y2={760} gradientUnits="userSpaceOnUse">
					<stop offset={0.297} stopColor={sassVars['palette-gamma']} />
					<stop offset={0.583} stopColor={sassVars['palette-delta']} />
					<stop offset={0.802} stopColor={sassVars['palette-epsilon']} />
					<stop offset={1} stopColor={sassVars['palette-zeta']} />
				</linearGradient>
				<filter
					id="prefix__filter0_d5"
					x={0}
					y={0}
					width={790}
					height={785}
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB">
					<feFlood floodOpacity={0} result="BackgroundImageFix" />
					<feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
					<feOffset dx={-9} />
					<feGaussianBlur stdDeviation={12.5} />
					<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
					<feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
					<feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
				</filter>
			</defs>
		</svg>
	);
}

export const DarkPlanet = React.memo(_DarkPlanet);
