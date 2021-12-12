import React, { useEffect, useRef, useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import Backend from '../../Backend/Backend';
import Avatar from '../../shared/ui/avatar/Avatar';
// import { updateProfile } from '../../Store/Actions/actions';
import validate from '../../Validation/Validation';
import Button from '../UI/Buttons/Button/Button';
import AvatarUploadForm from '../UI/Forms/AvatarUploadForm/AvatarUploadForm';
import Input from '../UI/Inputs/Input/Input';
import CircularSpinner from '../UI/SvgSpinners/Circular';

import styles from './UserSettings.module.scss';

function UserSettings(props) {
	const { avatar_path, username, displayed_name } = props.profile;
	const dispatch = useDispatch();
	const [showUploadForm, setShowUploadForm] = useState(false);
	const [showDispNameChanger, setShowDispNameChanger] = useState(false);
	const [disNameInputValue, setDispNameInputValue] = useState('');
	const [isSendingDispName, setIsSendingDispName] = useState(false);
	const [wrongInput, setWrongInput] = useState({
		message: '',
		status: false,
	});
	const inputRef = useRef();

	useEffect(() => {
		if (showDispNameChanger) {
			inputRef.current.focus();
		}
	}, [showDispNameChanger]);

	const toggleUploadFormVisibility = () => {
		setShowUploadForm((prev) => !prev);
	};

	const toggleDispNameChanger = () => {
		setShowDispNameChanger((prev) => !prev);
	};

	const confirmDispName = (dispName) => {
		if (!dispName.length) {
			return setWrongInput({
				message: 'you didn`t write anything',
				status: true,
			});
		}

		const isValid = validate('displayed_name', dispName);
		if (!isValid) {
			return setWrongInput({
				message: 'trailing whitespaces not allowed',
				status: true,
			});
		}

		setIsSendingDispName(true);

		Backend.updateDispName(dispName)
			.then((res) => {
				// dispatch(updateProfile({ displayed_name: dispName }));
				toggleDispNameChanger();
				setIsSendingDispName(false);
			})
			.catch((err) => {
				setWrongInput({ message: 'something went wrong', status: true });
				setIsSendingDispName(false);
			});
	};

	const disNameInputHandler = (e) => {
		setDispNameInputValue(e.target.value);
		setWrongInput({ message: '', status: false });
	};

	const goBackHandler = () => {
		props.history.goBack();
	};

	return (
		<div className={styles.UserSettings}>
			<div className={styles.UserNameSection}>
				<p>{`account name : @${username}`}</p>
			</div>
			<div className={styles.AvatarSection}>
				{!showUploadForm && <Avatar text={'bam'} size={150} imgSrc={avatar_path} />}
				{showUploadForm && (
					<AvatarUploadForm
						hideForm={() => {
							setShowUploadForm(false);
						}}
					/>
				)}
				<Button
					className={styles.AvatarChangeBtn}
					onClick={toggleUploadFormVisibility}
					txtContent={showUploadForm ? 'Hide' : 'Change Avatar'}
				/>
			</div>
			<div className={styles.ChangeDispNameSection}>
				{showDispNameChanger && (
					<>
						{isSendingDispName && (
							<div className={styles.DispNameSpinnerWrapper}>
								<CircularSpinner />
							</div>
						)}
						{!isSendingDispName && (
							<Input
								inputRef={inputRef}
								type="text"
								placeholder="Type your new name"
								className={styles.DispNameInput}
								onChange={disNameInputHandler}
								inValid={wrongInput.status}
								inValidMessage={wrongInput.message}
								keyPressCallBack={['Enter', () => confirmDispName(disNameInputValue)]}
							/>
						)}

						<div className={styles.BtnSection}>
							<Button txtContent={'Confirm'} onClick={() => confirmDispName(disNameInputValue)} />
							<Button txtContent={'Cancel'} onClick={toggleDispNameChanger} />
						</div>
					</>
				)}
				{!showDispNameChanger && (
					<>
						<span>{displayed_name}</span>
						<Button
							txtContent={'Change displayed name'}
							onClick={toggleDispNameChanger}
							className={styles.ChangeDispNameBtn}
						/>
					</>
				)}
			</div>
			<Button className={styles.GoBackBtn} txtContent={'Go Back'} onClick={goBackHandler} />
		</div>
	);
}

function mapStateToProps(state) {
	return {
		profile: state.profile,
		user: state.logged,
	};
}

export default connect(mapStateToProps)(UserSettings);

UserSettings.Protypes = {
	profile: PropTypes.object,
	user: PropTypes.object,
};
