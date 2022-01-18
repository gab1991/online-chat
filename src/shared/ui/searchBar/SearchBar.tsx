import { useRef } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import { CircularSpinner } from '../spinners';
import { useGrabFocus } from 'shared/lib';
import { EmptyBtn, EscSvg, TransparentInput } from 'shared/ui';
import { BackArrowSvg } from 'shared/ui/icons/BackArrow';

import styles from './SearchBar.module.scss';

interface ISearchBarProps {
	onBackArrowClick: () => void;
	onValueChange: (value: string) => void;
	placeholder?: string;
	showSpinner?: boolean;
	value: string;
}

export function SearchBar(props: ISearchBarProps): JSX.Element {
	const { onBackArrowClick, placeholder, value, onValueChange, showSpinner } = props;
	const inputRef = useRef<HTMLInputElement>(null);

	useGrabFocus(inputRef);

	const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
		onValueChange && onValueChange(e.target.value);

	const onEscArrowClick = (): void => onValueChange && onValueChange('');

	return (
		<div className={styles.searchBar}>
			<EmptyBtn>
				<BackArrowSvg className={styles.svgIcon} onClick={onBackArrowClick} />
			</EmptyBtn>
			<TransparentInput
				className={styles.input}
				placeholder={placeholder}
				value={value}
				onChange={onInputChange}
				refProp={inputRef}
			/>
			<EmptyBtn>
				<SwitchTransition>
					<CSSTransition
						key={showSpinner ? 'spinner' : 'esc'}
						addEndListener={(node, done): void => {
							node.addEventListener('transitionend', done, false);
						}}
						classNames={{ ...styles }}>
						{showSpinner ? (
							<CircularSpinner className={styles.svgIcon} />
						) : (
							<EscSvg className={styles.svgIcon} onClick={onEscArrowClick} />
						)}
					</CSSTransition>
				</SwitchTransition>
			</EmptyBtn>
		</div>
	);
}
