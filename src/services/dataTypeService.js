const datatypes = require('../mock/datatype.json');

export const getDataTypes = async () => {
  const data = await datatypes.data;
  return data;
};
