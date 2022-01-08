import { createContext, useContext } from 'react';

interface IAccordionContext {
	open: boolean;
	toggleAccordion: () => void;
}

export const AccordionContext = createContext<null | IAccordionContext>(null);

export function useAccordion(): IAccordionContext {
	const ctx = useContext(AccordionContext);

	if (!ctx) {
		throw new Error('this hook should be used in AccordionContext');
	}
	return ctx;
}
