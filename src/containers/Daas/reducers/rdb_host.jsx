/*
#=========================================================
# 作者：韩望、秦海荣
# 时间：2018-10-16
# 功能：reducer rdb host 关系型数据库主机动作
# 版本: v 0.0.0.1.base
# 公司：中化能源互联科技组
# 更新：无
# 备注：无
#=========================================================
*/
import { RDBHOSTFETCH } from '../constants';

const initState={
    redirectTo:'',
    msg:'',
    total: 0,
    loading: false,
    hostsList:[]
}

export function daasRdbHost(state=initState, action){
  switch(action.type){
    case RDBHOSTFETCH:
        return {
            ...state,
            hostsList: action.hosts,
            total: action.hosts.length,
        };
    default:
        return {
            ...state, 
        };
  }
}
