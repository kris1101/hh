/*
#=========================================================
# 作者：韩望、秦海荣
# 时间：2018-10-16
# 功能：reducer rdb cluster instance 关系型数据库集群与实例操作
# 版本: v 0.0.0.1.base
# 公司：中化能源互联科技组
# 更新：无
# 备注：无
#=========================================================
*/
import { RDBCLUSTERINSTANCEREATIONSHIPFETCH } from '../constants';

const initState={
    redirectTo:'',
    msg:'',
    total: 0,
    loading: false,
    clusterinstancerelationshipsList:[]
}

export function daasRdbClusterInstanceRelationship(state=initState, action){
  switch(action.type){
    case RDBCLUSTERINSTANCEREATIONSHIPFETCH:
        return {
            ...state,
            clusterinstancerelationshipsList: action.cluster_instance_relationships,
            total: action.cluster_instance_relationships.length,
        };
    default:
        return {
            ...state, 
        };
  }
}
