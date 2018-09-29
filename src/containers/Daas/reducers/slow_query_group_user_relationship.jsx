/*
#=========================================================
# 作者：韩望、秦海荣
# 时间：2018-09-21
# 功能：reducer slowquery actions 慢查询组与用户关系 reducer
# 版本: v 0.0.0.1.base
# 公司：中化能源互联科技组
# 更新：无
# 备注：无
#=========================================================
*/
import { SLOWQUERYGROUPUSERRELATIONSHIPUPDATE, SLOWQUERYGROUPUSERRELATIONSHIPFETCH } from '../constants';

const initState={
    redirectTo:'',
    msg:'',
    total: 0,
    loading: false,
    usersList:[]
}

export function daasSlowQueryGroupUserRelationship(state=initState, action) {
  switch(action.type){
    case SLOWQUERYGROUPUSERRELATIONSHIPFETCH:
        return {
            ...state,
            usersList: action.usersList,
        };
    default:
        return {
            ...state, 
        };
  }
}
