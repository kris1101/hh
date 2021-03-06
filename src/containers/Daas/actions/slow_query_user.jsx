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
import { FETCHSLOWQUERYUSERS, SLOWQUERYUSERCREATE, SLOWQUERYUSERDETAIL, SLOWQUERYUSERUPDATE } from '../constants';
import { getAjax, postAjax, putAjax } from '../../../utils/daas/axios'

export function slowquery_user(users) {
    return {
        type: FETCHSLOWQUERYUSERS,
        users
    }
};

export function slow_query_user_create(users) {
    return {
        type: SLOWQUERYUSERCREATE,
        users
    }
};

export function slow_query_user_detail(user) {
    return {
        type: SLOWQUERYUSERDETAIL,
        user
    }
};

export function slow_query_user_update(user) {
    return {
        type: SLOWQUERYUSERUPDATE,
        user
    }
};

export function getSlowQueryUsersList(params={}){
    return dispatch=>{
        getAjax('/slow/query/users', params, function(response){
            dispatch(slowquery_user(response.data));
        });
    }
}


export function slowQueryUsersCreate(user_obj){
    return dispatch=>{
        postAjax('/slow/query/users', user_obj, function(response){
            dispatch(slow_query_user_create(response.data));
            if (response.data.code) {
                message.error('用户创建失败: ' + response.data.message);
            } else {
                message.success('用户创建成功...');
            }
        })
    }
}

export function getSlowQueryUserDetail(pk){
    return dispatch=>{
        getAjax('/slow/query/users',{},function(response){
            dispatch(slow_query_user_detail(response.data));
        });
    }
}


export function slowQueryUsersUpdate(pk, userObj){
    return dispatch=>{
      putAjax(`/slow/query/users/${pk}`,userObj, function(response){
             dispatch(slow_query_user_update(response.data));
             if (response.data.code) {
                message.error('用户更新失败: ' + response.data.message);
            } else {
                message.success('用户更新成功...');
            }
         });
    }
}
