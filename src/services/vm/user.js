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
// project member
export const projectMemberList = (project_id, params) => axios.get(`accounts/projects/${project_id}/member/`, {params: params}).then(res => res.data).catch(err => console.log(err));
export const projectMemberCreate = (project_id, data) => axios.post(`accounts/projects/${project_id}/member/add/`, data).then(res => res.data).catch(err => console.log(err));
export const projectMemberData = (project_id) => axios.get(`accounts/projects/${project_id}/member/add/`).then(res => res.data).catch(err => console.log(err));
export const projectMemberUpdate = (project_id, pa_id, data) => axios.put(`accounts/projects/${project_id}/member/${pa_id}/`, data).then(res => res.data).catch(err => console.log(err));
export const projectMemberDelete = (project_id, pa_id, params) => axios.delete(`accounts/projects/${project_id}/member/${pa_id}/`, {params: params}).then(res => res.data).catch(err => console.log(err));
// project group
export const projectGroupList = (project_id, params) => axios.get(`accounts/projects/${project_id}/group/`, {params: params}).then(res => res.data).catch(err => console.log(err));
export const projectGroupCreate = (project_id, data) => axios.post(`accounts/projects/${project_id}/group/add/`, data).then(res => res.data).catch(err => console.log(err));
export const projectGroupData = (project_id) => axios.get(`accounts/projects/${project_id}/group/add/`).then(res => res.data).catch(err => console.log(err));
export const projectGroupUpdate = (project_id, pa_id, data) => axios.put(`accounts/projects/${project_id}/group/${pa_id}/`, data).then(res => res.data).catch(err => console.log(err));
export const projectGroupDelete = (project_id, pa_id, params) => axios.delete(`accounts/projects/${project_id}/group/${pa_id}/`, {params: params}).then(res => res.data).catch(err => console.log(err));

// role
export const roleList = (params) => axios.get('accounts/roles/', {params: params}).then(res => res.data).catch(err => console.log(err));
export const roleCreate = (data) => axios.post('accounts/roles/create/', data).then(res => res.data).catch(err => console.log(err));
export const roleUpdate = (id, data) => axios.put(`accounts/roles/${id}/`, data).then(res => res.data).catch(err => console.log(err));


export const groupList = (params) => axios.get('accounts/groups/', {params: params}).then(res => res.data).catch(err => console.log(err));
export const groupCreate = (data) => axios.post('accounts/groups/create/', data).then(res => res.data).catch(err => console.log(err));
export const groupUpdate = (id, data) => axios.put(`accounts/groups/${id}/`, data).then(res => res.data).catch(err => console.log(err));
export const groupMemberList = (params) => axios.get(`accounts/groups/${params.group_id}/members/`, {params: params}).then(res => res.data).catch(err => console.log(err));
export const groupMemberAdd = (group_id, data) => axios.post(`accounts/groups/${group_id}/members/add/`, data).then(res => res.data).catch(err => console.log(err));
export const groupMembers = (group_id) => axios.get(`accounts/groups/${group_id}/members/add/`).then(res => res.data).catch(err => console.log(err));
export const groupMemberDel = (group_id, params) => axios.delete(`accounts/groups/${group_id}/members/del/`, {params: params}).then(res => res.data).catch(err => console.log(err));

// image
export const imageList = (params) => axios.get('instances/image/', {params: params}).then(res => res.data).catch(err => console.log(err));
export const imageDetail = (id, params) => axios.get(`instances/image/${id}/`, {params: params}).then(res => res.data).catch(err => console.log(err));



// networks
export const networkList = (params) => axios.get('networks/network/', {params: params}).then(res => res.data).catch(err => console.log(err));
export const networkDetail = (id, params) => axios.get(`networks/network/${id}/`, {params: params}).then(res => res.data).catch(err => console.log(err));
export const networkUpdate = (id, data) => axios.put(`networks/network/${id}/`, data).then(res => res.data).catch(err => console.log(err));
// subnet
export const subnetCreate = (network_id, data) => axios.post(`networks/network/${network_id}/subnet/create/`, data).then(res => res.data).catch(err => console.log(err));
export const subnetUpdate = (network_id, id, data) => axios.put(`networks/network/${network_id}/subnet/${id}/`, data).then(res => res.data).catch(err => console.log(err));
export const subnetDelete = (network_id, id, params) => axios.delete(`networks/network/${network_id}/subnet/${id}/`, {params: params}).then(res => res.data).catch(err => console.log(err));
