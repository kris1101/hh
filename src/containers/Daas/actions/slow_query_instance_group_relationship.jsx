import { BASE_URL } from '../constants';
import { SLOWQUERYINSTANCEGROUPRELATIONSHIPUPDATE, SLOWQUERYINSTANCEGROUPRELATIONSHIPFETCH } from '../constants';
import { getAjax, putAjax, deleteAjax } from '../../../utils/daas/axios';
import axios from 'axios';
import { message } from 'antd';

export function slow_query_instance_group_update(groupsList) {
    return {
        type: SLOWQUERYINSTANCEGROUPRELATIONSHIPUPDATE,
        groupsList,
    }
};


export function slow_query_instance_group_fetch(groupsList) {
    return {
        type: SLOWQUERYINSTANCEGROUPRELATIONSHIPFETCH,
        groupsList,
    }
};



export function slowQueryInstanceGroupRelationshipUpdate(params={}){
    console.log(params);
    params.groupslist = (params.groupslist.toString());
    // console.log(params);
    return dispatch=>{
        putAjax('/slow/query/group/instance/relationships', params, function(response){
            console.log(response.data.data);
            dispatch(slow_query_instance_group_update(response.data.data));
        });
    }
}


export function slowQueryInstanceGroupRelationshipFetch(groupsList){
    return dispatch=>{
        dispatch(slow_query_instance_group_fetch(groupsList));
    }
}