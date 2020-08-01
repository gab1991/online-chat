const debounce = (func, wait) => {
  let timeout;

  return function (...args) {
    const context = this;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
};

const isEmptyObj = (obj) => {
  return !obj || Object.keys(obj).length === 0;
};

export { debounce, isEmptyObj };
