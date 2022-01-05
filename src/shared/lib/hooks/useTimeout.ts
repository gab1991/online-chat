import { useCallback, useRef } from 'react';

interface IUseTimeoutReturn {
	clearTimeout: (callback?: () => void) => void;
	setTimeout: (callback: () => void, time: number) => void;
}

export function useTimeout(): IUseTimeoutReturn {
	const timerRef = useRef(0);

	const setTimeout = useCallback((callback: () => void, time: number) => {
		timerRef.current = window.setTimeout(callback, time);
	}, []);

	const clearTimeout = useCallback((callback?: () => void) => {
		window.clearTimeout(timerRef.current);
		callback && callback();
	}, []);

	return { clearTimeout, setTimeout };
}
