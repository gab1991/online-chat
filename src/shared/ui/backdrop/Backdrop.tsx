import { HTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './Backdrop.module.scss';

export function Backdrop(props: HTMLAttributes<HTMLDivElement>) {
	const { className, ...htmlProps } = props;
	return <div className={cn(styles.backDrop, className)} {...htmlProps} />;
}
