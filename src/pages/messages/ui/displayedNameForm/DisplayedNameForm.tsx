import { HTMLAttributes, useRef, useState } from 'react';
import cn from 'classnames';
import { useFormik } from 'formik';
import { observer } from 'mobx-react';

import { DispNameValidationSchema } from 'pages/messages/model/validation';
import { api } from 'shared/api';
import { useClickOutside, useGrabFocus } from 'shared/lib';
import { profileStore } from 'shared/model/store';
import { CircularSpinner, ConfirmCheckSvg, EmptyBtn, PencilSvg, TransparentInput } from 'shared/ui';

import styles from './DisplayedNameForm.module.scss';

export const DisplayedNameForm = observer((props: HTMLAttributes<HTMLFormElement>) => {
	const { className, onSubmit } = props;
	const { displayedName, id } = profileStore.profile;

	const inputRef = useRef<HTMLInputElement>(null);
	const formRef = useRef<HTMLFormElement>(null);

	const [showNameInput, setShowNameInput] = useState(false);
	const [isSending, setIsSending] = useState(false);

	useClickOutside(formRef, () => setShowNameInput(false));
	useGrabFocus(inputRef, showNameInput);

	const toggleInputVisibility = () => setShowNameInput((prev) => !prev);

	const formik = useFormik({
		initialValues: {
			displayedName,
		},
		onSubmit: async ({ displayedName }, helpers) => {
			if (!id) {
				return;
			}

			setIsSending(true);
			const { data: profile, error } = await api.profileApiService.updateDisplayedName(id, displayedName);
			setIsSending(false);

			error && helpers.setErrors({ displayedName: error });

			if (profile) {
				setShowNameInput(false);
				profileStore.fillProfile(profile);
			}
		},
		validationSchema: DispNameValidationSchema,
	});

	const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
		formik.handleSubmit(e);
		onSubmit && onSubmit(e);
	};

	return (
		<form className={cn(styles.dispNameForm, className)} onSubmit={submitHandler} ref={formRef}>
			{showNameInput ? (
				<>
					<TransparentInput
						className={styles.dispNameInput}
						type="text"
						placeholder="Enter your name"
						refProp={inputRef}
						name="displayedName"
						value={formik.values.displayedName}
						onChange={formik.handleChange}
					/>
					{formik.errors.displayedName && <p className={styles.validationError}>{formik.errors.displayedName}</p>}
					{isSending ? (
						<CircularSpinner className={styles.dispNameSpinner} />
					) : (
						<EmptyBtn className={styles.dispNameBtn} type="submit">
							<ConfirmCheckSvg className={styles.formSvg} />
						</EmptyBtn>
					)}
				</>
			) : (
				<>
					<h3 className={styles.dispName}>{displayedName}</h3>
					<EmptyBtn className={styles.dispNameBtn} onClick={toggleInputVisibility}>
						<PencilSvg className={styles.formSvg} />
					</EmptyBtn>
				</>
			)}
		</form>
	);
});
