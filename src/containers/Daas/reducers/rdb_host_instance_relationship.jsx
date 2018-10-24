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
import { RDBHOSTINSTANCERELATIONSHIPFETCH } from '../constants';

const initState={
    redirectTo:'',
    msg:'',
    total: 0,
    loading: false,
    hostinstancerelationshipsList:[]
}

export function daasRdbHostInstanceRelationship(state=initState, action){
  switch(action.type){
    case RDBHOSTINSTANCERELATIONSHIPFETCH:
        return {
            ...state,
            hostinstancerelationshipsList: action.host_instance_relationships,
            total: action.host_instance_relationships.length,
        };
    default:
        return {
            ...state, 
        };
  }
}
