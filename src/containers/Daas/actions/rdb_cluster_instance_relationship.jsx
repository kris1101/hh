/*
#=========================================================
# 作者：韩望、秦海荣
# 时间：2018-09-17
# 功能：reducer rdb cluster instance 关系型数据库集群与实例操作
# 版本: v 0.0.0.1.base
# 公司：中化能源互联科技组
# 更新：无
# 备注：无
#=========================================================
*/

import { RDBCLUSTERINSTANCEREATIONSHIPFETCH, RDBCLUSTERINSTANCERELATIONSHIPUPDATE } from '../constants';
import { getAjax, putAjax } from '../../../utils/daas/newaxios'

export function rdb_cluster_instance_relationship_fetch(cluster_instance_relationships) {
    return {
        type: RDBCLUSTERINSTANCEREATIONSHIPFETCH,
        cluster_instance_relationships
    }
};


export function rdb_cluster_instance_relationship_update(cluster_instance_relationships) {
    return {
        type: RDBCLUSTERINSTANCERELATIONSHIPUPDATE,
        cluster_instance_relationships
    }
};


export function rdbClusterInstanceRelationshipFetch(params={}){
    return dispatch=>{
        getAjax('/v1/api/rdb/cluster/instance/relationships', params, function(response){
            console.log(response);
            let resDat = response.data.data;
            if (!params.isdispach) {
                dispatch(rdb_cluster_instance_relationship_fetch(resDat));
            }
        });
    }
}


export function rdbClusterInstanceRelationshipUpdate(pk, cluster_instance_relationship_objs){
    console.log(pk, cluster_instance_relationship_objs);
    return dispatch=>{
        putAjax('/v1/api/rdb/cluster/instance/relationships/' + pk, cluster_instance_relationship_objs, function(response){
            dispatch(rdb_cluster_instance_relationship_update(response.data));
        });
    }
}