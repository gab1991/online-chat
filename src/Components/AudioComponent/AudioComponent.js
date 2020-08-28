import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import useSound from 'use-sound';
import incomeMsgSound from '../../Assests/Sounds/Pop-sound-effect.mp3';

function AudioComponent(props) {
  const { audio } = props;

  const soundBank = {
    incomeMsg: useSound(incomeMsgSound)[0],
  };

  useEffect(() => {
    for (let trackname in audio) {
      if (audio[trackname]) {
        soundBank[trackname]();
      }
    }
  }, [audio]);

  return null;
}

function mapStateToProps(state) {
  return {
    audio: state.audio,
  };
}

export default connect(mapStateToProps)(AudioComponent);
