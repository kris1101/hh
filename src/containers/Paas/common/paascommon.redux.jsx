import axios from 'axios'
import { notification  } from 'antd';
import { getAjax } from '../../../components/docker/utils/axios'

const LOAD_DATA = 'LOAD_CLUSTERLIST_DATA'
const CLEAR_DATA = 'CLEAR_DATA'
const LOAD_NAMESPACE_DATA = 'LOAD_NAMESPACE_DATA'

const initState={
	redirectTo:'',
	msg:'',
    clusterList:[],
    namespaceList:[],

}

// reducer
export function PaasCommon(state=initState, action){
	switch(action.type){
		case LOAD_DATA:
			return {...state, clusterList: action.payload.data}
		case LOAD_NAMESPACE_DATA:
			return {...state, namespaceList: action.payload.data}
		case CLEAR_DATA:
			return initState 
		default:
			return state
	}
} 

export function loadData(clusterlistinfo){
	return { type:LOAD_DATA, payload:clusterlistinfo}
}

export function clearData(){
	return { type:CLEAR_DATA}
}

export function loadNamespaceData(namespacelistinfo){
	return { type:LOAD_NAMESPACE_DATA, payload:namespacelistinfo}
}

export function getUserClusterList(params={}){
	return dispatch=>{
      getAjax('/common/userclusterlist/', params, function(res){
          if (res.data.code == 0){
            dispatch(loadData(res.data))
          }else{
            notification.error({
              description: res.data.msg,
              message: "获取用户集群异常" 
            })
          }
          })
	}
}

export function getClusterNamespaceList(header={}){
	return dispatch=>{
      getAjax('/common/k8snamespacelist/', {}, function(res){
          if (res.data.code == 0){
            dispatch(loadNamespaceData(res.data))
          }else{
            notification.error({
              description: res.data.msg,
              message: "获取namespace列表异常" 
            })
          }
          }, header)
	}
}
