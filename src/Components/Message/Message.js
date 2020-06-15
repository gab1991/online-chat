import React from 'react';
import PropTypes from 'prop-types';
import formatTime from '../../Utils/timeFormatter';
import { connect } from 'react-redux';
import styles from './Message.module.scss';

function Message(props) {
  const {
    message,
    sender_id,
    user_id,
    created_at,
    refCb,
    onClick,
    focused,
  } = props;
  const side = user_id === sender_id ? 'right' : 'left';
  const [hours, minutes] = formatTime(created_at);

  return (
    <div
      className={`${styles.Message}`}
      ref={(el) => refCb(el)}
      onClick={onClick}>
      <div
        className={`${styles.MessageContainer} 
        ${side === 'right' ? styles.RightSide : styles.LeftSide}
        ${focused ? styles.Focused : ''}
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
  focused: PropTypes.bool,
};
