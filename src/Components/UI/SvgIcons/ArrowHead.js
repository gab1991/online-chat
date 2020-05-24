import * as React from 'react';

function ArrowHead(props) {
  return (
    <svg
      height="100%"
      width="100%"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}>
      <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  );
}

const MemoArrowHead = React.memo(ArrowHead);
export default MemoArrowHead;
