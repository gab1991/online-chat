import * as React from 'react';

function Circular(props) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      display="block"
      {...props}>
      <circle
        cx={50}
        cy={50}
        fill="none"
        stroke="currentColor"
        strokeWidth={10}
        r={43}
        strokeDasharray="202.63272615654165 69.54424205218055"
        transform="rotate(62.932 50 50)">
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1.7857142857142856s"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
        />
      </circle>
    </svg>
  );
}

const MemoCircular = React.memo(Circular);
export default MemoCircular;
