/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

import { useEffectCallback } from '.';

type CallBack = (...args: any[]) => any;

export function useDebounce<T extends CallBack>(cb: T, wait?: number): T {
	const [timer, setTimer] = useState<null | number>(null);

	useEffect(() => {
		return (): void => {
			timer && window.clearTimeout(timer);
		};
	}, [timer]);

	//@ts-ignore
	return useEffectCallback((...args: Parameters<T>): ReturnType<T> => {
		if (timer) {
			window.clearTimeout(timer);
		}
		const newTimer = window.setTimeout(() => {
			setTimer(null);
			cb(...args);
		}, wait);

		setTimer(newTimer);
	});
}
