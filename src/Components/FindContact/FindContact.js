import React, { useCallback, useState, useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfile } from '../../Store/Actions/actions';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Contact from '../Contact/Contact';
import { debounce } from '../../Utils/Utils';
import Backend from '../../Backend/Backend';
import BackArrowIcon from '../UI/SvgIcons/BackArrow';
import FadingLInesSpinner from '../UI/SvgSpinners/FadingLines';
import CircularSpinner from '../UI/SvgSpinners/Circular';
import Input from '../UI/Inputs/Input/Input';
import LookUpIcon from '../UI/SvgIcons/LookUp';
import styles from '../FindContact/FindContact.module.scss';

function FindContact(props) {
  const { user_id, token } = props;
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

  const findProfiles = (searchStr) => {
    Backend.findProfiles(searchStr)
      .then((res) => {
        const profiles = res.data;
        if (!isMounted.current) return;
        setContacts(profiles);
        setShowTyping(false);
      })
      .catch((err) => {
        if (!isMounted.current) return;
        setShowTyping(false);
        setContacts([]);
      });
  };

  const delayedSearch = useCallback(debounce(findProfiles, 1000));

  const onChangeHandler = (e) => {
    setShowTyping(true);
    const searchStr = e.target.value;
    delayedSearch(searchStr);
  };

  const enterChat = (contactName) => {
    setIsEnteringChat(true);

    Backend.conversationEnter(user_id, contactName)
      .then(async (res) => {
        const conversation_id = res?.data?.conversation_id;
        const isNewConversation = res?.data?.isNewConversation;

        if (conversation_id) {
          if (isNewConversation) {
            dispatch(getProfile(token));
          }
          props.history.push(`/chats/${res.data.conversation_id}`);
        }
      })
      .catch((err) => {
        console.log(err);
        if (!isMounted.current) return;
        setIsEnteringChat(false);
      });
  };

  const goBackHandler = () => {
    props.history.goBack();
  };

  return (
    <div
      className={`${styles.FindContact} ${
        isEnteringChat ? styles.blured : ''
      }`}>
      <div className={styles.Header}>
        <div className={styles.HeaderContent}>
          <BackArrowIcon
            className={styles.BackArrowSvg}
            onClick={goBackHandler}
          />
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
        {contacts.map((contact) => (
          <CSSTransition
            key={contact.username}
            timeout={1000}
            classNames={{ ...styles }}>
            <Contact {...contact} onClick={() => enterChat(contact.id)} />
          </CSSTransition>
        ))}
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
