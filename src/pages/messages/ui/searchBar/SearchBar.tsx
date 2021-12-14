import { useRef, useState } from 'react';
import { observer } from 'mobx-react';

import { messagePagestore } from 'pages/messages/model/store';
import { useGrabFocus } from 'shared/lib';
import { EmptyBtn, EscSvg, TransparentInput } from 'shared/ui';
import { BackArrowSvg } from 'shared/ui/icons/BackArrow';

import styles from './SearchBar.module.scss';

export const SearchBar = observer(() => {
	const [inputValue, setInputValue] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);

	useGrabFocus(inputRef);

	const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => setInputValue(e.target.value);

	const onBackArrowClick = () => messagePagestore.setShowSearchHeader(false);
	const onEscArrowClick = () => setInputValue('');

	return (
		<>
			<EmptyBtn>
				<BackArrowSvg className={styles.svgIcon} onClick={onBackArrowClick} />
			</EmptyBtn>
			<TransparentInput
				className={styles.input}
				placeholder="Search message"
				value={inputValue}
				onChange={onInputChange}
				refProp={inputRef}
			/>
			<EmptyBtn>
				<EscSvg className={styles.svgIcon} onClick={onEscArrowClick} />
			</EmptyBtn>
		</>
	);
});
