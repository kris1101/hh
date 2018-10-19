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
import { RDBCLUSTERFETCH, RDBCLUSTERCREATE, RDBCLUSTERUPDATE, RDBCLUSTERDELETE } from '../constants';
import axios from 'axios';
import { getAjax, postAjax, putAjax, deleteAjax } from '../../../utils/daas/newaxios'
import qs from 'qs';

export function rdb_cluster_fetch(clusters) {
    return {
        type: RDBCLUSTERFETCH,
        clusters
    }
};

export function rdb_cluster_create(clusters) {
    return {
        type: RDBCLUSTERCREATE,
        clusters
    }
};

export function rdb_cluster_update(clusters) {
    return {
        type: RDBCLUSTERUPDATE,
        clusters
    }
};

export function rdb_cluster_delete(clusters) {
    return {
        type: RDBCLUSTERDELETE,
        clusters
    }
};


export function rdbClusterFetch(params={}){
    return dispatch=>{
        getAjax('/v1/api/rdb/clusters', params, function(response){
            console.log(response);
            let resDat = response.data.data;
            if (!params.isdispach) {
                dispatch(rdb_cluster_fetch(resDat));
            }
            console.log(resDat);
        });
    }
}


export function rdbClusterCreate(clusterObj){
    return dispatch=>{
        postAjax('/v1/api/rdb/clusters', clusterObj, function(response){
            dispatch(rdb_cluster_create(response.data));
            if (response.data.code) {
                message.error('集群创建失败: ' + response.data.message);
            } else {
                message.success('集群创建成功...');
            }
        })
    }
}

export function rdbClusterUpdate(pk, clusterObj){
    return dispatch=>{
        putAjax('/v1/api/rdb/clusters/' + pk, clusterObj, function(response){
            // console.log(projectObj);
            dispatch(rdb_cluster_update(response.data));
            if (response.data.code) {
                message.error('集群更新失败: ' + response.data.message);
            } else {
                message.success('集群更新成功...');
            }
        });
    }
}

export function rdbProjectDelete(pk){
    return dispatch=>{
        deleteAjax('/v1/api/rdb/clusters' + '/' + pk, function(response){
            dispatch(rdb_cluster_delete(response.data));
            if (response.data.code) {
                message.error('集群删除失败: ' + response.data.message);
            } else {
                message.success('集群删除成功...');
            }
        })
    }
}