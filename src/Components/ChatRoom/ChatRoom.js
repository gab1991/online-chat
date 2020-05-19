import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Socket from '../../Backend/Socket';
import { socket } from '../../Backend/Socket';
import Input from '../UI/Inputs/Input/Input';
import BackArrowIcon from '../UI/SvgIcons/BackArrow';
import styles from './ChatRoom.module.scss';

function ChatRoom(props) {
  const { chatID } = props.match.params;
  const { user_id } = props;
  const [inputValue, setInputValue] = useState();
  console.log(chatID, user_id);

  useEffect(() => {
    socket.on('entered', (data) => console.log(data));
    socket.on('message', (data) => console.log(`Server message ${data}`));
  }, []);

  useEffect(() => {
    if (user_id && chatID) {
      Socket.enterChat(user_id, chatID);
    }
  }, [chatID, user_id]);

  const goBackHandler = () => {
    props.history.goBack();
  };

  console.log(inputValue);

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
      <div className={styles.MessageArea}></div>
      <Input onChange={inputChangeHandler} />
      <button onClick={sendHandler}>send</button>
    </div>
  );
}

function mapStateToProps(state) {
  return { user_id: state.profile.id };
}

export default connect(mapStateToProps)(ChatRoom);
ChatRoom.propTypes = {
  user_id: PropTypes.string,
};
