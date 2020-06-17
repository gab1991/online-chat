const debounce = (func, wait) => {
  let timeout;

  return function (...args) {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      timeout = null;
      func.apply(this, args);
    }, wait);
  };
};

const isEmptyObj = (obj) => {
  return !obj || Object.keys(obj).length === 0;
};

export { debounce, isEmptyObj };
