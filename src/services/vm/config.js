import axios from 'axios';


axios.defaults.withCredentials = true


export var baseUrl = 'http://127.0.0.1:8002/';

export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';


