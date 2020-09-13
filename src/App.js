import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { getProfile } from './Store/Actions/actions';
import Socket from './Backend/Socket';
import { isEmptyObj } from './Utils/Utils';
import PropTypes, { object, bool } from 'prop-types';
import Messages from '../src/Components/Messages/Messages';
import FindContact from '../src/Components/FindContact/FindContact';
import ChatRoom from './Components/ChatRoom/ChatRoom';
import Auth from './Components/Auth/Auth';
import UserSettings from './Components/UserSettings/UserSettings';
import AudioComponent from './Components/AudioComponent/AudioComponent';
import styles from './App.module.scss';

function App(props) {
  const { isLogged, conversations, token } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEmptyObj(conversations)) return;
    Socket.subscribeToConversations(conversations);
  }, [conversations]);

  useEffect(() => {
    if (!token) return;
    dispatch(getProfile(token));
  }, [token]);

  return (
    <div className={styles.modileRestrainer}>
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
        <AudioComponent />
      </div>
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
