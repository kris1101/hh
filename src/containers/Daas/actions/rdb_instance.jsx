/*
#=========================================================
# 作者：韩望、秦海荣
# 时间：2018-09-17
# 功能：reducer rdb instance 关系型数据库实例动作
# 版本: v 0.0.0.1.base
# 公司：中化能源互联科技组
# 更新：无
# 备注：无
#=========================================================
*/
import { BASE_URL } from '../constants';
import { message } from 'antd';
import { RDBINSTANCEFETCH, RDBINSTANCECREATE, RDBINSTANCEUPDATE, RDBINSTANCEDELETE
 } from '../constants';
import axios from 'axios';
import { getAjax, postAjax, putAjax, deleteAjax} from '../../../utils/daas/newaxios'
import qs from 'qs';

const axios_instance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    timeout: 2000,
})

axios_instance.defaults.headers.post['Content-Type'] = 'multipart/form-data'

export function rdb_instance_fetch(instances) {
    return {
        type: RDBINSTANCEFETCH,
        instances
    }
};

export function rdb_instance_create(instance) {
    return {
        type: RDBINSTANCECREATE,
        instance
    }
};

export function rdb_instance_update(instance) {
    return {
        type: RDBINSTANCEUPDATE,
        instance
    }
};

export function rdb_instance_delete(instance) {
    return {
        type: RDBINSTANCEDELETE,
        instance
    }
};

export function rdbInstanceFetch(params={}){
    return dispatch=>{
        getAjax('/v1/api/rdb/instances', params, function(response){
            dispatch(rdb_instance_fetch(response.data.data));
        });
    }
}


export function rdbInstanceCreate(instance_obj){
    return dispatch=>{
      // axios_instance.post('/v1/api/rdb/instances', qs.stringify(instance_obj))
      //   .then(function(response){
      //       dispatch(rdb_instance_create(response.data));
      //       if (response.data.code) {
      //           message.error('实例创建失败: ' + response.data.message);
      //       } else {
      //           message.success('实例创建成功...');
      //       }
      //   })
        postAjax('/v1/api/rdb/instances', instance_obj, function(response){
             dispatch(rdb_instance_create(response.data));
             if (response.data.code) {
                 message.error('实例创建失败: ' + response.data.message);
             } else {
                 message.success('实例创建成功...');
             }
         })
    }
}

export function rdbInstanceUpdate(pk, instance_obj){
    return dispatch=>{
        putAjax('/v1/api/rdb/instances'+ '/' + pk,instance_obj, function(response){
            dispatch(rdb_instance_update(response.data));
            if (response.data.code) {
                message.error('实例更新失败: ' + response.data.message);
            } else {
                message.success('实例更新成功...');
            }
        });
    }
}


export function rdbInstanceDelete(pk){
    return dispatch=>{
        deleteAjax('/v1/api/rdb/instances'+ '/' + pk, function(response){
            dispatch(rdb_instance_delete(response.data));
        });
    }
}
