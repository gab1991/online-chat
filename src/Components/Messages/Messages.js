import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { debounce, isEmptyObj } from '../../Utils/Utils';
import Menu from '../Menu/Menu';
import EscIcon from '../UI/SvgIcons/Esc';
import BackArrowIcon from '../UI/SvgIcons/BackArrow';
import Input from '../UI/Inputs/Input/Input';
import { connect } from 'react-redux';
import Chat from '../Chat/Chat';
import HamburgerIcon from '../UI/SvgIcons/Hamburger';
import LookUpIcon from '../UI/SvgIcons/LookUp';
import styles from '../Messages/Messages.module.scss';

function Messages(props) {
  const { conversations } = props;
  const [showMenu, setShowMenu] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [searchInputValue, serSearchInputValue] = useState('');
  const [matchedConvs, setMatchedConvs] = useState({});

  useEffect(() => {
    delayedSearch(searchInputValue, conversations);
  }, [searchInputValue]);

  const findMessage = (searchStr, conversations) => {
    const foundConvs = {};
    for (let id in conversations) {
      const conversation = conversations[id];
      if (!conversation.messages.length) continue;
      const convResult = conversation.messages.filter((message) => {
        return message.message.toLowerCase().includes(searchStr.toLowerCase());
      });
      if (convResult.length) {
        foundConvs[conversation.id] = conversation;
        foundConvs[conversation.id].matchedMsgs = convResult.reverse();
      }
    }

    setMatchedConvs(foundConvs);
  };

  console.log(matchedConvs, isEmptyObj(matchedConvs));

  const delayedSearch = useCallback(debounce(findMessage, 500), []);

  const enterChat = (conversationID) => {
    props.history.push(`/chats/${conversationID}`);
  };

  const toggleSearchInMsgs = () => {
    setShowInput((prev) => {
      if (prev) {
        setMatchedConvs({});
      }
      return !prev;
    });
  };

  const SeacrhinputChangeHandler = (e) => {
    const searchStr = e.target.value;
    serSearchInputValue(searchStr);
  };

  return (
    <div className={styles.Messages}>
      <div className={styles.Header}>
        <div className={styles.HeaderContent}>
          {!showInput && (
            <>
              <HamburgerIcon
                className={styles.HamburgerSvg}
                onClick={() => {
                  setShowMenu(true);
                }}
              />
              <h3>Messages</h3>
              <div className={styles.LookUpSvg} onClick={toggleSearchInMsgs}>
                <LookUpIcon className={styles.LookUpSvg} />
              </div>
            </>
          )}
          {showInput && (
            <>
              <div className={styles.BackArrowSvg} onClick={toggleSearchInMsgs}>
                <BackArrowIcon className={styles.BackArrowSvg} />
              </div>
              <Input
                onChange={SeacrhinputChangeHandler}
                placeholder={'Search message'}
                type={'text'}
                value={searchInputValue}
                className={styles.Input}
              />
              <div
                className={styles.EscIconContainer}
                onClick={toggleSearchInMsgs}>
                <EscIcon className={styles.EscIconSvg} />
              </div>
            </>
          )}
        </div>
      </div>
      <div className={styles.ChatsContainer}>
        {conversations &&
          isEmptyObj(matchedConvs) &&
          !searchInputValue &&
          Object.keys(conversations).map((key) => {
            const conversation = conversations[key];
            if (conversation.messages.length) {
              return (
                <Chat
                  key={conversation.id}
                  {...conversation}
                  onClick={() => enterChat(conversation.id)}
                />
              );
            }
          })}
        {matchedConvs &&
          !isEmptyObj(matchedConvs) &&
          Object.keys(matchedConvs).map((key) => {
            const conversation = matchedConvs[key];
            if (conversation.messages.length) {
              return (
                <Chat
                  key={conversation.id}
                  {...conversation}
                  onClick={() => enterChat(conversation.id)}
                />
              );
            }
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
