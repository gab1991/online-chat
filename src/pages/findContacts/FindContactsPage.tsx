import { observer } from 'mobx-react';

import { FindContactsHeader, ProfileList } from './ui';

import styles from './FindContacstPage.module.scss';

export const FindContactsPage = observer(() => {
	return (
		<div className={styles.findContactsPage}>
			<FindContactsHeader />
			<ProfileList className={styles.profileList} />
		</div>
	);
});
