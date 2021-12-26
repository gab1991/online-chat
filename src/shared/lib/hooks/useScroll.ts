import React, { useCallback } from 'react';

interface IUseScroll {
	scrollToBottom: (behavior?: ScrollBehavior) => void;
}

export function useScroll(ref: React.MutableRefObject<HTMLElement | null>): IUseScroll {
	const scrollToBottom = useCallback(
		(behavior: ScrollBehavior = 'auto'): void => {
			if (ref.current) {
				const height = ref.current.scrollHeight;

				ref.current.scroll({ behavior, top: height });
			}
		},
		[ref],
	);

	return { scrollToBottom };
}
