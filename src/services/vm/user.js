import axios from 'axios';

import * as config from './config';


var ins = axios.create({
    baseURL: config.baseUrl,//测试环境
    headers: {
        'content-type': 'application/json',
    }
});


export const userList = (params) => ins.get('accounts/users/', {params: params}).then(res => res.data).catch(err => console.log(err));
export const logList = (params) => ins.get('accounts/log/', {params: params}).then(res => res.data).catch(err => console.log(err));

export const keypairList = (params) => ins.get('keypairs/', {params: params}).then(res => res.data).catch(err => console.log(err));
