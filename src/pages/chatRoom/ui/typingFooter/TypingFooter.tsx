import { useFormik } from 'formik';

import { EmptyBtn, KeyboardSvg, PaperPlaneSvg, TransparentInput } from 'shared/ui';

import styles from './TypingFooter.module.scss';

export function TypingFooter() {
	const formik = useFormik({
		initialValues: {
			msgInput: '',
		},
		onSubmit: async ({ msgInput }, helpers) => {
			helpers.setFieldValue('msgInput', '');
		},
	});

	return (
		<footer className={styles.typingFooter}>
			<form onSubmit={formik.handleSubmit}>
				<label>
					<TransparentInput
						name="msgInput"
						value={formik.values.msgInput}
						onChange={formik.handleChange}
						className={styles.input}
						placeholder="Start typing"
					/>
				</label>
				{formik.values.msgInput ? (
					<EmptyBtn type="submit" className={styles.submitBtn}>
						<PaperPlaneSvg className={styles.paperPlaneSvg} />
					</EmptyBtn>
				) : (
					<KeyboardSvg className={styles.keyboardSvg} />
				)}
			</form>
		</footer>
	);
}
