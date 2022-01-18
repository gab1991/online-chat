import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import { observer } from 'mobx-react';

import { SettingsFormSchema } from './model/validation';
import { AvatarEditingControls } from './ui/avatarEditingControls';
import { profileStore } from 'shared/model/store';
import { Avatar, EmptyBtn, TransparentInput } from 'shared/ui';

import { EditAccordion } from './ui';

import styles from './UserSettingsPage.module.scss';

export const UserSettingsPage = observer(() => {
	const { displayedName, avatarUrl } = profileStore.profile;

	const formik = useFormik({
		initialValues: {
			displayedNameInput: displayedName,
		},
		onSubmit: async ({ displayedNameInput }) => {
			profileStore.updateDispname(displayedNameInput);
		},
		validateOnChange: true,
		validationSchema: SettingsFormSchema,
	});

	const showSaveBtn = displayedName !== formik.values.displayedNameInput;

	const onSaveBtnClick = (): Promise<void> => formik.submitForm();

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
				<h2 className={styles.displayedName}>{displayedName}</h2>
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
										<form onSubmit={formik.handleSubmit} className={styles.form}>
											<TransparentInput
												name="displayedNameInput"
												className={styles.nameInput}
												onChange={formik.handleChange}
												value={formik.values.displayedNameInput}
											/>
											{formik.errors.displayedNameInput && (
												<p className={styles.validationError}>{formik.errors.displayedNameInput}</p>
											)}
										</form>
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
