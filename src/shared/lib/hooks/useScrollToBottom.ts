import React, { useLayoutEffect } from 'react';

export function useScrollToBottom(ref: React.MutableRefObject<HTMLElement | null>, deps: unknown[]) {
	useLayoutEffect(() => {
		if (ref.current) {
			const height = ref.current.scrollHeight;

			ref.current.scroll({ behavior: 'auto', top: height });
		}
	}, [deps, ref]);
}
