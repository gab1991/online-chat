import React, { useCallback } from 'react';

interface IUseScroll {
	hasScroll: boolean;
	scrollToBottom: (behavior?: ScrollBehavior) => void;
}

export function useScroll(ref: React.MutableRefObject<HTMLElement | null>): IUseScroll {
	const hasScroll = !!ref.current && ref.current.scrollHeight > ref.current.clientHeight;

	const scrollToBottom = useCallback(
		(behavior: ScrollBehavior = 'auto'): void => {
			if (ref.current) {
				const height = ref.current.scrollHeight;

				ref.current.scroll({ behavior, top: height });
			}
		},
		[ref],
	);

	return { hasScroll, scrollToBottom };
}
