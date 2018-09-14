import axios from 'axios'
import { notification  } from 'antd';
import { getAjax } from '../../../components/docker/utils/axios'

const LOAD_DATA = 'LOAD_CLUSTERLIST_DATA'

const initState={
	redirectTo:'',
	msg:'',
	clusterList:[]
}

// reducer
export function PaasCommon(state=initState, action){
	switch(action.type){
		case LOAD_DATA:
			return {...state, clusterList: action.payload.data}
		default:
			return state
	}
} 

export function loadData(clusterlistinfo){
	return { type:LOAD_DATA, payload:clusterlistinfo}
}


export function getUserClusterList(params={}){
	return dispatch=>{
      getAjax('/common/userclusterlist/', params, function(res){
          if (res.data.code == 0){
            dispatch(loadData(res.data))
          }else{
            notification.error({
              description: res.data.msg,
              message: "提示" 
            })
          }
          })
	}
}

