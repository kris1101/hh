import axios from 'axios';

import * as config from './config';


var ins = axios.create({
    baseURL: config.baseUrl,//测试环境
    headers: {
        'content-type': 'application/json',
    }
});


export const userList = () => ins.get('accounts/users/').then(res => res.data).catch(err => console.log(err));
