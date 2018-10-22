/*
#=========================================================
# 作者：韩望、秦海荣
# 时间：2018-09-17
# 功能：reducer slowquery actions 慢查询动作
# 版本: v 0.0.0.1.base
# 公司：中化能源互联科技组
# 更新：无
# 备注：无
#=========================================================
*/
import { message } from 'antd';
import { SLOWQUERYGROUPFETCH, SLOWQUERYGROUPCREATE, SLOWQUERYGROUPDETAIL, SLOWQUERYGROUPUPDATE} from '../constants';
import { getAjax, postAjax, putAjax } from '../../../utils/daas/axios'

export function slow_query_group_fetch(groups) {
    return {
        type: SLOWQUERYGROUPFETCH,
        groups
    }
};

export function slow_query_group_create(groups) {
    return {
        type: SLOWQUERYGROUPCREATE,
        groups
    }
};

export function slow_query_group_detail(group) {
    return {
        type: SLOWQUERYGROUPDETAIL,
        group
    }
};

export function slow_query_group_update(group) {
    return {
        type: SLOWQUERYGROUPUPDATE,
        group
    }
};

export function slowQueryGroupFetch(params={}){
    return dispatch=>{
        getAjax('/slow/query/groups', params, function(response){
            dispatch(slow_query_group_fetch(response.data));
            // console.log(response);
        });
        // axios.get(BASE_URL + '/v1/api/slow/query/users', {
        //     params:params
        // })
        // .then(function (response) {
        //     // console.log(response);
        //     dispatch(slowquery_user(response.data));
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });
    }
}

export function slowQueryGroupCreate(group_obj){
    return dispatch=>{
        postAjax('/slow/query/groups', group_obj, function(response){
            dispatch(slow_query_group_create(response.data));
            if (response.data.code) {
                message.error('组创建失败: ' + response.data.message);
            } else {
                message.success('组创建成功...');
            }
        })
        //  axios.post(BASE_URL + '/v1/api/slow/query/users', user_obj)
        // .then(function (response) {
        //     console.log(response);
        //     dispatch(slow_query_user_create(response.data));
        //  })
        //  .catch(function (error) {
        //      console.log(error);
        //  });
    }
}

export function getSlowQueryGroupDetail(pk){
    return dispatch=>{
        getAjax('/slow/query/groups',{},function(response){
            dispatch(slow_query_group_detail(response.data));
        });
        // axios.get(BASE_URL + '/v1/api/slow/query/users' + "/" + pk )
        // .then(function (response) {
        //     // console.log(response);
        //     dispatch(slow_query_user_detail(response.data));
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });
    }
}
export function slowQueryGroupUpdate(pk, groupObj){
    return dispatch=>{
         putAjax('/slow/query/groups', groupObj, function(response){
             dispatch(slow_query_group_update(response.data));
             if (response.data.code) {
                message.error('组更新失败: ' + response.data.message);
            } else {
                message.success('组更新成功...');
            }
         });

      // axios.put(BASE_URL + '/v1/api/slow/query/groups' + '/' + pk, groupObj)
      //  .then(function (response) {
             // dispatch(slow_query_user_update(response.data));
      //      if (response.data.code) {
      //         message.error('组更新失败: ' + response.data.message);
      //    } else {
      //         message.success('组更新成功...');
      //     }
      // })
      // .catch(function (error) {
      //     console.log(error);
      // });
    }
}
