import React, { useCallback, useState, useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfile } from '../../Store/Actions/actions';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Contact } from '../Contact/Contact';
import { debounce } from '../../Utils/Utils';
import Backend from '../../Backend/Backend';
import BackArrowIcon from '../UI/SvgIcons/BackArrow';
import FadingLInesSpinner from '../UI/SvgSpinners/FadingLines';
import CircularSpinner from '../UI/SvgSpinners/Circular';
import Input from '../UI/Inputs/Input/Input';
import LookUpIcon from '../UI/SvgIcons/LookUp';
import styles from '../FindContact/FindContact.module.scss';

function FindContact(props) {
	const { user_id } = props;
	const inputRef = useRef();
	const isMounted = useRef(true);
	const dispatch = useDispatch();
	const [contacts, setContacts] = useState([]);
	const [typing, setShowTyping] = useState(false);
	const [isEnteringChat, setIsEnteringChat] = useState(false);

	useEffect(() => {
		return () => {
			isMounted.current = false;
		};
	}, []);

	useEffect(() => {
		inputRef.current.focus();
	}, [inputRef]);

	const findProfiles = async (searchStr) => {
		const { data } = await Backend.findProfiles(searchStr, () => {
			//error handling
			if (!isMounted.current) return;
			setShowTyping(false);
			setContacts(data);
		});

		// console.log(data);

		setContacts(data);
		setShowTyping(false);

		// if (!profiles) return;
		// if (!isMounted.current) return;

		// console.log(profiles);
	};

	const delayedSearch = useCallback(debounce(findProfiles, 1000));

	const onChangeHandler = (e) => {
		setShowTyping(true);
		const searchStr = e.target.value;
		delayedSearch(searchStr);
	};

	const enterChat = async (contactName) => {
		setIsEnteringChat(true);

		const { data } = await Backend.conversationEnter(contactName, () => {
			if (!isMounted.current) return;
			setIsEnteringChat(false);
		});

		console.log(data);

		if (!data.id) return;

		// if (isNewConversation) {
		// 	dispatch(getProfile());
		// }

		props.history.push(`/chats/${data.id}`);
	};

	const goBackHandler = () => {
		props.history.goBack();
	};

	console.log(contacts);

	return (
		<div className={`${styles.FindContact} ${isEnteringChat ? styles.blured : ''}`}>
			<div className={styles.Header}>
				<div className={styles.HeaderContent}>
					<BackArrowIcon className={styles.BackArrowSvg} onClick={goBackHandler} />
					<Input
						inputRef={inputRef}
						type={'text'}
						className={styles.SearchInput}
						onChange={onChangeHandler}
						placeholder={'Find contact'}
					/>
					{typing ? (
						<CircularSpinner className={styles.CircularSpinnerSvg} />
					) : (
						<LookUpIcon className={styles.LookUpSvg} />
					)}
				</div>
			</div>
			<TransitionGroup className={styles.ChatsContainer}>
				{contacts.map((contact) => {
					//block myself from search
					// if (contact.id === user_id) return null;
					return (
						<CSSTransition key={contact.username} timeout={1000} classNames={{ ...styles }}>
							<Contact contact={contact} onClick={() => enterChat(contact.id)} />
						</CSSTransition>
					);
				})}
			</TransitionGroup>
			{isEnteringChat && (
				<div className={styles.SpinnerContainer}>
					<FadingLInesSpinner />
				</div>
			)}
		</div>
	);
}

function mapStateToProps(state) {
	return { user_id: state.profile.id, token: state.logged.token };
}

export default connect(mapStateToProps)(FindContact);

FindContact.propTypes = {
	username: PropTypes.string,
	token: PropTypes.string,
};
