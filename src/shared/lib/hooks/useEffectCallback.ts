/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useLayoutEffect, useRef } from 'react';

export function useEffectCallback<T extends (...args: any[]) => any>(callback?: T): (...args: Parameters<T>) => any {
	const ref = useRef(callback);

	useLayoutEffect(() => {
		ref.current = callback;
	});

	return useCallback((...args: Parameters<T>) => {
		return ref.current?.(...args);
	}, []);
}
