import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { logIn, updateProfile, fillChats } from './Store/Actions/actions';
import { getProfileInfo } from './Components/Auth/Login/Login';
import Socket from './Backend/Socket';
import PropTypes, { object, bool } from 'prop-types';
import Backend from '../src/Backend/Backend';
import Messages from '../src/Components/Messages/Messages';
import FindContact from '../src/Components/FindContact/FindContact';
import ChatRoom from './Components/ChatRoom/ChatRoom';
import Auth from './Components/Auth/Auth';
import UserSettings from './Components/UserSettings/UserSettings';
import styles from './App.module.scss';

function App(props) {
  const dispatch = useDispatch();
  const { isLogged, conversations, token } = props;

  useEffect(() => {
    Socket.subscribeToConversations(conversations);
  }, [conversations]);

  useEffect(() => {
    if (!token) return;
    getProfileInfo(token, dispatch);
  }, [token]);

  return (
    <div className={styles.App}>
      {!isLogged && <Route path="/" component={Auth} />}
      {isLogged && (
        <Switch>
          <Route path="/chats/:chatID?" component={ChatRoom} />
          <Route path="/findContact" component={FindContact} />
          <Route path="/userSettings" component={UserSettings} />
          <Route path="/" component={Messages} />
        </Switch>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isLogged: state.logged,
    conversations: state.chats,
    token: state.logged.token,
  };
}

export default connect(mapStateToProps)(App);
App.propTypes = {
  isLogged: PropTypes.oneOfType([object, bool]),
  conversations: PropTypes.object,
};
