import * as React from 'react';

function LookUp(props) {
  return (
    <svg
      width={'100%'}
      height={'100%'}
      viewBox="0 0 33 33"
      fill="currentColor"
      {...props}>
      <path d="M13.075 0C5.862 0 0 5.728 0 12.777c0 7.05 5.862 12.777 13.075 12.777 2.854 0 5.492-.898 7.643-2.419L30.837 33 33 30.886l-9.998-9.794c1.964-2.237 3.148-5.141 3.148-8.315C26.15 5.728 20.289 0 13.075 0zm0 1.503c6.381 0 11.537 5.038 11.537 11.274 0 6.236-5.156 11.274-11.537 11.274-6.381 0-11.537-5.038-11.537-11.274 0-6.236 5.156-11.274 11.537-11.274z" />
    </svg>
  );
}

const MemoLookUp = React.memo(LookUp);
export default MemoLookUp;