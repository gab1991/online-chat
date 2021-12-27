import * as React from 'react';

function _ArrowSvg(props: React.SVGAttributes<SVGSVGElement>): JSX.Element {
	return (
		<svg viewBox="0 0 32 32" fill="none" {...props}>
			<path
				d="M31.68 8.593L30.077 6.99a1.013 1.013 0 00-.738-.32c-.277 0-.523.106-.737.32L16 19.59 3.4 6.991a1.013 1.013 0 00-.738-.322c-.278 0-.524.107-.737.321L.32 8.593c-.214.214-.321.46-.321.738 0 .278.107.524.32.737L15.264 25.01c.213.214.46.32.737.32.278 0 .524-.106.737-.32L31.68 10.068c.214-.214.32-.46.32-.737 0-.278-.106-.524-.32-.738z"
				fill="#000"
			/>
		</svg>
	);
}

export const ArrowSvg = React.memo(_ArrowSvg);
