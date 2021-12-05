import { InputHTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './Checkbox.module.scss';

type ICheckBoxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export function Checkbox(props: ICheckBoxProps) {
	const { className, ...htmlProps } = props;
	return <input type="checkbox" className={cn(styles.checkbox, className)} {...htmlProps} />;
}
