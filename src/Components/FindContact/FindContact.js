import React, { useCallback, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Contact from '../Contact/Contact';
import { debounce } from '../../Utils/Utils';
import Backend from '../../Backend/Backend';
import BackArrowIcon from '../UI/SvgIcons/BackArrow';
import CircularSpinner from '../UI/SvgSpinners/Circular';
import Input from '../UI/Inputs/Input/Input';
import LookUpIcon from '../UI/SvgIcons/LookUp';
import styles from '../FindContact/FindContact.module.scss';

function FindContact(props) {
  const { user_id } = props;
  const inputRef = useRef();
  const isMounted = useRef(true);
  const [contacts, setContacts] = useState([]);
  const [typing, setShowTyping] = useState(false);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  });

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
    Backend.conversationEnter(user_id, contactName).then((res) => {
      console.log(res.data);
      if (res.data.conversation_id) {
        props.history.push(`/chats/${res.data.conversation_id}`);
      }
    });
  };

  const goBackHandler = () => {
    props.history.goBack();
  };

  return (
    <div className={styles.FindContact}>
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
            classNames={'list-transition'}>
            <Contact {...contact} onClick={() => enterChat(contact.id)} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}

function mapStateToProps(state) {
  return { user_id: state.profile.id };
}

export default connect(mapStateToProps)(FindContact);

FindContact.propTypes = {
  username: PropTypes.string,
};
