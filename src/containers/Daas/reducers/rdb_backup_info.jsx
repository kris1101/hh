/*
#=========================================================
# 作者：韩望、秦海荣
# 时间：2018-10-10
# 功能：reducer rdb instance backup actions 关系型数据库实例备份reducer
# 版本: v 0.0.0.1.base
# 公司：中化能源互联科技组
# 更新：无
# 备注：无
#=========================================================
*/
import { RDBINSTANCEBACKUPFETCH } from '../constants';

const initState={
    redirectTo:'',
    msg:'',
    total: 0,
    loading: false,
    backupsList:[]
}

export function RDBInstanceBackup(state=initState, action){
  switch(action.type){
    case RDBINSTANCEBACKUPFETCH:
        return {
            ...state,
            backupsList: action.backups,
            total: action.backups.data.length,
        };
    default:
        return {
            ...state, 
        };
  }
}
