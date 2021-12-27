import { useRef } from 'react';

import { useGrabFocus } from 'shared/lib';
import { EmptyBtn, EscSvg, TransparentInput } from 'shared/ui';
import { BackArrowSvg } from 'shared/ui/icons/BackArrow';

import styles from './SearchBar.module.scss';

interface ISearchBarProps {
	onBackArrowClick: () => void;
	onValueChange: (value: string) => void;
	placeholder?: string;
	value: string;
}

export function SearchBar(props: ISearchBarProps): JSX.Element {
	const { onBackArrowClick, placeholder, value, onValueChange } = props;
	const inputRef = useRef<HTMLInputElement>(null);

	useGrabFocus(inputRef);

	const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
		onValueChange && onValueChange(e.target.value);

	const onEscArrowClick = (): void => onValueChange && onValueChange('');

	return (
		<>
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
				<EscSvg className={styles.svgIcon} onClick={onEscArrowClick} />
			</EmptyBtn>
		</>
	);
}
