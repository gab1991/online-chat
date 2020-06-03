import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Menu from '../Menu/Menu';
import { connect } from 'react-redux';
import Chat from '../Chat/Chat';
import HamburgerIcon from '../UI/SvgIcons/Hamburger';
import LookUpIcon from '../UI/SvgIcons/LookUp';
import styles from '../Messages/Messages.module.scss';

function Messages(props) {
  const { conversations } = props;
  const [showMenu, setShowMenu] = useState(true);

  const enterChat = (conversationID) => {
    console.log('here');
    props.history.push(`/chats/${conversationID}`);
  };

  return (
    <div className={styles.Messages}>
      <div className={styles.Header}>
        <div className={styles.HeaderContent}>
          <HamburgerIcon
            className={styles.HamburgerSvg}
            onClick={() => {
              setShowMenu(true);
            }}
          />
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
      {showMenu && (
        <div
          className={styles.BackDrop}
          onClick={() => {
            setShowMenu(false);
          }}></div>
      )}
      <Menu className={showMenu ? styles.ShowMenu : styles.HideMenu} />
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
