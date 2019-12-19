import codes from './reducers';
import constants from './constants';
import defaultInitialState from '../defaultInitialState';

const initialState = {
  languageCodeList: [],
  languageCodeCount: 0,
  ...defaultInitialState,
};

describe('codes reducer', () => {
  it('should return the initial state', () => {
    expect(codes(undefined, {})).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "",
        "isCreateError": false,
        "isCreatePending": false,
        "isError": false,
        "isPending": false,
        "languageCode": null,
        "languageCodeCount": 0,
        "languageCodeList": Array [],
        "sortField": "code",
        "sortOrder": "asc",
        "statusCodes": Array [],
      }
    `);
  });
  it('should GET_LANGUAGE_CODES_FULFILLED', () => {
    expect(
      codes(initialState, {
        type: constants.GET_LANGUAGE_CODES_FULFILLED,
        payload: { data: {}, meta: { totalCount: 10 } },
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "",
        "isError": false,
        "isPending": false,
        "languageCode": null,
        "languageCodeCount": 10,
        "languageCodeList": Object {},
      }
    `);
  });
  it('should GET_LANGUAGE_CODES_PENDING', () => {
    expect(
      codes(initialState, {
        type: constants.GET_LANGUAGE_CODES_PENDING,
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "",
        "isError": false,
        "isPending": true,
        "languageCodeCount": 0,
        "languageCodeList": Array [],
      }
    `);
  });
  it('should GET_LANGUAGE_CODES_REJECTED', () => {
    expect(
      codes(initialState, {
        type: constants.GET_LANGUAGE_CODES_REJECTED,
        payload: { errors: [{ detail: 'ErrorMessage' }] },
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "Something went wrong!",
        "isError": true,
        "isPending": false,
        "languageCodeCount": 0,
        "languageCodeList": Array [],
      }
    `);
  });

  it('should CREATE_LANGUAGE_CODE_FULFILLED', () => {
    expect(
      codes(initialState, {
        type: constants.CREATE_LANGUAGE_CODE_FULFILLED,
        payload: { data: { id: 'id' } },
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "",
        "isCreatePending": false,
        "isError": false,
        "isPending": false,
        "languageCode": Object {
          "id": "id",
        },
        "languageCodeCount": 0,
        "languageCodeList": Array [],
      }
    `);
  });
  it('should CREATE_LANGUAGE_CODE_PENDING', () => {
    expect(
      codes(initialState, {
        type: constants.CREATE_LANGUAGE_CODE_PENDING,
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "",
        "isCreateError": false,
        "isCreatePending": true,
        "isError": false,
        "isPending": false,
        "languageCodeCount": 0,
        "languageCodeList": Array [],
      }
    `);
  });

  it('should CREATE_LANGUAGE_CODE_REJECTED', () => {
    expect(
      codes(initialState, {
        type: constants.CREATE_LANGUAGE_CODE_REJECTED,
        payload: { errors: [{ detail: 'ErrorMessage' }] },
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "Something went wrong!",
        "isCreateError": true,
        "isCreatePending": false,
        "isError": false,
        "isPending": false,
        "languageCodeCount": 0,
        "languageCodeList": Array [],
      }
    `);
  });

  it('should GET_LANGUAGE_CODE_BY_ID_FULFILLED', () => {
    expect(
      codes(initialState, {
        type: constants.GET_LANGUAGE_CODE_BY_ID_FULFILLED,
        payload: { data: {}, meta: { totalCount: 10 } },
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "",
        "isError": false,
        "isPending": false,
        "languageCode": Object {},
        "languageCodeCount": 0,
        "languageCodeList": Array [],
      }
    `);
  });
  it('should GET_LANGUAGE_CODE_BY_ID_PENDING', () => {
    expect(
      codes(initialState, {
        type: constants.GET_LANGUAGE_CODE_BY_ID_PENDING,
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "",
        "isError": false,
        "isPending": true,
        "languageCodeCount": 0,
        "languageCodeList": Array [],
      }
    `);
  });
  it('should GET_LANGUAGE_CODE_BY_ID_REJECTED', () => {
    expect(
      codes(initialState, {
        type: constants.GET_LANGUAGE_CODE_BY_ID_REJECTED,
        payload: { errors: [{ detail: 'ErrorMessage' }] },
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "Something went wrong!",
        "isError": true,
        "isPending": false,
        "languageCodeCount": 0,
        "languageCodeList": Array [],
      }
    `);
  });

  it('should DEPRECATE_LANGUAGE_CODE_FULFILLED', () => {
    expect(
      codes(initialState, {
        type: constants.DEPRECATE_LANGUAGE_CODE_FULFILLED,
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "",
        "isError": false,
        "isPending": false,
        "languageCodeCount": 0,
        "languageCodeList": Array [],
      }
    `);
  });
  it('should DEPRECATE_LANGUAGE_CODE_PENDING', () => {
    expect(
      codes(initialState, {
        type: constants.DEPRECATE_LANGUAGE_CODE_PENDING,
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "",
        "isError": false,
        "isPending": true,
        "languageCodeCount": 0,
        "languageCodeList": Array [],
      }
    `);
  });
  it('should DEPRECATE_LANGUAGE_CODE_REJECTED', () => {
    expect(
      codes(initialState, {
        type: constants.DEPRECATE_LANGUAGE_CODE_REJECTED,
        payload: { errors: [{ detail: 'ErrorMessage' }] },
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "Something went wrong!",
        "isError": true,
        "isPending": false,
        "languageCodeCount": 0,
        "languageCodeList": Array [],
      }
    `);
  });

  it('should UNDEPRECATE_LANGUAGE_CODE_FULFILLED', () => {
    expect(
      codes(initialState, {
        type: constants.UNDEPRECATE_LANGUAGE_CODE_FULFILLED,
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "",
        "isError": false,
        "isPending": false,
        "languageCodeCount": 0,
        "languageCodeList": Array [],
      }
    `);
  });
  it('should UNDEPRECATE_LANGUAGE_CODE_PENDING', () => {
    expect(
      codes(initialState, {
        type: constants.UNDEPRECATE_LANGUAGE_CODE_PENDING,
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "",
        "isError": false,
        "isPending": true,
        "languageCodeCount": 0,
        "languageCodeList": Array [],
      }
    `);
  });
  it('should UNDEPRECATE_LANGUAGE_CODE_REJECTED', () => {
    expect(
      codes(initialState, {
        type: constants.UNDEPRECATE_LANGUAGE_CODE_REJECTED,
        payload: { errors: [{ detail: 'ErrorMessage' }] },
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "Something went wrong!",
        "isError": true,
        "isPending": false,
        "languageCodeCount": 0,
        "languageCodeList": Array [],
      }
    `);
  });

  it('should GET_STATUS_CODES_FULFILLED', () => {
    expect(
      codes(initialState, {
        type: constants.GET_STATUS_CODES_FULFILLED,
        payload: { data: {}, meta: { totalCount: 10 } },
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "",
        "isError": false,
        "isPending": false,
        "languageCodeCount": 0,
        "languageCodeList": Array [],
        "statusCodes": Object {},
      }
    `);
  });
  it('should GET_STATUS_CODES_PENDING', () => {
    expect(
      codes(initialState, {
        type: constants.GET_STATUS_CODES_PENDING,
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "",
        "isError": false,
        "isPending": true,
        "languageCodeCount": 0,
        "languageCodeList": Array [],
      }
    `);
  });
  it('should GET_STATUS_CODES_REJECTED', () => {
    expect(
      codes(initialState, {
        type: constants.GET_STATUS_CODES_REJECTED,
        payload: { errors: [{ detail: 'ErrorMessage' }] },
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "Something went wrong!",
        "isError": true,
        "isPending": false,
        "languageCodeCount": 0,
        "languageCodeList": Array [],
      }
    `);
  });
});
