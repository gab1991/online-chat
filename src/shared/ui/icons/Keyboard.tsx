import * as React from 'react';

function _Keyboard(props: React.SVGAttributes<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 45 25" fill="currentColor" {...props}>
			<path
				d="M40.5 0h-36C2.025 0 .022 1.607.022 3.571L0 21.43C0 23.393 2.025 25 4.5 25h36c2.475 0 4.5-1.607 4.5-3.571V3.57C45 1.607 42.975 0 40.5 0zM20.25 5.357h4.5V8.93h-4.5V5.357zm0 5.357h4.5v3.572h-4.5v-3.572zM13.5 5.357H18V8.93h-4.5V5.357zm0 5.357H18v3.572h-4.5v-3.572zm-2.25 3.572h-4.5v-3.572h4.5v3.572zm0-5.357h-4.5V5.357h4.5V8.93zm20.25 12.5h-18v-3.572h18v3.572zm0-7.143H27v-3.572h4.5v3.572zm0-5.357H27V5.357h4.5V8.93zm6.75 5.357h-4.5v-3.572h4.5v3.572zm0-5.357h-4.5V5.357h4.5V8.93z"
				fillOpacity={0.5}
			/>
		</svg>
	);
}

export const KeyboardSvg = React.memo(_Keyboard);
