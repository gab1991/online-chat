import React from 'react';
import cn from 'classnames';

import styles from './EmptyBtn.module.scss';

export function EmptyBtn(
	props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
) {
	const { className, ...htmlProps } = props;

	return <button className={cn(styles.emptyBtn, className)} {...htmlProps} />;
}
