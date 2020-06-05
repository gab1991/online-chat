import React, { useState, useRef, useEffect } from 'react';
import useClickOutside from '../../Utils/useClickOutside';
import { connect, useDispatch } from 'react-redux';
import { logOut, updateProfile } from '../../Store/Actions/actions';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import Avatar from '../UI/Avatar/Avatar';
import Input from '../UI/Inputs/Input/Input';
import PencilSvg from '../UI/SvgIcons/Pencil';
import ConfirmTickSvg from '../UI/SvgIcons/ConfirmCheck';
import HumanSvg from '../UI/SvgIcons/Human';
import CogSvg from '../UI/SvgIcons/Cog';
import ExitSvg from '../UI/SvgIcons/Exit';
import styles from './Menu.module.scss';
import Backend from '../../Backend/Backend';

function Menu(props) {
  const { username, avatar_path, className, displayed_name } = props;
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState();
  const nameSectionRef = useRef();
  const [showNameInput, setShowNameInput] = useState(false);
  const [wrongInput, setWrongInput] = useState({
    state: false,
    invalidMsg: '',
  });

  useEffect(() => {
    if (inputValue && inputValue.length > 19) {
      setWrongInput({ state: true, invalidMsg: 'Too long name' });
    } else {
      setWrongInput({ state: false, invalidMsg: '' });
    }
  }, [inputValue]);

  const sendLogOut = () => {
    dispatch(logOut());
    props.history.push('/');
    localStorage.clear();
  };

  const toContacts = () => {
    props.history.push('/findContact');
  };

  const toggleInputVisibility = () => {
    setShowNameInput((prev) => !prev);
  };

  const changeDisplayedName = () => {
    if (!inputValue) {
      setWrongInput({ state: true, invalidMsg: 'Write at least 1 char' });
      return;
    }
    Backend.updateDispName(inputValue).then((res) => {
      const newDispName = res.data.displayed_name;
      dispatch(updateProfile({ displayed_name: newDispName }));
      setShowNameInput(false);
    });
  };

  const hideInput = (e) => {
    if (e.target === e.currentTarget) {
      setShowNameInput(false);
    }
  };

  return (
    <div className={`${styles.Menu} ${className}`} onClick={hideInput}>
      <div className={styles.NameSection} ref={nameSectionRef}>
        {showNameInput ? (
          <Input
            className={styles.Input}
            type={'text'}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            inValid={wrongInput.state}
            inValidMessage={wrongInput.invalidMsg}
          />
        ) : (
          <h3>{displayed_name || username}</h3>
        )}
      </div>
      <div className={styles.PencilTickSvgContainer}>
        {showNameInput ? (
          <div
            className={styles.ConfirmTickWrapper}
            onClick={changeDisplayedName}>
            <ConfirmTickSvg />
          </div>
        ) : (
          <div className={styles.PencilWrapper} onClick={toggleInputVisibility}>
            <PencilSvg />
          </div>
        )}
      </div>
      {username && (
        <Avatar
          text={username}
          imgSrc={avatar_path}
          size={170}
          className={styles.Avatar}
        />
      )}
      <ul className={styles.OptionsSection}>
        <li onClick={toContacts}>
          <div className={styles.HumanSvgContainer}>
            <HumanSvg />
          </div>
          <h4>Contacts</h4>
        </li>
        <li>
          <div className={styles.CogSvgContainer}>
            <CogSvg />
          </div>
          <h4>Settings</h4>
        </li>
        <li onClick={sendLogOut}>
          <div className={styles.ExitSvgContainer}>
            <ExitSvg />
          </div>
          <h4>Exit</h4>
        </li>
      </ul>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    username: state.profile.username,
    avatar_path: state.profile.avatar_path,
    displayed_name: state.profile.displayed_name,
  };
}

export default withRouter(connect(mapStateToProps)(Menu));

Menu.propTypes = {
  username: PropTypes.string,
  displayed_name: PropTypes.string,
  avatar_path: PropTypes.string,
};
