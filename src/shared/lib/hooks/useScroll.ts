import React, { useCallback } from 'react';

export function useScroll(ref: React.MutableRefObject<HTMLElement | null>) {
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
