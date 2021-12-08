import { action, makeAutoObservable } from 'mobx';

import { IUser } from 'types';

class UserStore {
	id: number | null = null;

	name = '';

	email = '';

	constructor() {
		makeAutoObservable(this);
	}

	fillUser(user: IUser) {
		this.email = user.email;
		this.id = user.id;
		this.name = user.name;
	}
}

export const userStore = new UserStore();

action(() => {
	console.log('userStore changed', userStore.name);
});
