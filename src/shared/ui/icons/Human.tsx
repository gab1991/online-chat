import React, { SVGAttributes } from 'react';

function _Human(props: SVGAttributes<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 31 28" fill="none" {...props}>
			<path
				d="M15.073 3.446c2.072 0 3.768 1.551 3.768 3.447 0 1.895-1.696 3.446-3.768 3.446-2.073 0-3.768-1.55-3.768-3.446 0-1.896 1.695-3.447 3.768-3.447zm0 15.509c5.087 0 10.928 2.223 11.305 3.446v1.724H3.768v-1.706c.377-1.241 6.218-3.464 11.305-3.464zm0-18.955c-4.164 0-7.537 3.084-7.537 6.893 0 3.808 3.373 6.892 7.537 6.892s7.537-3.084 7.537-6.892C22.61 3.084 19.236 0 15.073 0zm0 15.509C10.043 15.509 0 17.818 0 22.4v5.17h30.146V22.4c0-4.583-10.042-6.892-15.073-6.892z"
				fill="currentColor"
				fillOpacity={0.8}
			/>
		</svg>
	);
}

export const HumanSvg = React.memo(_Human);
