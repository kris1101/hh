/*
#=========================================================
# 作者：韩望、秦海荣
# 时间：2018-10-16
# 功能：reducer rdb cluster 关系型数据库实例动作
# 版本: v 0.0.0.1.base
# 公司：中化能源互联科技组
# 更新：无
# 备注：无
#=========================================================
*/
import { RDBCLUSTERFETCH } from '../constants';

const initState={
    redirectTo:'',
    msg:'',
    total: 0,
    loading: false,
    clustersList:[]
}

export function daasRdbCluster(state=initState, action){
  switch(action.type){
    case RDBCLUSTERFETCH:
        return {
            ...state,
            clustersList: action.clusters,
            total: action.clusters.length,
        };
    default:
        return {
            ...state, 
        };
  }
}
