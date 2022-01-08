import React, { ErrorInfo, HTMLAttributes, ReactNode } from 'react';

import { MainPlanet, MiddlePlanet, Ring, SmallPlanet, TinyPlanet } from '../planets';

import styles from './ErrorBoundary.module.scss';

interface IErrorBoundaryState {
	hasError: boolean;
}

type ErrorBoundaryProps = HTMLAttributes<HTMLDivElement>;

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, IErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	componentDidCatch(error: unknown, info: ErrorInfo): void {
		this.setState({ hasError: true });
		console.error(error, info);
	}

	render(): ReactNode {
		if (this.state.hasError) {
			return (
				<div className={styles.errorBoundary}>
					<Ring className={styles.ring} />
					<MainPlanet className={styles.main} />
					<MiddlePlanet className={styles.middle} />
					<SmallPlanet className={styles.small} />
					<TinyPlanet className={styles.tiny} />
					<p className={styles.text}>
						Oops!
						<br />
						Error occured.
						<br />
						Try to reload the page
					</p>
				</div>
			);
		}
		return this.props.children;
	}
}
