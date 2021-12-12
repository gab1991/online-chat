import { useEffect, useLayoutEffect, useRef } from 'react';

export function useClickOutside(ref: React.MutableRefObject<HTMLElement | null>, handler: (e: Event) => void) {
	const handlerRef = useRef(handler);

	useLayoutEffect(() => {
		handlerRef.current = handler;
	});

	useEffect(() => {
		const listener = (event: Event) => {
			// Do nothing if clicking ref's element or descendent elements
			if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
				return;
			}
			handlerRef.current(event);
		};

		document.addEventListener('mousedown', listener);
		document.addEventListener('touchstart', listener);

		return () => {
			document.removeEventListener('mousedown', listener);
			document.removeEventListener('touchstart', listener);
		};
	}, [ref]);
}
