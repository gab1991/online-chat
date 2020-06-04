import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { logOut } from '../../Store/Actions/actions';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import Avatar from '../UI/Avatar/Avatar';
import Input from '../UI/Inputs/Input/Input';
import PencilSvg from '../UI/SvgIcons/Pencil';
import HumanSvg from '../UI/SvgIcons/Human';
import CogSvg from '../UI/SvgIcons/Cog';
import ExitSvg from '../UI/SvgIcons/Exit';
import styles from './Menu.module.scss';

function Menu(props) {
  const { username, avatar_path, className } = props;
  const dispatch = useDispatch();
  const [showNameInput, setShowNameInput] = useState(false);

  const sendLogOut = () => {
    dispatch(logOut());
    props.history.push('/');
    localStorage.clear();
  };

  return (
    <div className={`${styles.Menu} ${className}`}>
      <div className={styles.NameSection}>
        {showNameInput ? (
          <Input className={styles.Input} type={'text'} />
        ) : (
          <h3>{username}</h3>
        )}
      </div>
      <div
        className={styles.PencilSvgContainer}
        onClick={() => {
          setShowNameInput((prev) => !prev);
        }}>
        <PencilSvg />
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
        <li>
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
  };
}

export default withRouter(connect(mapStateToProps)(Menu));

Menu.propTypes = {
  username: PropTypes.string,
  avatar_path: PropTypes.string,
};
