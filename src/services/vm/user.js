import axios from 'axios';

import * as config from './config';


var ins = axios.create({
    baseURL: config.baseUrl,
    headers: {
        'content-type': 'application/json',
    }
});



export const userList = (params) => axios.get('accounts/users/', {params: params}).then(res => res.data).catch(err => console.log(err));
export const logList = (params) => axios.get('accounts/log/', {params: params}).then(res => res.data).catch(err => console.log(err));

export const keypairList = (params) => axios.get('keypairs/', {params: params}).then(res => res.data).catch(err => console.log(err));
export const keypairCreate = (data) => axios.post('keypairs/create/', data).then(res => res.data).catch(err => console.log(err));
export const keypairDetail = (params) => axios.get('keypairs/create/', {params: params}).then(res => res.data).catch(err => console.log(err));
export const keypairDelete = (params) => axios.delete('keypairs/create/', {params: params}).then(res => res.data).catch(err => console.log(err));
