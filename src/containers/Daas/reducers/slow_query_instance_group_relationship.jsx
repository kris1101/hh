/*
#=========================================================
# 作者：韩望、秦海荣
# 时间：2018-09-21
# 功能：reducer slowquery actions 慢查实例与组关系 reducer
# 版本: v 0.0.0.1.base
# 公司：中化能源互联科技组
# 更新：无
# 备注：无
#=========================================================
*/
import { SLOWQUERYINSTANCEGROUPRELATIONSHIPUPDATE, SLOWQUERYINSTANCEGROUPRELATIONSHIPFETCH } from '../constants';

const initState={
    redirectTo:'',
    msg:'',
    total: 0,
    loading: false,
    groupsList:[]
}

export function daasSlowQueryInstanceGroupRelationship(state=initState, action) {
  switch(action.type){
    case SLOWQUERYINSTANCEGROUPRELATIONSHIPFETCH:
        return {
            ...state,
            groupsList: action.groupsList,
        };
    default:
        return {
            ...state, 
        };
  }
}
