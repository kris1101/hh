import { BASE_URL } from '../constants';
import { SLOWQEURYEMAILFETCH} from '../constants';
import { getAjax, putAjax, deleteAjax } from '../../../utils/daas/axios';
import axios from 'axios';
import { message } from 'antd';

export function slow_query_email_fetch(emails) {
    return {
        type: SLOWQEURYEMAILFETCH,
        emails
    }
};


export function slowQueryEmailsFetch(params={}){
    return dispatch=>{
        getAjax('/slow/query/emails', params, function(response){
            dispatch(slow_query_email_fetch(response.data));
            console.log(response);
        });
        // axios.get(BASE_URL + '/v1/api/slow/query/instances', {
        //     params:params
        // })
        // .then(function (response) {
        //     console.log(response);
        //     dispatch(slow_query_instance_fetch(response.data));
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });
    }
}