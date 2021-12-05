import { HTMLAttributes, InputHTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './TransparentInput.module.scss';

export function TransparentInput(props: InputHTMLAttributes<HTMLInputElement>) {
	const { className, ...htmlProps } = props;
	return <input className={cn(styles.transparentInput, className)} {...htmlProps} />;
}
