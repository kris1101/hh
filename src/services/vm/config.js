import axios from 'axios';


export var baseUrl = 'http://127.0.0.1:8002/';

export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';


axios.defaults.withCredentials = true
axios.defaults.baseURL = baseUrl
axios.defaults.headers.get['Content-Type'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'
