import * as React from 'react';

interface IElipseProps extends React.SVGAttributes<SVGSVGElement> {
	circlestroke?: string;
}

function _Elipse(props: IElipseProps) {
	const { circlestroke } = props;

	return (
		<svg viewBox="0 0 75 75" {...props}>
			<circle cx={37.5} cy={37.5} r={36.5} stroke={circlestroke || 'currentColor'} fill="none" strokeWidth={4} />
		</svg>
	);
}

export const Elipse = React.memo(_Elipse);
