import * as React from 'react';
import sassVars from '../../../Configs/Variables.module.scss';

function Elipse(props) {
	const { strokeclr } = props;
	const basicStrokeClr = sassVars['palette-gamma'];
	return (
		<svg width="100%" height="100%" viewBox="0 0 75 75" fill="none" {...props}>
			<circle cx={37.5} cy={37.5} r={36.5} stroke={strokeclr || basicStrokeClr} strokeWidth={4} />
		</svg>
	);
}

const MemoElipse = React.memo(Elipse);
export default MemoElipse;
