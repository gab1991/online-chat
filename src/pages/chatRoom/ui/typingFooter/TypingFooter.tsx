import { HTMLAttributes } from 'react';
import { useFormik } from 'formik';

import { eventEmmiter } from 'shared/api/eventEmmiter.service';
import { EmptyBtn, KeyboardSvg, PaperPlaneSvg, TransparentInput } from 'shared/ui';

import styles from './TypingFooter.module.scss';

interface ITypingFooterProps extends HTMLAttributes<HTMLElement> {
	chatId: number;
	onMsgSubmit?: () => void;
	profileId: number;
}

export function TypingFooter(props: ITypingFooterProps): JSX.Element {
	const { chatId, profileId, onMsgSubmit, ...htmlprops } = props;

	const formik = useFormik({
		initialValues: {
			msgInput: '',
		},
		onSubmit: async ({ msgInput }, helpers) => {
			eventEmmiter.sendMsg({ chatId, message: msgInput, senderId: profileId });
			helpers.setFieldValue('msgInput', '');

			onMsgSubmit && onMsgSubmit();
		},
	});

	return (
		<footer className={styles.typingFooter} {...htmlprops}>
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
