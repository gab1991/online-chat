import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useReducer,
} from 'react';
import PropTypes from 'prop-types';
import { debounce, isEmptyObj } from '../../Utils/Utils';
import Menu from '../Menu/Menu';
import { connect } from 'react-redux';
import Chat from '../Chat/Chat';
import Button from '../UI/Buttons/Button/Button';
import SearchTab from '../SearchTab/SearchTab';
import HamburgerIcon from '../UI/SvgIcons/Hamburger';
import LookUpIcon from '../UI/SvgIcons/LookUp';
import FadingLinesSpinner from '../UI/SvgSpinners/FadingLines';
import styles from '../Messages/Messages.module.scss';

function sortConvByTime(convObj) {
  const sortedIds = Object.keys(convObj).sort((chatId1, chatId2) => {
    const messageArr1 =
      convObj[chatId1].matchedMsgs || convObj[chatId1].messages;
    const messageArr2 =
      convObj[chatId2].matchedMsgs || convObj[chatId2].messages;
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

  const sortedConvArr = [];
  sortedIds.forEach((id) => {
    sortedConvArr.push(convObj[id]);
  });

  return sortedConvArr;
}

function removeConvWithoutMsgs(convObj) {
  const emptyConvsRemoved = {};

  for (let id in convObj) {
    if (convObj[id]?.messages.length > 0) {
      emptyConvsRemoved[id] = { ...convObj[id] };
    }
  }
  return emptyConvsRemoved;
}

function reducer(state, action) {
  switch (action.type) {
    case 'FILL_DISPLAYED_CONVS': {
      const conversations = action.payload;
      const { matchedConvs, searchInputValue } = state;
      let displConvs = [];

      if (!isEmptyObj(matchedConvs) || searchInputValue.length !== 0) {
        displConvs = sortConvByTime(matchedConvs);
      } else {
        const emptyConvsRemoved = removeConvWithoutMsgs(conversations);
        displConvs = sortConvByTime(emptyConvsRemoved);
      }

      return { ...state, displConvs, isUpdatingDisplConvs: false };
    }
    case 'SET_IS_UPD_DISPL_CONVS': {
      return { ...state, isUpdatingDisplConvs: action.payload };
    }
    case 'CHANGE_INPUT_VALUE': {
      const value = action.payload;
      return { ...state, searchInputValue: value };
    }
    case 'SET_IS_SEARCHING': {
      const value = action.payload;
      return { ...state, isSearching: value };
    }
    case 'SET_MATCHED_CONVS': {
      const matchedConvs = action.payload;
      return { ...state, matchedConvs };
    }
    default:
      return state;
  }
}

function Messages(props) {
  const { conversations } = props;
  const inputRef = useRef();
  const [
    {
      displConvs,
      matchedConvs,
      searchInputValue,
      isSearching,
      isUpdatingDisplConvs,
    },
    dispatchLocal,
  ] = useReducer(reducer, {
    displConvs: [],
    isUpdatingDisplConvs: false,
    matchedConvs: {},
    isSearching: false,
    searchInputValue: '',
  });
  const [showMenu, setShowMenu] = useState(false);
  const [showSearchTab, setSearchTab] = useState(false);

  const findMessage = (searchStr, conversations) => {
    const foundConvs = {};
    if (searchStr.length === 0) {
      dispatchLocal({ type: 'SET_IS_SEARCHING', payload: false });
      dispatchLocal({
        type: 'SET_MATCHED_CONVS',
        payload: foundConvs,
      });
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
        foundConvs[conversation.id].matchedMsgs = convResult;
      }
    }
    dispatchLocal({ type: 'SET_IS_SEARCHING', payload: false });
    dispatchLocal({
      type: 'SET_MATCHED_CONVS',
      payload: foundConvs,
    });
  };

  const delayedSearch = useCallback(debounce(findMessage, 500), [
    searchInputValue,
    conversations,
  ]);

  useEffect(() => {
    dispatchLocal({ type: 'SET_IS_UPD_DISPL_CONVS', payload: true });
    dispatchLocal({ type: 'FILL_DISPLAYED_CONVS', payload: conversations });
  }, [conversations, matchedConvs]);

  useEffect(() => {
    if (searchInputValue) {
      dispatchLocal({ type: 'SET_IS_SEARCHING', payload: true });
    }
    delayedSearch(searchInputValue, conversations);
  }, [searchInputValue, conversations, delayedSearch]);

  useEffect(() => {
    if (showSearchTab) {
      inputRef.current.focus();
    }
  }, [showSearchTab]);

  const enterChat = (conversationID) => {
    const matchedMsgs = matchedConvs[conversationID]
      ? matchedConvs[conversationID].matchedMsgs
      : [];
    props.history.push({
      pathname: `/chats/${conversationID}`,
      state: { matchedMsgs, searchInputValue },
    });
  };

  const toggleSearchInMsgs = () => {
    setSearchTab((prev) => !prev);
    dispatchLocal({ type: 'CHANGE_INPUT_VALUE', payload: '' });
    dispatchLocal({ type: 'SET_MATCHED_CONVS', payload: {} });
  };

  const seacrhinputChangeHandler = (e) => {
    const searchStr = e.target.value;
    dispatchLocal({ type: 'CHANGE_INPUT_VALUE', payload: searchStr });
  };

  const clearInput = () => {
    dispatchLocal({ type: 'CHANGE_INPUT_VALUE', payload: '' });
    inputRef.current.focus();
  };

  const goToContactSearch = () => {
    props.history.push('/findContact');
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
        {!!displConvs.length &&
          displConvs.map((conversation) => {
            return (
              <Chat
                key={conversation.id}
                matchedMsgs={matchedConvs.id}
                {...conversation}
                onClick={() => enterChat(conversation.id)}
              />
            );
          })}
        {!displConvs.length && !isUpdatingDisplConvs && (
          <>
            <p className={styles.NothingFound}>
              {showSearchTab ? 'No messages found' : 'No chats yet!'}
            </p>
            {!showSearchTab && (
              <Button
                txtContent={'Go to find a friend'}
                onClick={goToContactSearch}
                className={styles.FindFriendBtn}
              />
            )}
          </>
        )}
        {!displConvs.length && isUpdatingDisplConvs && (
          <div className={styles.SpinnerContainer}>
            <FadingLinesSpinner />
          </div>
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
