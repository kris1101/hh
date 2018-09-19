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
export const keypairDetail = (params) => axios.get(`keypairs/${id}/`, {params: params}).then(res => res.data).catch(err => console.log(err));
export const keypairDelete = (id) => axios.delete(`keypairs/${id}/`).then(res => res.data).catch(err => console.log(err));


export const projectList = (params) => axios.get('accounts/projects/', {params: params}).then(res => res.data).catch(err => console.log(err));
export const projectCreate = (data) => axios.post('accounts/projects/create/', data).then(res => res.data).catch(err => console.log(err));
export const projectDetail = (id, params) => axios.get(`accounts/projects/${id}/`, {params: params}).then(res => res.data).catch(err => console.log(err));
export const projectUpdate = (id, data) => axios.put(`accounts/projects/${id}/`, data).then(res => res.data).catch(err => console.log(err));
export const projectQuotaUpdate = (id, data) => axios.put(`accounts/projects/quota/${id}/`, data).then(res => res.data).catch(err => console.log(err));


export const roleList = (params) => axios.get('accounts/roles/', {params: params}).then(res => res.data).catch(err => console.log(err));
export const roleCreate = (data) => axios.post('accounts/roles/create/', data).then(res => res.data).catch(err => console.log(err));
export const roleUpdate = (id, data) => axios.put(`accounts/roles/${id}/`, data).then(res => res.data).catch(err => console.log(err));


export const groupList = (params) => axios.get('accounts/groups/', {params: params}).then(res => res.data).catch(err => console.log(err));
export const groupCreate = (data) => axios.post('accounts/groups/create/', data).then(res => res.data).catch(err => console.log(err));
export const groupUpdate = (id, data) => axios.put(`accounts/groups/${id}/`, data).then(res => res.data).catch(err => console.log(err));
