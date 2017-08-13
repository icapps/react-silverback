import fetch from 'isomorphic-fetch';
import constants from './constants';
import asyncActionHandler from '../asyncActionHandler';

export const getJoke = asyncActionHandler(constants.GET_JOKE, () =>
	fetch(process.env.REACT_APP_API_HOST, {
		method: 'GET',
		headers: {
			accept: 'application/json',
		},
	}).then((response) => response.json())
);
