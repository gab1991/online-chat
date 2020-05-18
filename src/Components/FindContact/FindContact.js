import React, { useCallback, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Contact from '../Contact/Contact';
import { debounce } from '../../Utils/Utils';
import Backend from '../../Backend/Backend';
import HamburgerIcon from '../UI/SvgIcons/Hamburger';
import Input from '../UI/Inputs/Input/Input';
import LookUpIcon from '../UI/SvgIcons/LookUp';
import styles from '../FindContact/FindContact.module.scss';

export default function FindContact(props) {
  const [contacts, setContacts] = useState([]);

  const findProfiles = (searchStr) => {
    Backend.findProfiles(searchStr)
      .then((res) => {
        const profiles = res.data;
        setContacts(profiles);
      })
      .catch((err) => setContacts([]));
  };

  const delayedSearch = useCallback(debounce(findProfiles, 400));

  const onChangeHandler = (e) => {
    const searchStr = e.target.value;
    console.log(e.target.value);
    delayedSearch(searchStr);
  };

  return (
    <div className={styles.FindContact}>
      <div className={styles.Header}>
        <div className={styles.HeaderContent}>
          <Input
            type={'text'}
            className={styles.SearchInput}
            onChange={onChangeHandler}
          />
          <LookUpIcon className={styles.LookUpSvg} />
        </div>
      </div>
      <TransitionGroup className={styles.ChatsContainer} component={'div'}>
        {contacts.map((contact) => (
          <CSSTransition
            key={contact.username}
            timeout={1000}
            classNames={'list-transition'}>
            <Contact {...contact} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}
