import React, {
  useState,
  useEffect,
  useRef,
  createRef,
  useCallback,
} from 'react';
import { connect, useSelector } from 'react-redux';
import { debounce } from '../../Utils/Utils';
import PropTypes from 'prop-types';
import Socket from '../../Backend/Socket';
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
  const chatData = useSelector((state) => state.chats[chatID]);
  const messages = chatData ? chatData.messages : [];
  const type = chatData && chatData.type;
  const convPartner = chatData && chatData.participants[0];
  const [inputValue, setInputValue] = useState();
  const [searchInputValue, setSearchInputValue] = useState();
  const [matchedMsgs, setMatchedMsgs] = useState([]);
  const [selectedMatchedMsg, setSelectedMatchedMsg] = useState();
  const [showSearch, setShowSearch] = useState(true);
  const msgArea = useRef();
  const messageRefs = useRef({});

  console.log(selectedMatchedMsg);

  useEffect(() => {
    if (selectedMatchedMsg) {
      handleClick(selectedMatchedMsg);
      console.log('focusing');
    }
  }, [selectedMatchedMsg]);

  useEffect(() => {
    if (matchedMsgs.length) setSelectedMatchedMsg(matchedMsgs[0].id);
  }, [matchedMsgs.length]);

  useEffect(() => {
    msgArea.current.scrollTop = msgArea.current.scrollHeight;
  }, [messages.length]);

  const goBackHandler = () => {
    props.history.goBack();
  };

  const inputChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    Socket.sendMessage(user_id, chatID, inputValue);
    setInputValue('');
  };

  const toggleSearchInMsgs = () => {
    setShowSearch((prevState) => !prevState);
  };

  const findMessage = (searchStr) => {
    const resullt = messages.filter((message) => {
      return message.message.toLowerCase().includes(searchStr.toLowerCase());
    });
    console.log(resullt);
    setMatchedMsgs(resullt);
    return resullt;
  };
  const delayedSearch = useCallback(debounce(findMessage, 1000));

  const SeacrhinputChangeHandler = (e) => {
    setSearchInputValue(e.target.value);
    const searchStr = e.target.value;
    delayedSearch(searchStr);
  };

  const handleClick = (id) => {
    const el = messageRefs.current[id];
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
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

  return (
    <div className={styles.ChatRoom}>
      <div className={styles.Header}>
        <div className={styles.HeaderContent}>
          <div className={styles.BackArrowSvg} onClick={goBackHandler}>
            <BackArrowIcon className={styles.BackArrowSvg} />
          </div>
          {!showSearch && (
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
          )}
          {showSearch && (
            <>
              <Input
                onChange={SeacrhinputChangeHandler}
                placeholder={'Seacrh message'}
                type={'text'}
                className={styles.Input}
              />
              <div className={styles.SearchResultToggler}>
                <div className={styles.ArrowHeadSvg}>
                  <ArrowHeadSvg className={styles.ArrowHeadSvg} />
                </div>
                <p>
                  {selectedMatchedMsg}of{matchedMsgs.length}
                </p>
                <div
                  className={styles.ArrowHeadSvg}
                  onClick={() => {
                    setSelectedMatchedMsg((prev) => prev + 1);
                  }}>
                  <ArrowHeadSvg className={styles.ArrowHeadSvgReversed} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className={styles.MessageArea} ref={msgArea}>
        {messages.map((msg) => (
          <Message
            {...msg}
            key={msg.id}
            refCb={(el) => {
              return (messageRefs.current[msg.id] = el);
            }}
            onClick={() => handleClick(msg.id)}
          />
        ))}
      </div>
      <form className={styles.TypeArea} onSubmit={submitHandler}>
        <div className={styles.TypeAreaSeparator}></div>
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
