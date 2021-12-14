import { makeAutoObservable } from 'mobx';

class MessagePageStore {
	showMenu = false;
	showSearchHeader = false;

	constructor() {
		makeAutoObservable(this);
	}

	setShowMenu(show: boolean) {
		this.showMenu = show;
	}

	setShowSearchHeader(show: boolean) {
		this.showSearchHeader = show;
	}
}

export const messagePagestore = new MessagePageStore();
