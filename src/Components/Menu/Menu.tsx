import { useEffect, useRef, useState } from 'react';

// import { connect, useDispatch } from 'react-redux';
// import { logOut, updateProfile } from '../../Store/Actions/actions';
// import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Backend from '../../Backend/Backend';
// import validate from '../../Validation/Validation';
import Avatar from '../UI/Avatar/Avatar';
import { Input } from '../UI/Inputs/Input/Input';
import CogSvg from '../UI/SvgIcons/Cog';
import ExitSvg from '../UI/SvgIcons/Exit';
import PencilSvg from '../UI/SvgIcons/Pencil';
import CircularSpinner from '../UI/SvgSpinners/Circular';
import { authApiService } from 'shared/api';
import { profileStore } from 'shared/model/store';
import { ConfirmCheckSvg, HumanSvg } from 'shared/ui';

import styles from './Menu.module.scss';

export function Menu(props: any) {
	const { username, avatar_path, className, displayed_name, isShowed } = props;
	// const dispatch = useDispatch();
	const [inputValue, setInputValue] = useState('');
	const inputRef = useRef(null);
	const [showNameInput, setShowNameInput] = useState(false);
	const [isSendingDispName, setIsSendingDispName] = useState(false);

	const [wrongInput, setWrongInput] = useState({
		invalidMsg: '',
		state: false,
	});
	useEffect(() => {
		if (!isShowed) {
			setShowNameInput(false);
		}
	}, [isShowed]);

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-magic-numbers
		if (inputValue && inputValue.length > 19) {
			setWrongInput({ invalidMsg: 'Too long name', state: true });
		} else {
			setWrongInput({ invalidMsg: '', state: false });
		}
	}, [inputValue]);

	useEffect(() => {
		if (inputRef.current) {
			(inputRef.current as any).focus();
		}
	}, [showNameInput]);

	const sendLogOut = () => {
		profileStore.clearProfile();
		authApiService.logout();
	};

	const toContacts = () => {
		props.history.push('/findContact');
	};

	const toSettings = () => {
		props.history.push('/userSettings');
	};

	const toggleInputVisibility = () => {
		setShowNameInput((prev) => !prev);
	};

	const changeDisplayedName = async (dispName) => {
		if (!dispName) {
			setWrongInput({ invalidMsg: 'Write at least 1 char', state: true });
			return;
		}

		// const isValid = validate('displayed_name', dispName);
		// const isValid = validate('displayed_name', dispName);
		// if (!isValid) {
		// 	return setWrongInput({
		// 		invalidMsg: 'trailing whitespaces not allowed',
		// 		state: true,
		// 	});
		// }

		setIsSendingDispName(true);

		const { status = null } = await Backend.updateDispName(dispName, () => {
			setWrongInput({ invalidMsg: 'something went wrong', state: true });
			setIsSendingDispName(false);
		});

		if (status === 200) {
			// dispatch(updateProfile({ displayed_name: dispName }));
			setShowNameInput(false);
			setIsSendingDispName(false);
		}
	};

	const hideInput = (e) => {
		if (e.target === e.currentTarget) {
			setShowNameInput(false);
		}
	};

	return (
		<div className={`${styles.Menu} ${className}`} onClick={hideInput}>
			<div className={styles.NameSection}>
				{showNameInput ? (
					<Input
						className={styles.DispNameInput}
						type={'text'}
						onChange={(e) => {
							setInputValue(e.target.value);
						}}
						placeholder={'Enter your name'}
						keyPressCallBack={['Enter', () => changeDisplayedName(inputValue)]}
						inValid={wrongInput.state}
						inValidMessage={wrongInput.invalidMsg}
						inputRef={inputRef}
					/>
				) : (
					<h3>{displayed_name || username}</h3>
				)}
			</div>
			<div className={styles.PencilTickSvgContainer}>
				{showNameInput && !isSendingDispName && (
					<div className={styles.ConfirmTickWrapper} onClick={() => changeDisplayedName(inputValue)}>
						<ConfirmCheckSvg />
					</div>
				)}
				{showNameInput && isSendingDispName && (
					<div className={styles.PencilWrapper}>
						<CircularSpinner />
					</div>
				)}
				{!showNameInput && (
					<div className={styles.PencilWrapper} onClick={toggleInputVisibility}>
						<PencilSvg />
					</div>
				)}
			</div>
			{username && <Avatar text={username} imgSrc={avatar_path} size={170} className={styles.Avatar} />}
			<ul className={styles.OptionsSection}>
				<li onClick={toContacts}>
					<div className={styles.HumanSvgContainer}>
						<HumanSvg />
					</div>
					<h4>Contacts</h4>
				</li>
				<li onClick={toSettings}>
					<div className={styles.CogSvgContainer}>
						<CogSvg />
					</div>
					<h4>Settings</h4>
				</li>
				<li onClick={sendLogOut}>
					<div className={styles.ExitSvgContainer}>
						<ExitSvg />
					</div>
					<h4>Exit</h4>
				</li>
			</ul>
		</div>
	);
}
