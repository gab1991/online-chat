import React from 'react';
import PropTypes from 'prop-types';
import styles from './Message.module.scss';

export default function Message(props) {
  const { message } = props;
  console.log(props);
  return (
    <div className={styles.Message}>
      <div className={styles.MessageContainer}>
        {/* <p>{message}</p> */}
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro impedit
          inventore dolores tempora quo, enim iure dolore dolorum? Minima magnam
          dignissimos totam architecto. Illo temporibus soluta, veniam velit
          dolorum excepturi. Ex quidem dolor reiciendis quae laboriosam ducimus
          magni quam animi ipsam corrupti eos, labore fugit. Reprehenderit
          itaque saepe voluptate aut voluptatibus nemo in nisi, tempora
          excepturi similique nesciunt quaerat a. Iure eius natus et fuga,
          quisquam fugit pariatur commodi quidem, culpa dolorem dolores labore
          nobis sunt. Rem, modi ea eveniet labore obcaecati sed necessitatibus,
          eius quo inventore quam, dolores deleniti.
        </p>
      </div>
    </div>
  );
}

Message.propTypes = {};
