import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { ErrorBoundary } from 'shared/ui';

import { App } from './App';

import styles from './App.module.scss';

export const IS_PROD = process.env.NODE_ENV === 'production' ? true : false;

ReactDOM.render(
	<div className={styles.mobileRestrainer}>
		<ErrorBoundary>
			<Router>
				<App />
			</Router>
		</ErrorBoundary>
	</div>,
	document.getElementById('root'),
);
