function withLifecycle({ before, after }) {
  return function(fn) {
    return async function(...args) {
      if (before) {
        await before();
        await fn.call(...args);
        await after();
      }
    }
  }
}

module.exports = withLifecycle;

