import * as React from 'react';

function Envelope(props) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 33 28" fill="none" {...props}>
      <path
        d="M33 3.778C33 1.883 31.515.332 29.7.332H3.3C1.485.332 0 1.882 0 3.778v20.678c0 1.896 1.485 3.447 3.3 3.447h26.4c1.815 0 3.3-1.551 3.3-3.447V3.778zm-3.3 0l-13.2 8.616L3.3 3.778h26.4zm0 20.678H3.3V7.225l13.2 8.616 13.2-8.616v17.232z"
        fill="currentColor"
        fillOpacity={0.8}
      />
    </svg>
  );
}

const MemoEnvelope = React.memo(Envelope);
export default MemoEnvelope;
