const makeActionCreator = (type, argument) => {
  if (!type) {
    throw new Error('Type required! You can\'t have an action without a type.');
  }
  return (args) => {
    return ({
      type,
      [argument]: args
    });
  };
};

const asyncActionHandler = (actionName, asyncAction) => {
  const name = actionName.toUpperCase();

  const requestAction = makeActionCreator(`${name}_REQUEST`, 'params');
  const loadedAction = makeActionCreator(`${name}_LOADED`, 'payload');
  const errorAction = makeActionCreator(`${name}_FAILED`, 'error');

  return (...args) => {
    return async (dispatch) => {
      dispatch(requestAction(args));
      try {
        const data = await asyncAction(...args);
        dispatch(loadedAction(data));
      } catch (error) {
        dispatch(errorAction(error));
      }
    };
  };
};

export default asyncActionHandler;
