import * as React from 'react';

function _Pencil(props: React.SVGAttributes<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 24 24" {...props}>
			<path
				d="M0 19.0007V24H4.9993L19.7439 9.2554L14.7446 4.2561L0 19.0007ZM23.6101 5.3893C24.13 4.8693 24.13 4.0294 23.6101 3.5095L20.4905 0.3899C19.9706 -0.12998 19.1307 -0.12998 18.6107 0.3899L16.1711 2.8296L21.1704 7.8289L23.6101 5.3893Z"
				fill="currentColor"
			/>
		</svg>
	);
}

export const PencilSvg = React.memo(_Pencil);
