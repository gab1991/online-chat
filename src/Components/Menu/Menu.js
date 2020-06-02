import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Avatar from '../UI/Avatar/Avatar';
import PencilSvg from '../UI/SvgIcons/Pencil';
import HumanSvg from '../UI/SvgIcons/Human';
import CogSvg from '../UI/SvgIcons/Cog';
import ExitSvg from '../UI/SvgIcons/Exit';
import styles from './Menu.module.scss';

function Menu(props) {
  const { username, avatar_path } = props;

  return (
    <div className={styles.Menu}>
      <div className={styles.NameSection}>
        <h3>{username}</h3>
        <div className={styles.PencilSvgContainer}>
          <PencilSvg />
        </div>
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
        <li>
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

export default connect(mapStateToProps)(Menu);

Menu.propTypes = {
  username: PropTypes.string,
  avatar_path: PropTypes.string,
};
