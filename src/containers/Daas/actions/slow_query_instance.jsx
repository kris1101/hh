/*
#=========================================================
# 作者：韩望、秦海荣
# 时间：2018-09-17
# 功能：reducer slowquery actions 慢查询主机实例动作
# 版本: v 0.0.0.1.base
# 公司：中化能源互联科技组
# 更新：无
# 备注：无
#=========================================================
*/
import { SLOWQUERYINSTATNCESFETCH, SLOWQUERYINSTANCEUPDATE, SLOWQUERYINSTANCEDELETE } from '../constants';
import { getAjax, deleteAjax, putAjax } from '../../../utils/daas/axios';
import { message } from 'antd';

export function slow_query_instance_fetch(instances) {
    return {
        type: SLOWQUERYINSTATNCESFETCH,
        instances
    }
};

export function slow_query_instance_update(instances) {
    return {
        type: SLOWQUERYINSTANCEUPDATE,
        instances
    }
};

export function slow_query_instance_delete(instance_id) {
    return {
        type: SLOWQUERYINSTANCEDELETE,
    }
};


export function slowQueryInstatncesFetch(params={}){
    return dispatch=>{
        getAjax('/slow/query/instances', params, function(response){
            dispatch(slow_query_instance_fetch(response.data));
            console.log(response);
        });
    }
}


export function slowQueryInstanceUpdate(pk, instanceObj){
    return dispatch=>{
      putAjax(`/slow/query/instances/${pk}`, instanceObj, function(response){
            dispatch(slow_query_instance_update(response.data));
            if (response.data.code) {
                message.error('实例更新失败: ' + response.data.message);
            } else {
                message.success('实例更新成功...');
            }
         });
      //axios.put(BASE_URL + '/v1/api/slow/query/instances' + '/' + pk, instanceObj)
      // .then(function (response) {
      //    console.log(response);
      //    dispatch(slow_query_instance_update(response.data));
      //    if (response.data.code) {
      //        message.error('实例更新失败: ' + response.data.message);
      //    } else {
      //        message.success('实例更新成功...');
      //    }
      //})
      //.catch(function (error) {
      //    console.log(error);
      //});
    }
}


export function slowQueryInstatncesDelete(instance_id){
    return dispatch=>{
        deleteAjax('/slow/query/instances/' + instance_id, function(response){
            dispatch(slow_query_instance_delete(instance_id));
            if (response.data.code) {
                message.error('实例删除失败: ' + response.data.message);
            } else {
                message.success('实例删除成功...');
            }
        });
    }
}
