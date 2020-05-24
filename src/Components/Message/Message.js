import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './Message.module.scss';

function Message(props) {
  const { message, sender_id, user_id, created_at, refCb, onClick } = props;
  const side = user_id === sender_id ? 'right' : 'left';
  const date = new Date(created_at);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  hours = hours > 9 ? hours : `0${hours}`;
  minutes = minutes > 9 ? minutes : `0${minutes}`;

  return (
    <div className={styles.Message} ref={(el) => refCb(el)} onClick={onClick}>
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
