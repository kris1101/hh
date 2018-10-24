/*
#=========================================================
# 作者：韩望、秦海荣
# 时间：2018-09-17
# 功能：reducer rdb host 关系型数据库主机动作
# 版本: v 0.0.0.1.base
# 公司：中化能源互联科技组
# 更新：无
# 备注：无
#=========================================================
*/
import { message } from 'antd';
import { RDBHOSTFETCH, RDBHOSTCREATE, RDBHOSTUPDATE, RDBHOSTDELETE } from '../constants';
import { getAjax, postAjax, putAjax, deleteAjax } from '../../../utils/daas/newaxios'

export function rdb_host_fetch(hosts) {
    return {
        type: RDBHOSTFETCH,
        hosts
    }
};

export function rdb_host_create(hosts) {
    return {
        type: RDBHOSTCREATE,
        hosts
    }
};

export function rdb_host_update(hosts) {
    return {
        type: RDBHOSTUPDATE,
        hosts
    }
};

export function rdb_host_delete(hosts) {
    return {
        type: RDBHOSTDELETE,
        hosts
    }
};


export function rdbHostFetch(params={}){
    return dispatch=>{
        getAjax('/v1/api/rdb/hosts', params, function(response){
            console.log(response);
            let resDat = response.data.data;
            if (!params.isdispach) {
                dispatch(rdb_host_fetch(resDat));
            }
            console.log(resDat);
        });
    }
}


export function rdbHostCreate(hostObj){
    return dispatch=>{
        postAjax('/v1/api/rdb/hosts', hostObj, function(response){
            console.log(hostObj);
            dispatch(rdb_host_create(response.data));
            if (response.data.code) {
                message.error('主机创建失败: ' + response.data.message);
            } else {
                message.success('主机创建成功...');
            }
        })
    }
}

export function rdbHostUpdate(pk, hostObj){
    return dispatch=>{
        putAjax('/v1/api/rdb/hosts/' + pk, hostObj, function(response){
            dispatch(rdb_host_update(response.data));
            if (response.data.code) {
                message.error('主机更新失败: ' + response.data.message);
            } else {
                message.success('主机更新成功...');
            }
        });
    }
}

export function rdbHostDelete(pk){
    return dispatch=>{
        deleteAjax('/v1/api/rdb/hosts/' + pk, function(response){
            dispatch(rdb_host_delete(response.data));
            if (response.data.code) {
                message.error('主机删除失败: ' + response.data.message);
            } else {
                message.success('主机删除成功...');
            }
        })
    }
}