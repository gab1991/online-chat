import { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './GradientButton.module.scss';

interface IPropsGradientButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	light?: boolean;
}

export function GradientButton(props: IPropsGradientButton) {
	const { className, light, ...htmlProps } = props;
	return <button className={cn(styles.gradientBtn, { [styles.gradientBtn_light]: light }, className)} {...htmlProps} />;
}
