import { makeAutoObservable } from 'mobx';

import { api } from 'shared/api';
import { MessagesApiService } from 'shared/api/rest/messagesApi.service';
class MessagePageStore {
	showMenu = false;
	showSearchHeader = false;
	isSearchMode = false;

	constructor(private messageService: MessagesApiService) {
		makeAutoObservable(this);
	}

	setShowMenu(show: boolean): void {
		this.showMenu = show;
	}

	setShowSearchHeader(show: boolean): void {
		this.showSearchHeader = show;
	}

	setSearchMode(isSearchMode: boolean): void {
		this.isSearchMode = isSearchMode;
	}
}

export const messagePagestore = new MessagePageStore(api.messagesApiService);
