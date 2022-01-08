import { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { observer } from 'mobx-react';

import { profileStore } from 'shared/model/store';
import { GradientButton } from 'shared/ui';

import styles from './AvatarEditingControls.module.scss';

export const AvatarEditingControls = observer((): JSX.Element => {
	const avatarRef = useRef<AvatarEditor>(null);
	const avatarCanvasSide = 150;
	const [file, setFile] = useState<File>();

	const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
		if (!avatarRef.current) {
			return;
		}
		//get the cropped img
		const canvasScaled = avatarRef.current.getImageScaledToCanvas();

		canvasScaled.toBlob((blob) => {
			if (!blob || !profileStore.profile.id) {
				return;
			}
			const file = new File([blob], 'avatar.jpeg', { type: blob.type });
			const formData = new FormData();
			formData.append('file', file);

			profileStore.uploadAvatar(formData);
		}, 'image/jpeg');
	};

	const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const file = e.target.files?.[0];
		setFile(file);
	};

	return (
		<div className={styles.avatarEditingControls}>
			<AvatarEditor
				ref={avatarRef}
				image={file || ''}
				width={avatarCanvasSide}
				crossOrigin={'anonymous'}
				height={avatarCanvasSide}
				border={0}
				borderRadius={avatarCanvasSide / 2}
				// eslint-disable-next-line @typescript-eslint/no-magic-numbers
				color={[0, 0, 0, 0.5]}
				scale={1.2}
				rotate={0}
			/>
			<form onSubmit={submitHandler} className={styles.form}>
				<GradientButton light className={styles.btn} type="button">
					<label>
						<input type="file" onChange={onChangeHandler} />
					</label>
					Pick a file
				</GradientButton>

				<GradientButton light type="submit" className={styles.btn} disabled={!file}>
					Upload
				</GradientButton>
			</form>
		</div>
	);
});
