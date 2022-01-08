import { useNavigate } from 'react-router-dom';

import { IStrictProfile } from 'shared/types';

import { Avatar, BackArrowSvg, EmptyBtn, LookUpSvg } from 'shared/ui';

import styles from './AvatarName.module.scss';

interface IAvatarNameProps {
	chatParticipant: IStrictProfile;
	onLookUpBtnClick: () => void;
}

export function AvatarName(props: IAvatarNameProps) {
	const { chatParticipant, onLookUpBtnClick } = props;
	const navigate = useNavigate();

	const onBackArrowClick = () => navigate('..');

	return (
		<>
			<EmptyBtn onClick={onBackArrowClick}>
				<BackArrowSvg className={styles.svgIcon} />
			</EmptyBtn>
			<Avatar imgSrc={chatParticipant?.avatarUrl} text={chatParticipant.displayedName} className={styles.avatar} />
			<h3 className={styles.title}>{chatParticipant.displayedName}</h3>
			<EmptyBtn className={styles.rightBtn} onClick={onLookUpBtnClick}>
				<LookUpSvg className={styles.svgIcon} />
			</EmptyBtn>
		</>
	);
}
