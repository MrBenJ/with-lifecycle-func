function withLifecycle({ before, after }) {
  return function(fn) {
    return async function(...args) {
      let beforeArgs = [];
      if (before) {
        const beforeValues = await before(...args);

        if (Array.isArray(beforeValues)) {
          beforeArgs = beforeArgs.concat(beforeValues);
        } else if (beforeValues) {
          beforeArgs = [ beforeValues ];
        }
      }

      let fnArgs = [ ...args, ...beforeArgs ];
      const currentValues = await fn.apply(null, [...args].concat(beforeArgs));

      if (Array.isArray(currentValues)) {
        fnArgs = fnArgs.concat([...currentValues]);
      } else if (currentValues) {
        fnArgs = fnArgs.concat([ currentValues ]);
      }

      if (after) {
        await after.apply(null, [...fnArgs]);
      }
    }
  }
}

module.exports = withLifecycle;
