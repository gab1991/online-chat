import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Chat from '../Chat/Chat';
import HamburgerIcon from '../UI/SvgIcons/Hamburger';
import LookUpIcon from '../UI/SvgIcons/LookUp';
import styles from '../Messages/Messages.module.scss';

function Messages(props) {
  const { conversations } = props;

  const enterChat = (conversationID) => {
    console.log('here');
    props.history.push(`/chats/${conversationID}`);
  };

  return (
    <div className={styles.Messages}>
      <div className={styles.Header}>
        <div className={styles.HeaderContent}>
          <HamburgerIcon className={styles.HamburgerSvg} />
          <h3>Messages</h3>
          <LookUpIcon className={styles.LookUpSvg} />
        </div>
      </div>
      <div className={styles.ChatsContainer}>
        {conversations &&
          Object.keys(conversations).map((key) => {
            const conversation = conversations[key];
            return (
              <Chat
                key={conversation.id}
                {...conversation}
                onClick={() => enterChat(conversation.id)}
              />
            );
          })}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    conversations: state.chats,
  };
}

export default connect(mapStateToProps)(Messages);

Messages.propTypes = {
  conversations: PropTypes.object,
};
