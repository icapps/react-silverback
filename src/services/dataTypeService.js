const datatypes = require('../mock/datatype.json');

export const get = async () => {
  const data = await datatypes.data;
  return data;
};
