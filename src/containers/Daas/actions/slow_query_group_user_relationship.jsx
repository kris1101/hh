import { BASE_URL } from '../constants';
import { SLOWQUERYGROUPUSERRELATIONSHIPUPDATE, SLOWQUERYGROUPUSERRELATIONSHIPFETCH } from '../constants';
import { getAjax, putAjax, deleteAjax } from '../../../utils/daas/axios';
import axios from 'axios';
import { message } from 'antd';

export function slow_query_group_user_update(usersList) {
    return {
        type: SLOWQUERYGROUPUSERRELATIONSHIPUPDATE,
        usersList,
    }
};


export function slow_query_group_user_fetch(usersList) {
    return {
        type: SLOWQUERYGROUPUSERRELATIONSHIPFETCH,
        usersList,
    }
};



export function slowQueryGroupUserRelationshipUpdate(params={}){
    console.log(params);
    params.userlist = (params.userlist.toString());
    // console.log(params);
    return dispatch=>{
        putAjax('/slow/query/group/user/relationships', params, function(response){
            console.log(response.data.data);
            dispatch(slow_query_group_user_update(response.data.data));
        });
    }
}


export function slowQueryGroupUserRelationshipFetch(usersList){
    return dispatch=>{
        dispatch(slow_query_group_user_fetch(usersList));
    }
}