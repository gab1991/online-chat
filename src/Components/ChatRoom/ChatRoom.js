import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Socket from '../../Backend/Socket';
import Message from '../Message/Message';
import Input from '../UI/Inputs/Input/Input';
import BackArrowIcon from '../UI/SvgIcons/BackArrow';
import styles from './ChatRoom.module.scss';

function ChatRoom(props) {
  const { chatID } = props.match.params;
  const { user_id, chats } = props;
  const [inputValue, setInputValue] = useState();
  const messages = chats[chatID] ? chats[chatID].messages : [];

  useEffect(() => {
    if (user_id && chatID) {
      Socket.enterChat(user_id, chatID);
    }
  }, [chatID, user_id]);

  const goBackHandler = () => {
    props.history.goBack();
  };

  const inputChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const sendHandler = () => {
    Socket.sendMessage(user_id, chatID, inputValue);
  };
  return (
    <div className={styles.ChatRoom}>
      <div className={styles.Header}>
        <div className={styles.HeaderContent}>
          <BackArrowIcon
            className={styles.BackArrowSvg}
            onClick={goBackHandler}
          />
        </div>
      </div>
      <div className={styles.MessageArea}>
        {messages.map((msg) => (
          <Message {...msg} />
        ))}
      </div>
      <div className={styles.TypeArea}>
        <Input
          onChange={inputChangeHandler}
          placeholder={'Type a message'}
          type={'text'}
        />
        <button onClick={sendHandler}>send</button>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user_id: state.profile.id,
    chats: state.chats,
  };
}

export default connect(mapStateToProps)(ChatRoom);
ChatRoom.propTypes = {
  user_id: PropTypes.number,
};
