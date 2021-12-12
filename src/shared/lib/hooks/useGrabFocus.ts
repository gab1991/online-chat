import React, { useEffect } from 'react';

export function useGrabFocus(ref: React.MutableRefObject<HTMLElement | null>, condition: boolean) {
	useEffect(() => {
		if (ref.current && condition) {
			ref.current.focus();
		}
	}, [ref, condition]);
}
