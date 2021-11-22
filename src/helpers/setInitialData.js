const setInitialData = (target, data) => {
  for (const key in data) {
    if (data[key].isFile) {
      data[key].oldVal = target[key];
    } else {
      if (target.meta && target.meta[key]) {
        data[key].val = target.meta[key];
      } else {
        data[key].val = target[key];
      }
    }
  }
};

export default setInitialData;
