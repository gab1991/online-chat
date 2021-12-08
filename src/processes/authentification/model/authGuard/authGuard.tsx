import { Navigate, Routes } from 'react-router-dom';
import { observer } from 'mobx-react';

import { profileStore } from 'shared/model/store';

interface IAuthGuardProps {
	children: JSX.Element;
}

export const AuthGuard = observer((props: IAuthGuardProps): JSX.Element => {
	if (!profileStore.id) {
		return <Navigate to="auth/login" />;
	}

	return <Routes>{props.children}</Routes>;
});
