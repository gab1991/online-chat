import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { debounce, isEmptyObj } from '../../Utils/Utils';
import Menu from '../Menu/Menu';
import { connect } from 'react-redux';
import Chat from '../Chat/Chat';
import SearchTab from '../SearchTab/SearchTab';
import HamburgerIcon from '../UI/SvgIcons/Hamburger';
import LookUpIcon from '../UI/SvgIcons/LookUp';
import styles from '../Messages/Messages.module.scss';

function sortConvByTime(convObj) {
  return Object.keys(convObj).sort((chatId1, chatId2) => {
    const messageArr1 = convObj[chatId1].messages;
    const messageArr2 = convObj[chatId2].messages;
    const lastMsg1Date = Date.parse(
      messageArr1[messageArr1.length - 1].created_at
    );
    const lastMsg2Date = Date.parse(
      messageArr2[messageArr2.length - 1].created_at
    );

    if (lastMsg1Date < lastMsg2Date) {
      return 1;
    } else if (lastMsg2Date < lastMsg1Date) {
      return -1;
    } else {
      return 0;
    }
  });
}

function Messages(props) {
  const { conversations } = props;
  const inputRef = useRef();
  const [displConvs, setDisplConvs] = useState({});
  const [convSortedByTime, setConvSortedByTime] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [showSearchTab, setSearchTab] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [matchedConvs, setMatchedConvs] = useState({});
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const convSortedByTime = sortConvByTime(displConvs);
    setConvSortedByTime(convSortedByTime);
  }, [displConvs]);

  useEffect(() => {
    if (
      (isEmptyObj(matchedConvs) && searchInputValue.length !== 0) ||
      !isEmptyObj(matchedConvs)
    ) {
      setDisplConvs(matchedConvs);
    } else {
      setDisplConvs(conversations);
    }
  }, [conversations, matchedConvs, searchInputValue.length]);

  const findMessage = (searchStr, conversations) => {
    const foundConvs = {};

    if (searchStr.length === 0) {
      setMatchedConvs(foundConvs);
      setIsSearching(false);

      return;
    }

    for (let id in conversations) {
      const conversation = { ...conversations[id] };
      if (!conversation.messages.length) continue;
      const convResult = conversation.messages.filter((message) => {
        return message.message.toLowerCase().includes(searchStr.toLowerCase());
      });
      if (convResult.length) {
        foundConvs[conversation.id] = conversation;
        foundConvs[conversation.id].matchedMsgs = convResult.reverse();
      }
    }
    setIsSearching(false);

    setMatchedConvs(foundConvs);
  };

  const delayedSearch = useCallback(debounce(findMessage, 500), [
    searchInputValue,
    conversations,
  ]);

  useEffect(() => {
    setIsSearching(true);
    delayedSearch(searchInputValue, conversations);
  }, [searchInputValue, delayedSearch, conversations]);

  const enterChat = (conversationID) => {
    props.history.push(`/chats/${conversationID}`);
  };

  const toggleSearchInMsgs = () => {
    setSearchTab((prev) => {
      if (prev) {
        setMatchedConvs({});
        setSearchInputValue('');
      }
      return !prev;
    });
  };

  const seacrhinputChangeHandler = (e) => {
    const searchStr = e.target.value;
    setSearchInputValue(searchStr);
  };

  const clearInput = () => {
    setSearchInputValue('');
    inputRef.current.focus();
  };

  return (
    <div className={styles.Messages}>
      <div className={styles.Header}>
        <div className={styles.HeaderContent}>
          {!showSearchTab && (
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
          {showSearchTab && (
            <SearchTab
              inputRef={inputRef}
              isSearching={isSearching}
              toggleSearchInMsgs={toggleSearchInMsgs}
              seacrhinputChangeHandler={seacrhinputChangeHandler}
              searchInputValue={searchInputValue}
              clearInput={clearInput}
            />
          )}
        </div>
      </div>
      <div className={styles.ChatsContainer}>
        {!isEmptyObj(displConvs) &&
          convSortedByTime.map((key) => {
            const conversation = displConvs[key];
            if (conversation.messages.length) {
              return (
                <Chat
                  key={conversation.id}
                  {...conversation}
                  onClick={() => enterChat(conversation.id)}
                />
              );
            } else {
              return null;
            }
          })}
        {isEmptyObj(displConvs) && (
          <p className={styles.NothingFound}>Nothing found</p>
        )}
      </div>
      {showMenu && (
        <div
          className={styles.BackDrop}
          onClick={() => {
            setShowMenu(false);
          }}></div>
      )}
      <Menu
        isShowed={showMenu}
        className={showMenu ? styles.ShowMenu : styles.HideMenu}
      />
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
