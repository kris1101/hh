import { RDBINSTANCEBINLOGFETCH} from '../constants';
import { getAjax  } from '../../../utils/daas/axios';

//const axios_instance = axios.create({
//    baseURL: 'http://127.0.0.1:8000',
//    timeout: 2000
//})

export function rdb_binlog_info_fetch(binlogs) {
    return {
        type: RDBINSTANCEBINLOGFETCH,
        binlogs 
    }
};


export function rdbInstanceBinlogFetch(params={}){
    return dispatch=>{
      getAjax('rdb/instance/binlogs', params, function(response){
            dispatch(rdb_binlog_info_fetch(response.data));
            console.log(response.data);
        });
      //axios_instance.get('/v1/api/rdb/instance/backups', {
      //       params:params
      //   })
      //   .then(function (response) {
      //       console.log(response.data.data);
      //     //console.log(response.data.data.fields);
      //       dispatch(rdb_backup_info_fetch(response.data));
      //   })
      //   .catch(function (error) {
      //       console.log(error);
      //   });
    }
}
