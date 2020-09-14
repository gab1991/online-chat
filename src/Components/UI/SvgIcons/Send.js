import * as React from 'react';

function Send(props) {
  return (
    <svg
      viewBox="0 0 27 29"
      width="100%"
      height="100%"
      {...props}
      fill={'none'}>
      <path
        d="M24.4 1.9L1.8 14C1.1 14.4 1.1 15.5 1.9 15.8L22.7 24.5C23.3 24.8 24 24.3 24.1 23.7L25.8 2.9C25.9 2 25.1 1.5 24.4 1.9Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 3L11 19V26.3C11 27.2 12.2 27.7 12.8 27L17 22"
        stroke="currentColor"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MemoSend = React.memo(Send);
export default MemoSend;
