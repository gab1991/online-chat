import { Navigate, Routes, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react';

import { profileStore } from 'shared/model/store';

interface IAuthGuardProps {
	children: JSX.Element;
}

export const AuthGuard = observer((props: IAuthGuardProps): JSX.Element => {
	const location = useLocation();

	if (!profileStore.id) {
		return <Navigate to="auth/login" state={{ from: location }} />;
	}

	return <Routes>{props.children}</Routes>;
});
