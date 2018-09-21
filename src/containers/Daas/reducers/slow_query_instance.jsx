/*
#=========================================================
# 作者：韩望、秦海荣
# 时间：2018-09-17
# 功能：reducer slowquery actions 慢查询主机实例reducer
# 版本: v 0.0.0.1.base
# 公司：中化能源互联科技组
# 更新：无
# 备注：无
#=========================================================
*/
import { SLOWQUERYINSTATNCESFETCH } from '../constants';

const initState={
    redirectTo:'',
    msg:'',
    total: 0,
    loading: false,
    instancesList:[]
}

export function daasSlowQueryInstance(state=initState, action){
  switch(action.type){
    case SLOWQUERYINSTATNCESFETCH:
        return {
            ...state,
            instancesList: action.instances,
            total: action.instances.data.length,
        };
    default:
        return {
            ...state, 
        };
  }
}
