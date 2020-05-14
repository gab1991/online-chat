import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { logIn } from './Store/Actions/actions';
import Auth from './Components/Auth/Auth';
import Chats from './Components/Chats/Chats';
import UserSettings from './Components/UserSettings/UserSettings';
import styles from './App.module.scss';

function App(props) {
  const dispatch = useDispatch();
  const { isLogged } = props;

  useEffect(() => {
    const token = localStorage.token;
    const username = localStorage.username;
    if (token && username) {
      dispatch(logIn(username, token));
    }
  }, []);

  return (
    <div className={styles.App}>
      {isLogged && <UserSettings />}
      {/* {isLogged && <Auth />} */}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isLogged: state.logged,
  };
}

export default connect(mapStateToProps)(App);
