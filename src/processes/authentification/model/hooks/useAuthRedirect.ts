import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { profileStore } from 'shared/model/store';

export function useAuthRedirect(): void {
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		profileStore.profile.id && navigate(location.state?.from || '/');
	}, [profileStore.profile.id]);
}
