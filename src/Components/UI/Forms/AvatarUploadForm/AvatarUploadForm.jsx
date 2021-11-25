import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import AvatarEditor from 'react-avatar-editor';
import { updateProfile } from '../../../../Store/Actions/actions';
import Backend from '../../../../Backend/Backend';
import Button from '../../Buttons/Button/Button';
import ExclamationSvg from '../../SvgIcons/Exclamation';
import styles from './AvatarUploadForm.module.scss';
import btnStyles from '../../../UI/Buttons/Button/Button.module.scss';

FileUploadForm.prototypes = {
	loggedUser: PropTypes.object.isRequired,
	hideForm: PropTypes.func.isRequired,
};

function FileUploadForm(props) {
	const { loggedUser, hideForm } = props;
	const [file, setFile] = useState();
	const dispatch = useDispatch();
	const avatarRef = useRef();
	const avatarCanvasSide = 150;

	const submitHandler = async (e) => {
		e.preventDefault();

		//get the cropped img
		const canvasScaled = avatarRef.current.getImageScaledToCanvas();

		const uploadHandler = async (formDataObj) => {
			const { data: { avatar_path } = { avatar_path: null } } = await Backend.uploadAvatar(formDataObj);

			hideForm();
			if (avatar_path) {
				dispatch(updateProfile({ avatar_path }));
			}
		};

		canvasScaled.toBlob((blob) => {
			const file = new File([blob], 'avatar.jpeg');

			//sending formdata to server
			const formData = new FormData();
			formData.append('username', loggedUser.username);
			formData.append('avatar', file);

			uploadHandler(formData);
		}, 'image/jpeg');
	};

	const onChangeHandler = (e) => {
		const file = e.target.files[0];
		setFile(file);
	};

	return (
		<div className={styles.AvatarUploadForm}>
			{!file && (
				<div className={styles.SvgExclamationContainer}>
					<ExclamationSvg style={{ width: avatarCanvasSide, height: avatarCanvasSide }} />
					<h3>No file chosen yet</h3>
				</div>
			)}
			{file && (
				<>
					<AvatarEditor
						ref={avatarRef}
						image={file}
						width={avatarCanvasSide}
						crossOrigin={'anonymous'}
						height={avatarCanvasSide}
						border={0}
						borderRadius={avatarCanvasSide / 2}
						color={[0, 0, 0, 0.5]}
						scale={1.2}
						rotate={0}
					/>
					<h3>DRAG TO MOVE</h3>
				</>
			)}

			<form onSubmit={submitHandler} className={styles.FileInputForm}>
				<input id="file" type="file" name="avatar" onChange={onChangeHandler} />
				<label htmlFor="file" className={btnStyles.Button}>
					Pick a file
				</label>
				<Button type="submit" txtContent={'Upload'} disabled={file ? false : true} />
			</form>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		loggedUser: state.logged,
	};
}

export default connect(mapStateToProps)(FileUploadForm);
