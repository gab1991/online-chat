import React, { Suspense, lazy, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { getProfile } from './Store/Actions/actions';
import Socket from './Backend/Socket';
import { isEmptyObj } from './Utils/Utils';
import PropTypes, { object, bool } from 'prop-types';
import AudioComponent from './Components/AudioComponent/AudioComponent';
import Loading from './Components/Loading/Loading';
import styles from './App.module.scss';

const ReactLazyPreload = (importStatement) => {
  const Component = lazy(importStatement);
  Component.preload = importStatement;
  return Component;
};

const ChatRoom = ReactLazyPreload(() =>
  import('./Components/ChatRoom/ChatRoom')
);
const FindContact = ReactLazyPreload(() =>
  import('./Components/FindContact/FindContact')
);
const Auth = ReactLazyPreload(() => import('./Components/Auth/Auth'));
const UserSettings = ReactLazyPreload(() =>
  import('./Components/UserSettings/UserSettings')
);
const Messages = ReactLazyPreload(() =>
  import('../src/Components/Messages/Messages')
);

function App(props) {
  const { isLogged, conversations, token } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEmptyObj(conversations)) return;
    Socket.subscribeToConversations(conversations);
  }, [conversations]);

  useEffect(() => {
    if (!token) return;
    dispatch(getProfile());
  }, [token, dispatch]);

  return (
    <div className={styles.mobileRestrainer}>
      <div className={styles.App}>
        <Suspense fallback={<Loading />}>
          {!isLogged.status && !isLogged.initialLoading && (
            <Route path="/" component={Auth} />
          )}
          {isLogged.status && (
            <Switch>
              <Route path="/chats/:chatID?" component={ChatRoom} />
              <Route path="/findContact" component={FindContact} />
              <Route path="/userSettings" component={UserSettings} />
              <Route path="/" component={Messages} />
            </Switch>
          )}
        </Suspense>
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
