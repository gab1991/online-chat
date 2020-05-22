import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './Message.module.scss';

function Message(props) {
  const { message, sender_id, user_id, created_at } = props;
  const side = user_id === sender_id ? 'right' : 'left';
  const date = new Date(created_at);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  hours = hours > 9 ? hours : `0${hours}`;
  minutes = minutes > 9 ? minutes : `0${minutes}`;

  console.log(props);
  return (
    <div className={styles.Message}>
      <div
        className={`${styles.MessageContainer} 
        ${side === 'right' ? styles.RightSide : styles.LeftSide}
        `}>
        <p>{message}</p>
        <span>{`${hours}:${minutes}`}</span>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user_id: state.profile.id,
  };
}

export default connect(mapStateToProps)(Message);

Message.propTypes = {
  message: PropTypes.string,
  sender_id: PropTypes.number,
  user_id: PropTypes.number,
  created_at: PropTypes.string,
};
