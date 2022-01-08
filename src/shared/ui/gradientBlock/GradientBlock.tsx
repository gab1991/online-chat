import { HTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './GradientBlock.module.scss';

export function GradientBlock(props: HTMLAttributes<HTMLDivElement>): JSX.Element {
	const { className, ...htmlProps } = props;
	return <div className={cn(styles.gradiendBlock, className)} {...htmlProps}></div>;
}
