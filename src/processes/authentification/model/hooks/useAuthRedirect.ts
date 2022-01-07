import { useEffect } from 'react';
import { useLocation, useNavigate, Location } from 'react-router-dom';

import { profileStore } from 'shared/model/store';

export function useAuthRedirect(): void {
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const destination = isLocationWithFrom(location) ? location.state.from : '/';

		profileStore.profile.id && navigate(destination || '/');
	}, [profileStore.profile.id]);
}

interface LocationWithFron extends Location {
	state: { from: string };
}

const isLocationWithFrom = (location: Location): location is LocationWithFron => {
	return typeof location.state === 'object' && location.state !== null && 'from' in location.state;
};
