import * as React from 'react';

function BackArrow(props) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 22 22"
      fill="currentColor"
      {...props}>
      <path d="M11 16.5V22L0 11 11 0v5.5h11v11H11z" />
    </svg>
  );
}

const MemoBackArrow = React.memo(BackArrow);
export default MemoBackArrow;
