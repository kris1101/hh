/*
#=========================================================
# 作者：韩望、秦海荣
# 时间：2018-09-17
# 功能：reducer rdb instance 关系型数据库实例动作
# 版本: v 0.0.0.1.base
# 公司：中化能源互联科技组
# 更新：无
# 备注：无
#=========================================================
*/
import { BASE_URL } from '../constants';
import { message } from 'antd';
import { RDBPROJECTFETCH, RDBPROJECTCREATE, RDBPROJECTUPDATE, RDBPROJECTDELETE } from '../constants';
import axios from 'axios';
import { getAjax, postAjax, putAjax, deleteAjax } from '../../../utils/daas/newaxios'
import qs from 'qs';

export function rdb_project_fetch(projects) {
    return {
        type: RDBPROJECTFETCH,
        projects
    }
};

export function rdb_project_create(project) {
    return {
        type: RDBPROJECTCREATE,
        project
    }
};

export function rdb_project_update(projects) {
    return {
        type: RDBPROJECTUPDATE,
        projects
    }
};

export function rdb_project_delete(project) {
    return {
        type: RDBPROJECTDELETE,
        project
    }
};


export function rdbProjectFetch(params={}){
    return dispatch=>{
        getAjax('/v1/api/rdb/projects', params, function(response){
            console.log(response);
            let resDat = response.data.data;
            if (!params.isdispach) {
                dispatch(rdb_project_fetch(resDat));
            }
            console.log(resDat);
        });
    }
}


export function rdbProjectCreate(projectObj){
    return dispatch=>{
        postAjax('/v1/api/rdb/projects', projectObj, function(response){
            dispatch(rdb_project_create(response.data));
            if (response.data.code) {
                message.error('组创建失败: ' + response.data.message);
            } else {
                message.success('组创建成功...');
            }
        })
    }
}

export function rdbProjectUpdate(pk, projectObj){
    return dispatch=>{
        putAjax('/v1/api/rdb/projects/' + pk, projectObj, function(response){
            console.log(projectObj);
            dispatch(rdb_project_update(response.data));
            if (response.data.code) {
                message.error('组更新失败: ' + response.data.message);
            } else {
                message.success('组更新成功...');
            }
        });
    }
}

export function rdbProjectDelete(pk){
    return dispatch=>{
        deleteAjax('/v1/api/rdb/projects' + '/' + pk, function(response){
            dispatch(rdb_project_delete(response.data));
            if (response.data.code) {
                message.error('组删除失败: ' + response.data.message);
            } else {
                message.success('组删除成功...');
            }
        })
    }
}
