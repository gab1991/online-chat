import { useEffect, useState } from 'react';

interface IUseTraverseFoundMsgs {
	selectNext: () => void;
	selectPrev: () => void;
	selected: number;
	stats: {
		current: number;
		total: number;
	};
}

export function useTraverseFoundMsgs(ids: number[]): IUseTraverseFoundMsgs {
	const lastElm: number | undefined = ids[ids.length - 1];

	const [selected, setSelected] = useState<number>(lastElm || 0);

	const scrollSelected = (id: number): void => {
		const elm = document.querySelector(`#msg_${id}`);

		elm && elm.scrollIntoView({ behavior: 'smooth', block: 'center' });
	};

	useEffect(() => {
		selected && scrollSelected(selected);
	}, [selected]);

	const select = (direction: 'next' | 'prev'): void => {
		const currentIndex = ids.indexOf(selected);
		const desired = direction === 'prev' ? ids[currentIndex - 1] : ids[currentIndex + 1];

		if (currentIndex < 0 || !desired) {
			return;
		}

		setSelected(desired);
	};

	const selectPrev = (): void => select('prev');

	const selectNext = (): void => select('next');

	const stats = {
		current: ids.indexOf(selected) + 1,
		total: ids.length,
	};

	return { selectNext, selectPrev, selected, stats };
}
