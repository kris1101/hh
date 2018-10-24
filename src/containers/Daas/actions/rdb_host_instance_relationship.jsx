/*
#=========================================================
# 作者：韩望、秦海荣
# 时间：2018-10-24
# 功能：reducer rdb host instance 关系型数据库主机与实例操作
# 版本: v 0.0.0.1.base
# 公司：中化能源互联科技组
# 更新：无
# 备注：无
#=========================================================
*/

import { RDBHOSTINSTANCERELATIONSHIPFETCH, RDBHOSTINSTANCERELATIONSHIPUPDATE } from '../constants';
import { getAjax, putAjax } from '../../../utils/daas/newaxios'

export function rdb_host_instance_relationship_fetch(host_instance_relationships) {
    return {
        type: RDBHOSTINSTANCERELATIONSHIPFETCH,
        host_instance_relationships
    }
};


export function rdb_host_instance_relationship_update(host_instance_relationships) {
    return {
        type: RDBHOSTINSTANCERELATIONSHIPUPDATE,
        host_instance_relationships
    }
};


export function rdbHostInstanceRelationshipFetch(params={}){
    return dispatch=>{
        getAjax('/v1/api/rdb/host/instance/relationships', params, function(response){
            console.log(response);
            let resDat = response.data.data;
            if (!params.isdispach) {
                dispatch(rdb_host_instance_relationship_fetch(resDat));
            }
        });
    }
}


export function rdbHostInstanceRelationshipUpdate(pk, host_instance_relationship_objs){
    console.log(pk, host_instance_relationship_objs);
    return dispatch=>{
        putAjax('/v1/api/rdb/host/instance/relationships/' + pk, host_instance_relationship_objs, function(response){
            dispatch(rdb_host_instance_relationship_update(response.data));
        });
    }
}