import { useEffect } from 'react';
import { connect } from 'react-redux';
// import useSound from 'use-sound';
import incomeMsgSound from '../../Assests/Sounds/Pop-sound-effect.mp3';

function AudioComponent(props) {
	// const { audio } = props;
	// const volumeRate = 0.2;
	// const soundBank = {
	//   incomeMsg: useSound(incomeMsgSound, { volume: volumeRate })[0],
	// };

	// const playSound = () => {
	//   for (let trackname in audio) {
	//     if (audio[trackname]) {
	//       soundBank[trackname]();
	//     }
	//   }
	// };

	// useEffect(playSound, [audio]);

	return null;
}

function mapStateToProps(state) {
	return {
		audio: state.audio,
	};
}

export default connect(mapStateToProps)(AudioComponent);
