import { autorun } from 'mobx';

import { eventEmmiter } from 'shared/api';

import { chatsStore, profileStore } from '.';

autorun(() => {
	if (profileStore.profile.id && chatsStore.chats.length) {
		eventEmmiter.joinChats({ chatIds: chatsStore.chats.map((chat) => chat.id), profileId: profileStore.profile.id });
	}
});

autorun(() => {
	if (profileStore.profile.id && profileStore.isConnected) {
		eventEmmiter.setIsOnline({ profileId: profileStore.profile.id });
		chatsStore.fetchLastSeenMsgs();
		chatsStore.fetchChats();
	}
});
