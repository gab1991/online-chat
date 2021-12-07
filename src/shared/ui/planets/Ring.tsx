import * as React from 'react';

import sassVars from 'Configs/Variables.module.scss';

function _Ring(props: React.SVGAttributes<SVGElement>) {
	return (
		<svg width="100%" height="100%" viewBox="0 0 348 345" fill="none" {...props}>
			<g filter="url(#prefix__filter0_d2)">
				<path
					d="M341.006 170.494c-1.094 91.935-76.948 165.59-169.447 164.488C79.06 333.881 4.981 258.441 6.076 166.506 7.171 74.571 83.024.916 175.523 2.018c92.5 1.1 166.578 76.541 165.483 168.476z"
					stroke="url(#prefix__paint0_linear2)"
					strokeOpacity={0.52}
					strokeWidth={4}
				/>
			</g>
			<defs>
				<linearGradient
					id="prefix__paint0_linear2"
					x1={175.547}
					y1={0.018}
					x2={171.535}
					y2={336.982}
					gradientUnits="userSpaceOnUse">
					<stop stopColor={sassVars['palette-alpha']} />
					<stop offset={0.438} stopColor={sassVars['palette-zeta']} />
				</linearGradient>
				<filter
					id="prefix__filter0_d2"
					x={0.064}
					y={0.005}
					width={346.954}
					height={344.989}
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

export const Ring = React.memo(_Ring);
