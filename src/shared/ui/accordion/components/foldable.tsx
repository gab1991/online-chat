import { ReactNode } from 'react';

import { useAccordion } from '../context';

export interface IPropsFoldable {
	children?: ReactNode;
}

export function Foldable({ children }: IPropsFoldable): JSX.Element | null {
	const { open } = useAccordion();
	return open ? <>{children}</> : null;
}
