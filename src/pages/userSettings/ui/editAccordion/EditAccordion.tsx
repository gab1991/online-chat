import cn from 'classnames';

import { Accordion, ArrowSvg, IPropsAccordion, IPropsClickable, IPropsFoldable } from 'shared/ui';

import styles from './EditAccordion.module.scss';

export function EditAccordion(props: IPropsAccordion): JSX.Element {
	const { className, ...htmlProps } = props;
	return <Accordion className={cn(styles.accordion, className)} {...htmlProps} />;
}

interface IEditAccordionClicable extends IPropsClickable {
	isOpen?: boolean;
}

function EditAccordionClickable(props: IEditAccordionClicable): JSX.Element {
	const { className, children, isOpen, ...htmlProps } = props;

	return (
		<Accordion.Clickable className={cn(styles.clickable, className)} {...htmlProps}>
			<span>{children}</span>
			<ArrowSvg className={cn(styles.arrowsvg, { [styles.arrowsvg_open]: isOpen })} />
		</Accordion.Clickable>
	);
}

function EditAccordionFoldable(props: IPropsFoldable): JSX.Element {
	return <Accordion.Foldable {...props} />;
}

EditAccordion.Clickable = EditAccordionClickable;
EditAccordion.Foldable = EditAccordionFoldable;
