import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react';

import { useDebounce, useEffectCallback } from 'shared/lib';
import { chatsStore } from 'shared/model/store';

const ChatsContext = React.createContext<IChatsContext | null>(null);

interface IChatsContextProviderProps {
	chatId: number;
	children: ReactNode;
}

interface IChatsContext {
	lastSeenMsgId: number | null;
	oldestVisible: number;
	setVisibility(messageId: number, isVisible: boolean): void;
}

const DEFAULT_DELAY_MS = 500;

export const ChatsContextProvider = observer((props: IChatsContextProviderProps): JSX.Element => {
	const { chatId, children } = props;

	const [lastestSeenMsgId, setLatestSeenMsgId] = useState(0);
	const [currentlyVisible, setCurrentlyVisible] = useState<number[]>([]);
	const [oldestVisible, setOldestVisibile] = useState(0);
	const lastSeenMsgId = chatsStore.getLastSeenMsgIdInChat(chatId);

	const setMessageAsSeen = (messageId: number): void => {
		if (messageId > lastestSeenMsgId) {
			setLatestSeenMsgId(messageId);
		}
	};

	const setLastSeenMsgDebounced = useDebounce((messageId: number): void => {
		chatsStore.updLastSeenMsg(chatId, messageId);
	}, DEFAULT_DELAY_MS);

	const setLastSeenMsgDebouncedMemo = useEffectCallback(setLastSeenMsgDebounced);

	useEffect(() => {
		if (lastSeenMsgId === null || lastestSeenMsgId > lastSeenMsgId) {
			setLastSeenMsgDebouncedMemo(lastestSeenMsgId);
		}
	}, [lastestSeenMsgId, lastSeenMsgId, setLastSeenMsgDebouncedMemo]);

	useEffect(() => {
		const sorted = currentlyVisible.sort((a, b) => a - b);
		const newOldetVisible = sorted[0];
		newOldetVisible && setOldestVisibile(newOldetVisible);
	}, [currentlyVisible]);

	const setVisibility = (messageId: number, isVisible: boolean): void => {
		if (isVisible) {
			setCurrentlyVisible((prev) => [...prev, messageId]);
			setMessageAsSeen(messageId);
		} else {
			setCurrentlyVisible((prev) => prev.filter((visibleMessage) => messageId !== visibleMessage));
		}
	};

	return (
		<ChatsContext.Provider value={{ lastSeenMsgId, oldestVisible, setVisibility }}>{children}</ChatsContext.Provider>
	);
});

export function useChatsContext(): IChatsContext {
	const context = useContext(ChatsContext);

	if (!context) {
		throw new Error('useChatsContext has to be used within ChatsContextProvider');
	}
	return context;
}
