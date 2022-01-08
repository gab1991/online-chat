import React, { HTMLAttributes, ReactNode, useState } from 'react';

import { Clickable, Foldable } from './components';
import { AccordionContext, useAccordion } from './context';

export interface IPropsAccordion extends IPropsAccordionInner {
	onToggle?: (newValue: boolean) => void;
	open?: boolean;
}
export function Accordion(props: IPropsAccordion): JSX.Element {
	const { children, onToggle, ...htmlProps } = props;
	const [open, setOpen] = useState(!!props.open);

	const toggleAccordion = (): void => {
		onToggle && onToggle(!open);
		setOpen(!open);
	};

	return (
		<AccordionContext.Provider value={{ open, toggleAccordion }}>
			<AccordionInner {...htmlProps}>{children}</AccordionInner>
		</AccordionContext.Provider>
	);
}

interface IPropsAccordionInner extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode | TRenderFunction;
}

export type TRenderFunction = (open: boolean) => React.ReactNode;

function AccordionInner(props: IPropsAccordionInner): JSX.Element {
	const { children, ...htmlProps } = props;
	const { open } = useAccordion();

	return <div {...htmlProps}>{typeof children === 'function' ? children(open) : children}</div>;
}

Accordion.Clickable = Clickable;
Accordion.Foldable = Foldable;
