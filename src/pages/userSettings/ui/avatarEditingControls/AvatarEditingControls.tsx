import { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';

import { profileStore } from 'shared/model/store';

import styles from './AvatarEditingControls.module.scss';

export function AvatarEditingControls(): JSX.Element {
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
		<form onSubmit={submitHandler}>
			<input id="file" type="file" name="avatar" onChange={onChangeHandler} />
			<label htmlFor="file">Pick a file</label>
			<button type="submit">Upload</button>
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
		</form>
	);
}
