import * as React from 'react';

function _Hamburger(props: React.SVGAttributes<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 33 33" {...props}>
			<path d="M0 33h33v-5.5H0V33zm0-13.75h33v-5.5H0v5.5zM0 0v5.5h33V0H0z" fillOpacity={1} />
		</svg>
	);
}

export const HamburgerSvg = React.memo(_Hamburger);
