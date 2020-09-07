import React, { useState, useEffect, useRef, useCallback } from 'react';
import { connect, useSelector } from 'react-redux';
import { debounce, throttle } from '../../Utils/Utils';
import { formatPopUpScroll } from '../../Utils/timeFormatter';
import PropTypes from 'prop-types';
import Socket from '../../Backend/Socket';
import SearchTab from '../SearchTab/SearchTab';
import DatePopUp from '../UI/PopUps/DatePopUp/DatePopUp';
import KeyBoardIcon from '../UI/SvgIcons/Keyboard';
import LookUpIcon from '../UI/SvgIcons/LookUp';
import ArrowHeadSvg from '../UI/SvgIcons/ArrowHead';
import Avatar from '../UI/Avatar/Avatar';
import Message from '../Message/Message';
import Input from '../UI/Inputs/Input/Input';
import BackArrowIcon from '../UI/SvgIcons/BackArrow';
import sassVars from '../../Configs/Variables.scss';
import styles from './ChatRoom.module.scss';

function ChatRoom(props) {
  const { chatID } = props.match.params;
  const { user_id } = props;
  const inputRef = useRef();
  const chatData = useSelector((state) => state.chats[chatID]);
  const messages = chatData ? chatData.messages : [];
  const type = chatData && chatData.type;
  const convPartner = chatData && chatData.participants[0];
  const [inputValue, setInputValue] = useState('');
  const [matchedMsgs, setMatchedMsgs] = useState([]);
  const [selectedMatchedMsg, setSelectedMatchedMsg] = useState({
    index: 1,
    msgId: null,
  });
  const [showSearch, setShowSearch] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const msgArea = useRef();
  const messageRefs = useRef({});
  const [datePopUp, setDatePopUp] = useState({
    isActive: false,
    content: '',
  });

  useEffect(() => {
    Socket.markMsgAsRead(chatID);
  }, [messages.length, chatID]);

  useEffect(() => {
    if (!datePopUp.isActive) return;
    const popUpTimer = setTimeout(() => {
      setDatePopUp((prev) => {
        return { ...prev, isActive: false };
      });
    }, 1000);
    return () => clearTimeout(popUpTimer);
  }, [datePopUp]);

  useEffect(() => {
    if (showSearch) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  useEffect(() => {
    if (selectedMatchedMsg.msgId) {
      focusOnMsg(selectedMatchedMsg.msgId);
    }
  }, [selectedMatchedMsg.msgId]);

  useEffect(() => {
    if (matchedMsgs.length) {
      setSelectedMatchedMsg((prev) => {
        const updState = { ...prev };
        updState.msgId = matchedMsgs[0].id;
        return updState;
      });
    } else {
      setSelectedMatchedMsg({
        index: 1,
        msgId: null,
      });
    }
  }, [matchedMsgs]);

  useEffect(() => {
    msgArea.current.scrollTop = msgArea.current.scrollHeight;
  }, [messages.length]);

  const findMessage = (searchStr, messages) => {
    if (searchStr.length === 0) {
      setIsSearching(false);
      return;
    }

    const resullt = messages.filter((message) => {
      return message.message.toLowerCase().includes(searchStr.toLowerCase());
    });
    setMatchedMsgs(resullt.reverse());
    setIsSearching(false);
  };

  const delayedSearch = useCallback(debounce(findMessage, 500), [
    searchInputValue,
    messages,
  ]);
  useEffect(() => {
    setIsSearching(true);
    delayedSearch(searchInputValue, messages);
  }, [searchInputValue, delayedSearch, messages]);

  const getlastVisibleMsg = (containerRef, msgRefsObj) => {
    if (!containerRef || !msgRefsObj) return;

    const msgIds = Object.keys(msgRefsObj).reverse();
    const maxHeight = containerRef.scrollHeight - containerRef.scrollTop;
    let currentSum = 0;
    let lastVisibleId = msgIds[0];

    for (let msgId of msgIds) {
      const elHeight = msgRefsObj[msgId].getBoundingClientRect().height;

      if (maxHeight > currentSum + elHeight) {
        currentSum += elHeight;
        lastVisibleId = msgId;
      } else {
        break;
      }
    }
    return Number(lastVisibleId);
  };

  const goBackHandler = () => {
    props.history.goBack();
  };

  const inputChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (inputValue) {
      Socket.sendMessage(user_id, chatID, inputValue);
      setInputValue('');
    }
  };

  const toggleSearchInMsgs = () => {
    setShowSearch((prevState) => !prevState);
  };

  const seacrhinputChangeHandler = (e) => {
    const searchStr = e.target.value;
    setSearchInputValue(searchStr);
  };

  const focusOnMsg = (id) => {
    const msgEl = messageRefs.current[id];

    msgEl.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  const handleSearchList = (e) => {
    const direction = e.currentTarget.getAttribute('data-direction');
    switch (direction) {
      case 'down':
        if (selectedMatchedMsg.index <= 1) return;
        setSelectedMatchedMsg((prev) => {
          const upd = { ...prev };
          upd.index--;
          upd.msgId = matchedMsgs[prev.index - 2].id;
          return upd;
        });
        break;
      case 'up':
        if (selectedMatchedMsg.index >= matchedMsgs.length) return;
        setSelectedMatchedMsg((prev) => {
          const upd = { ...prev };
          upd.index++;
          upd.msgId = matchedMsgs[prev.index++].id;
          return upd;
        });
        break;
      default:
    }
  };

  const clearSearchInput = () => {
    setSearchInputValue('');
    inputRef.current.focus();
    setMatchedMsgs([]);
  };

  const hideSearch = () => {
    setShowSearch(false);
    setSearchInputValue('');
    setMatchedMsgs([]);
  };

  const privateChatAvatarProps = {
    text:
      type === 'private'
        ? convPartner.displayed_name || convPartner.username
        : '',
    size: 65,
    imgSrc: convPartner && convPartner.avatar_path,
    color: sassVars['palette-background'],
  };

  const msgAreaScrollHandler = (msgAreaRef, msgsRefs, msgArr) => {
    const lastVisibleMsgId = getlastVisibleMsg(
      msgAreaRef.current,
      msgsRefs.current
    );

    let lastVisibleMsgDate;

    for (let msg of msgArr) {
      if (msg.id === lastVisibleMsgId) {
        lastVisibleMsgDate = msg.created_at;
        break;
      }
    }

    const formattedTime = formatPopUpScroll(lastVisibleMsgDate);
    setDatePopUp({ isActive: true, txtContent: formattedTime });
  };

  const throttledScroll = useCallback(
    throttle(() => msgAreaScrollHandler(msgArea, messageRefs, messages), 500),
    [msgArea, messageRefs, chatData]
  );

  return (
    <div className={styles.ChatRoom}>
      <div className={styles.Header}>
        <DatePopUp
          className={`${styles.DatePopUp} ${
            datePopUp.isActive ? styles.DatePopUpActive : ''
          }`}
          txtContent={datePopUp.txtContent}
        />
        <div className={styles.HeaderContent}>
          {!showSearch && (
            <>
              <div
                className={styles.BackArrowSvg}
                onClick={showSearch ? hideSearch : goBackHandler}>
                <BackArrowIcon className={styles.BackArrowSvg} />
              </div>
              <div className={styles.AvatarName}>
                <Avatar {...privateChatAvatarProps} className={styles.Avatar} />
                <h3>
                  {type === 'private'
                    ? convPartner.displayed_name || convPartner.username
                    : ''}
                </h3>
                <div className={styles.LookUpSvg} onClick={toggleSearchInMsgs}>
                  <LookUpIcon className={styles.LookUpSvg} />
                </div>
              </div>
            </>
          )}
          {showSearch && (
            <SearchTab
              inputRef={inputRef}
              isSearching={isSearching}
              toggleSearchInMsgs={toggleSearchInMsgs}
              seacrhinputChangeHandler={seacrhinputChangeHandler}
              searchInputValue={searchInputValue}
              clearInput={clearSearchInput}
            />
          )}
        </div>
      </div>
      <div
        className={styles.MessageArea}
        ref={msgArea}
        onWheel={throttledScroll}>
        {messages.map((msg) => (
          <Message
            {...msg}
            key={msg.id}
            focused={selectedMatchedMsg.msgId === msg.id ? true : false}
            refCb={(msgId) => {
              return (messageRefs.current[msg.id] = msgId);
            }}
          />
        ))}
      </div>
      <form className={styles.TypeArea} onSubmit={submitHandler}>
        <div className={styles.TypeAreaSeparator}></div>
        {showSearch && (
          <div className={styles.SearchResultToggler}>
            {matchedMsgs.length > 0 && (
              <>
                <p>
                  {selectedMatchedMsg.index}
                  {` of `}
                  {matchedMsgs.length}
                </p>
                <div className={styles.ArrowsContainer}>
                  <div
                    className={styles.ArrowSvgContainer}
                    data-direction={'down'}
                    onClick={handleSearchList}>
                    <ArrowHeadSvg />
                  </div>
                  <div
                    className={styles.ArrowSvgContainer}
                    onClick={handleSearchList}
                    data-direction={'up'}>
                    <ArrowHeadSvg className={styles.ArrowHeadSvgReversed} />
                  </div>
                </div>
              </>
            )}
            {!matchedMsgs.length && <p>No results</p>}
          </div>
        )}
        {!showSearch && (
          <div className={styles.InputContainer}>
            <Input
              onChange={inputChangeHandler}
              placeholder={'Type a message'}
              value={inputValue}
              type={'text'}
              className={styles.Input}
            />
            <KeyBoardIcon className={styles.SvgIcon} />
          </div>
        )}
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user_id: state.profile.id,
  };
}

export default connect(mapStateToProps)(ChatRoom);
ChatRoom.propTypes = {
  user_id: PropTypes.number,
};
