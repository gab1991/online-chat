/* eslint-disable compat/compat */
import { useEffect, useState } from 'react';

interface IUseIntersectionObserverProps {
	options?: Omit<IntersectionObserverInit, 'root'>;
	parentRef?: React.MutableRefObject<HTMLElement | null>;
	ref: React.MutableRefObject<HTMLElement | null>;
}

export function useIntersectionObserver(props: IUseIntersectionObserverProps): { isVisible: boolean } {
	const { ref, options, parentRef } = props;

	const [isVisible, setisVisible] = useState(false);

	useEffect(() => {
		const cleanUpRef = ref.current;

		const innterSectionObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					setisVisible(entry.isIntersecting);
				});
			},
			{ root: parentRef?.current, threshold: 0.5, ...options },
		);

		ref.current && innterSectionObserver.observe(ref.current);

		return (): void => {
			cleanUpRef && innterSectionObserver.unobserve(cleanUpRef);
		};
	}, [parentRef, ref, options]);

	return { isVisible };
}
