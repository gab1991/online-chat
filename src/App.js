import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { logIn } from './Store/Actions/actions';
import Auth from './Components/Auth/Auth';
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
    <>
      {isLogged && <div>is logged</div>}
      {!isLogged && <Auth />}
    </>
  );
}

function mapStateToProps(state) {
  return {
    isLogged: state.logged,
  };
}

export default connect(mapStateToProps)(App);
