import * as React from 'react';

function ConfirmCheck(props) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 33 24" fill="none" {...props}>
      <path
        d="M24.966 2.655l-2-2.416-9 10.862 2.002 2.416 8.998-10.862zM30.985.239L15.969 18.366l-5.933-7.145-2.001 2.416 7.934 9.578L33 2.655 30.985.239zM0 13.637l7.934 9.578 2.001-2.416-7.92-9.578L0 13.637z"
        fill="currentColor"
        fillOpacity={0.8}
      />
    </svg>
  );
}

const MemoConfirmCheck = React.memo(ConfirmCheck);
export default MemoConfirmCheck;
