import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { logIn, updateProfile } from './Store/Actions/actions';
import Backend from '../src/Backend/Backend';
import Messages from '../src/Components/Messages/Messages';
import FindContact from '../src/Components/FindContact/FindContact';
import Auth from './Components/Auth/Auth';
import UserSettings from './Components/UserSettings/UserSettings';
import styles from './App.module.scss';
import { test } from './Backend/Socket';

function App(props) {
  const dispatch = useDispatch();
  const { isLogged } = props;

  useEffect(() => {
    const token = localStorage.token;
    const username = localStorage.username;
    if (token && username) {
      dispatch(logIn(username, token));
      Backend.getProfile(token).then((res) => {
        dispatch(updateProfile(res.data));
      });
    }
  }, []);

  test();

  return (
    <div className={styles.App}>
      <Switch>
        <Route path="/messages">
          <Messages />
        </Route>
        <Route path="/findContact">
          <FindContact />
        </Route>
        <Route path="/">
          {isLogged && <UserSettings />}
          {/* {isLogged && <Auth />} */}
        </Route>
      </Switch>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isLogged: state.logged,
  };
}

export default connect(mapStateToProps)(App);
