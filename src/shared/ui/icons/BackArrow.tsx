import * as React from 'react';

function _BackArrow(props: React.SVGAttributes<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 22 22" fill="currentColor" {...props}>
			<path d="M11 16.5V22L0 11 11 0v5.5h11v11H11z" />
		</svg>
	);
}

export const BackArrowSvg = React.memo(_BackArrow);
