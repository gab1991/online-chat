import * as React from 'react';

function Exit(props) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 22 22" fill="none" {...props}>
      <path
        d="M13.334 6.612L11.611 4.89 5.5 11l6.111 6.111 1.723-1.723-3.153-3.166H22V9.778H10.181l3.153-3.166zM2.444 22h17.112C20.912 22 22 20.9 22 19.556v-4.89h-2.444v4.89H2.444V2.444h17.112v4.89H22v-4.89A2.444 2.444 0 0019.556 0H2.444A2.452 2.452 0 000 2.444v17.112C0 20.9 1.1 22 2.444 22z"
        fill="currentColor"
      />
    </svg>
  );
}

const MemoExit = React.memo(Exit);
export default MemoExit;
