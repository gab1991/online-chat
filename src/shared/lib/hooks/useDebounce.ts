import { useEffect, useState } from 'react';

type CallBack = (...args: any[]) => void;

export function useDebounce(cb: CallBack, wait?: number): CallBack {
	const [timer, setTimer] = useState<null | number>(null);

	useEffect(() => {
		return (): void => {
			timer && window.clearTimeout(timer);
		};
	}, [timer]);

	return (...args): void => {
		if (timer) {
			window.clearTimeout(timer);
		}
		const newTimer = window.setTimeout(() => {
			setTimer(null);
			cb(...args);
		}, wait);

		setTimer(newTimer);
	};
}
