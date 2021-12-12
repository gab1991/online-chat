import * as React from 'react';

function _Circular(props: React.SVGAttributes<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" {...props}>
			<circle
				cx={50}
				cy={50}
				fill="none"
				stroke="currentColor"
				strokeWidth={10}
				r={43}
				strokeDasharray="202.63272615654165 69.54424205218055"
				transform="rotate(62.932 50 50)">
				<animateTransform
					attributeName="transform"
					type="rotate"
					repeatCount="indefinite"
					dur="1.7857142857142856s"
					values="0 50 50;360 50 50"
					keyTimes="0;1"
				/>
			</circle>
		</svg>
	);
}

export const CircularSpinner = React.memo(_Circular);
