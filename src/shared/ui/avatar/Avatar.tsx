import React, { HTMLAttributes } from 'react';
import cn from 'classnames';

import { makeAvatarUrlPath, randomizePalette } from 'shared/lib';
import { Elipse } from 'shared/ui';

import styles from './Avatar.module.scss';
import sassVars from 'vars.module.scss';

const palette = [
	sassVars['palette-gamma'],
	sassVars['palette-epsilon'],
	sassVars['palette-delta'],
	sassVars['palette-zeta'],
];

export interface IAvatarProps extends HTMLAttributes<HTMLDivElement> {
	color?: string;
	imgSrc: string | null;
	text: string;
}

const paletteRandomizeGrain = 10;

export function _Avatar(props: IAvatarProps) {
	const { text, imgSrc, className, color, ...htmlProps } = props;

	const name = text.slice(0, 2);
	const finalColor = color || randomizePalette(palette, paletteRandomizeGrain);

	return (
		<div className={cn(styles.avatar, className)} {...htmlProps}>
			{imgSrc ? (
				<img src={makeAvatarUrlPath(imgSrc)} alt={text}></img>
			) : (
				<>
					<Elipse className={styles.elipseSvg} circlestroke={finalColor} />
					<span className={styles.username} style={{ color: finalColor }}>
						{name}
					</span>
				</>
			)}
		</div>
	);
}

export const Avatar = React.memo(_Avatar);
