import React, { ButtonHTMLAttributes, ReactNode } from 'react';

import { TRenderFunction } from '../accordion';
import { useAccordion } from '../context';

export interface IPropsClickable extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
	children: ReactNode | TRenderFunction;
}

export function Clickable(props: IPropsClickable): JSX.Element {
	const { children, onClick, ...htmlProps } = props;
	const { open, toggleAccordion } = useAccordion();

	const onClickableClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
		toggleAccordion();
		onClick && onClick(e);
	};

	return (
		<button {...htmlProps} onClick={onClickableClick}>
			{typeof children === 'function' ? children(open) : children}
		</button>
	);
}
