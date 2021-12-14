import { observer } from 'mobx-react';

import { messagePagestore } from 'pages/messages/model/store';
import { EmptyBtn, HamburgerSvg, LookUpSvg } from 'shared/ui';

import styles from './HanburgerBar.module.scss';

export const HamburgerBar = observer(() => {
	const onHamburgerClick = () => messagePagestore.setShowMenu(true);
	const onLookUpClick = () => messagePagestore.setShowSearchHeader(true);

	return (
		<>
			<EmptyBtn onClick={onHamburgerClick}>
				<HamburgerSvg className={styles.svgIcon} />
			</EmptyBtn>
			<h3 className={styles.heading}>Messages</h3>
			<EmptyBtn className={styles.rightBtn}>
				<LookUpSvg className={styles.svgIcon} onClick={onLookUpClick} />
			</EmptyBtn>
		</>
	);
});
