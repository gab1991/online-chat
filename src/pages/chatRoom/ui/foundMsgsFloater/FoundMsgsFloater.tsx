import { HTMLAttributes } from 'react';
import cn from 'classnames';

import { ArrowSvg, EmptyBtn, GradientBlock } from 'shared/ui';

import styles from './FoundMsgsFloater.module.scss';

interface IFoundMsgsFloaterProps extends HTMLAttributes<HTMLDivElement> {
	onLeftArrowClick: () => void;
	onRightArrowClick: () => void;
}

export function FoundMsgsFloater(props: IFoundMsgsFloaterProps): JSX.Element {
	const { onLeftArrowClick, onRightArrowClick, children, ...htmlProps } = props;

	return (
		<GradientBlock {...htmlProps}>
			<EmptyBtn className={styles.arrowBtn} onClick={onLeftArrowClick}>
				<ArrowSvg className={cn(styles.arrowSvg, styles.arrowSvg_reverted)} />
			</EmptyBtn>
			{children}
			<EmptyBtn className={styles.arrowBtn} onClick={onRightArrowClick}>
				<ArrowSvg className={styles.arrowSvg} />
			</EmptyBtn>
		</GradientBlock>
	);
}
