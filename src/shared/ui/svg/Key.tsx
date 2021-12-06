import * as React from 'react';

function Key(props: React.SVGAttributes<SVGSVGElement>) {
	return (
		<svg width="100%" height="100%" viewBox="0 0 31 31" fill="none" {...props}>
			<path
				d="M20.484.382c-2.32.197-4.437 1.185-6.106 2.85a8.279 8.279 0 00-2.212 3.872c-.227.88-.3 1.455-.322 2.425a10.72 10.72 0 00.087 1.785l.045.357-3.794 4.467-5.432 6.397a226.622 226.622 0 00-1.695 2.008l-.058.076.019 2.813c.018 2.625.02 2.816.065 2.869l.045.057 2.727-.01c1.964-.006 2.742-.016 2.786-.04.053-.023.172-.267.636-1.326l.57-1.298.46-.016c.251-.01.924-.018 1.49-.02.944-.003 1.04-.008 1.087-.05.029-.024.6-1.23 1.268-2.68.67-1.447 1.223-2.64 1.231-2.648.008-.008.649-.018 1.427-.026 1.4-.013 1.41-.013 1.455-.068.026-.031.256-.758.514-1.612.259-.858.488-1.613.51-1.678l.039-.12.546.177c1.268.412 2.167.559 3.47.559 1.001.003 1.618-.07 2.488-.288 2.044-.51 3.892-1.767 5.284-3.597 1.54-2.02 2.141-4.463 1.782-7.241-.334-2.614-1.505-4.672-3.496-6.159a7.924 7.924 0 00-1.365-.841C24.93.823 23.669.487 22.306.379a18.342 18.342 0 00-1.822.003zm2.025 2.053c.702.092 1.263.23 1.849.461 1.605.63 2.942 1.814 3.699 3.28.606 1.17.867 2.417.83 3.97-.029 1.26-.26 2.196-.804 3.247-.369.716-.83 1.337-1.468 1.972-1.232 1.23-2.568 1.9-4.259 2.14-.377.052-1.684.044-2.114-.014-1.158-.155-2.568-.522-3.275-.855a3.16 3.16 0 01-.77-.482.587.587 0 00-.176-.123c-.114 0-.138.068-.704 2.097a92.593 92.593 0 01-.578 2.024c-.008.01-.625.026-1.366.037-1.191.015-1.355.023-1.386.06-.022.024-.567 1.177-1.216 2.567-.649 1.39-1.205 2.58-1.237 2.642l-.055.116H8.016c-1.113 0-1.482.007-1.53.034-.05.023-.181.304-.632 1.331l-.57 1.3-.448.017c-.245.01-.736.018-1.086.018h-.641V25.062l.707-.838c.387-.462 1.95-2.326 3.477-4.143 1.524-1.817 3.634-4.33 4.688-5.584 1.052-1.256 1.962-2.341 2.023-2.417l.105-.136-.055-.31c-.166-.962-.195-2.202-.069-3.09.266-1.89 1.15-3.438 2.65-4.638 1.073-.86 2.383-1.358 3.955-1.508.374-.034 1.537-.013 1.92.037z"
				fill="currentColor"
				fillOpacity={0.8}
			/>
			<path
				d="M22.41 5.743c-.752.082-1.335.35-1.83.84a2.86 2.86 0 00-.728 1.13c-.306.909-.156 1.913.398 2.658.16.217.54.582.759.729.841.568 1.988.652 2.916.214.76-.359 1.38-1.103 1.585-1.903.179-.697.074-1.557-.264-2.147-.445-.773-1.184-1.31-2.017-1.468a4.005 4.005 0 00-.82-.053zm.737 1.896c.293.11.554.383.675.697.037.097.05.197.05.38-.002.226-.01.268-.09.438-.107.23-.347.475-.566.574-.723.328-1.556-.147-1.614-.922-.045-.559.3-1.054.833-1.204.193-.052.52-.037.712.037z"
				fill="currentColor"
				fillOpacity={0.8}
			/>
		</svg>
	);
}

export const KeySvg = React.memo(Key);
