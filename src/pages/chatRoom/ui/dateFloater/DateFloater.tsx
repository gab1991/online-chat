import { HTMLAttributes, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { IMessage } from 'shared/types';

import { useChatsContext } from 'pages/chatRoom/model/context';
import { formatForDateFloater } from 'shared/lib';
import { GradientBlock } from 'shared/ui';

import styles from './DateFloater.module.scss';

interface IDateFloaterProps extends HTMLAttributes<HTMLDivElement> {
	messages: IMessage[];
	show: boolean;
}

export function DateFloater(props: IDateFloaterProps): JSX.Element {
	const { messages, show, ...htmlProps } = props;
	const { oldestVisible } = useChatsContext();
	const [floaterTxt, setFloaterTxt] = useState('');

	useEffect(() => {
		const message = messages.find((msg) => msg.id === oldestVisible);

		if (!message) {
			return;
		}

		const formatedText = formatForDateFloater(message.createdAt);
		setFloaterTxt(formatedText);
	}, [oldestVisible, messages]);

	return (
		<CSSTransition timeout={500} classNames={{ ...styles }} in={show} unmountOnExit appear>
			<GradientBlock {...htmlProps}>{floaterTxt}</GradientBlock>
		</CSSTransition>
	);
}
