import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { logIn, updateProfile, fillChats } from './Store/Actions/actions';
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
    Backend.getProfile(token).then((res) => {
      const profile = {
        avatar_path: res.data.avatar_path,
        id: res.data.id,
        username: res.data.username,
        displayed_name: res.data.displayed_name,
      };
      const conversations = {
        ...res.data.conversations,
      };
      dispatch(updateProfile(profile));
      dispatch(fillChats(conversations));
    });
  }, []);

  return (
    <div className={styles.App}>
      {!isLogged && <Route path="/" component={Auth} />}
      {isLogged && (
        <Switch>
          <Route path="/" component={Messages} />
          <Route path="/findContact" component={FindContact} />
          <Route path="/chats/:chatID?" component={ChatRoom} />
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
