export const PENDING = 'PENDING';
export const FULFILLED = 'FULFILLED';
export const REJECTED = 'REJECTED';

const defaultTypes = [ PENDING, FULFILLED, REJECTED ];

const isPromise = value => {
  if (value !== null && typeof value === 'object') {
    return value && typeof value.then === 'function';
  }

  return false;
};

const promiseMiddleware = (config = {}) => {
  const promiseTypeSuffixes = config.promiseTypeSuffixes || defaultTypes;
  const promiseTypeSeparator = config.promiseTypeSeparator || '_';

  return ref => {
    const { dispatch } = ref;

    return next => action => {
      if (action.payload) {
        if (!isPromise(action.payload) && !isPromise(action.payload.promise)) {
          return next(action);
        }
      } else {
        return next(action);
      }

      // Deconstruct the properties of the original action object to constants
      const { type, payload, meta } = action;

      // Assign values for promise type suffixes
      const [ _PENDING, _FULFILLED, _REJECTED ] = promiseTypeSuffixes;

      const getAction = (newPayload, isRejected) => ({
        type : [ type, isRejected ? _REJECTED : _FULFILLED ].join(promiseTypeSeparator),
        ...(newPayload === null || typeof newPayload === 'undefined' ? {} : { payload: newPayload }),
        ...(meta !== undefined ? { meta } : {}),
        ...(isRejected ? { error: true } : {}),
      });

      let promise;
      let data;

      if (!isPromise(action.payload) && typeof action.payload === 'object') {
        promise = payload.promise;
        data = payload.data;
      } else {
        promise = payload;
        data = undefined;
      }

      next({
        type : [ type, _PENDING ].join(promiseTypeSeparator),
        ...(data !== undefined ? { payload: data } : {}),
        ...(meta !== undefined ? { meta } : {}),
      });

      const handleReject = reason => {
        const rejectedAction = getAction(reason, true);
        dispatch(rejectedAction);

        return { error: reason };
      };

      const handleFulfill = (value = null) => {
        const resolvedAction = getAction(value, false);
        dispatch(resolvedAction);

        return { value, action: resolvedAction };
      };

      return promise.then(handleFulfill, handleReject);
    };
  };
};

export default promiseMiddleware;
