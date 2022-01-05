import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react';

import { AvatarEditingControls } from './ui/avatarEditingControls';
import { profileStore } from 'shared/model/store';
import { Avatar, EmptyBtn, TransparentInput } from 'shared/ui';

import { EditAccordion } from './ui';

import styles from './UserSettingsPage.module.scss';

export const UserSettingsPage = observer(() => {
	const { displayedName, avatarUrl } = profileStore.profile;
	const [editedDispName, setEditedDispName] = useState(displayedName);

	const onDispNameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		setEditedDispName(e.target.value);
	};

	const showSaveBtn = displayedName !== editedDispName;

	const onSaveBtnClick = (): void => {
		profileStore.updateDispname(editedDispName);
	};

	return (
		<div className={styles.userSettingsPage}>
			<section className={styles.avatarSection}>
				<nav className={styles.nav}>
					<div className={styles.cancelContainer}>
						<NavLink to="/" className={styles.cancel}>
							Back
						</NavLink>
					</div>
					<h2 className={styles.editProfile}>Edit Profile</h2>
					{showSaveBtn && (
						<EmptyBtn className={styles.saveBtn} onClick={onSaveBtnClick}>
							Save
						</EmptyBtn>
					)}
				</nav>
				<Avatar text={displayedName} imgSrc={avatarUrl} className={styles.avatar} />
			</section>
			<section className={styles.settings}>
				<ul>
					<li>
						<EditAccordion>
							{(open): JSX.Element => (
								<>
									<EditAccordion.Clickable isOpen={open}>Edit Avatar</EditAccordion.Clickable>
									<EditAccordion.Foldable>
										<AvatarEditingControls />
									</EditAccordion.Foldable>
								</>
							)}
						</EditAccordion>
					</li>
					<li>
						<EditAccordion>
							{(open): JSX.Element => (
								<>
									<EditAccordion.Clickable isOpen={open}>Edit Displayed Name</EditAccordion.Clickable>
									<EditAccordion.Foldable>
										<TransparentInput value={editedDispName} className={styles.nameInput} onChange={onDispNameChange} />
									</EditAccordion.Foldable>
								</>
							)}
						</EditAccordion>
					</li>
				</ul>
			</section>
		</div>
	);
});
