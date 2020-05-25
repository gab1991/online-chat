import * as React from 'react';

function ArrowHead(props) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 12 8" {...props}>
      <path
        d="M10.59 0.589996L6 5.17L1.41 0.589996L0 2L6 8L12 2L10.59 0.589996Z"
        fill="currentColor"
      />
    </svg>
  );
}

const MemoArrowHead = React.memo(ArrowHead);
export default MemoArrowHead;
