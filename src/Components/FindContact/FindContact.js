import React, { useCallback, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Contact from '../Contact/Contact';
import { debounce } from '../../Utils/Utils';
import Backend from '../../Backend/Backend';
import Socket from '../../Backend/Socket';
import { socket } from '../../Backend/Socket';
import BackArrowIcon from '../UI/SvgIcons/BackArrow';
import CircularSpinner from '../UI/SvgSpinners/Circular';
import Input from '../UI/Inputs/Input/Input';
import LookUpIcon from '../UI/SvgIcons/LookUp';
import styles from '../FindContact/FindContact.module.scss';

function FindContact(props) {
  const { user_id } = props;
  const [contacts, setContacts] = useState([]);
  const [typing, showTyping] = useState(false);

  useEffect(() => {
    socket.on('got into room', () => console.log('got message'));
  }, []);

  const findProfiles = (searchStr) => {
    Backend.findProfiles(searchStr)
      .then((res) => {
        const profiles = res.data;
        setContacts(profiles);
        showTyping(false);
      })
      .catch((err) => {
        showTyping(false);
        setContacts([]);
      });
  };

  const delayedSearch = useCallback(debounce(findProfiles, 600));

  const onChangeHandler = (e) => {
    showTyping(true);
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
            type={'text'}
            className={styles.SearchInput}
            onChange={onChangeHandler}
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
