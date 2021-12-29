/* eslint-disable @typescript-eslint/no-magic-numbers */

type TColorMap = {
	b: string | number;
	g: string | number;
	r: string | number;
};

function hexToRGB(h: string, delta = 0): string {
	const color: TColorMap = { b: 0, g: 0, r: 0 };

	if (h.length === 4) {
		color.r = '0x' + h[1] + h[1];
		color.g = '0x' + h[2] + h[2];
		color.b = '0x' + h[3] + h[3];
	} else if (h.length === 7) {
		color.r = '0x' + h[1] + h[2];
		color.g = '0x' + h[3] + h[4];
		color.b = '0x' + h[5] + h[6];
	}

	if (delta) {
		const randomizer = (multiplier: number): number => {
			const sign = Math.random() < 0.5 ? -1 : 1;
			return sign * Math.round(Math.random() * multiplier);
		};

		for (const channel in color) {
			if (+color[channel] + randomizer(delta) > 255) {
				color[channel] = 255;
			} else if (+color[channel] + randomizer(delta) < 0) {
				color[channel] = 0;
			} else {
				color[channel] = +color[channel] + randomizer(delta);
			}
		}
	}

	return `rgb(${+color.r}, ${+color.g}, ${+color.b})`;
}

export function randomizePalette(palette: string[], delta: number): string {
	const randEl = Math.floor(Math.random() * palette.length);
	return hexToRGB(palette[randEl], delta);
}
