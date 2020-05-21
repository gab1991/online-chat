import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { logIn, updateProfile } from './Store/Actions/actions';
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
  const { isLogged, conversations } = props;

  useEffect(() => {
    Socket.subscribeToConversations(conversations);
  }, [conversations]);

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

  return (
    <div className={styles.App}>
      <Switch>
        <Route path="/messages" component={Messages} />
        <Route path="/findContact" component={FindContact} />
        <Route path="/chats/:chatID?" component={ChatRoom}></Route>
        <Route path="/">
          {isLogged && <UserSettings />}
          {!isLogged && <Auth />}
          {/* <Auth /> */}
        </Route>
      </Switch>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isLogged: state.logged,
    conversations: state.profile.conversations,
  };
}

export default connect(mapStateToProps)(App);
App.propTypes = {
  isLogged: PropTypes.oneOfType([object, bool]),
  conversations: PropTypes.array,
};
