import * as React from 'react';

function Hamburger(props) {
  return (
    <svg
      width={'100%'}
      height={'100%'}
      viewBox="0 0 33 33"
      fill="currentColor"
      {...props}>
      <path
        d="M0 33h33v-5.5H0V33zm0-13.75h33v-5.5H0v5.5zM0 0v5.5h33V0H0z"
        fill="currentColor"
        fillOpacity={1}
      />
    </svg>
  );
}

const MemoHamburger = React.memo(Hamburger);
export default MemoHamburger;
