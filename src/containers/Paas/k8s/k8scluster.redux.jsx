import { notification  } from 'antd';
import { getAjax } from '../../../components/docker/utils/axios'

const LOAD_DATA = 'LOAD_K8SCLUSTER_DATA'
const START_LOADING = 'START_K8SCLUSTER_LOADING' 
const END_LOADING = 'END_K8SCLUSTER_LOADING' 

const initState={
	redirectTo:'',
	msg:'',
    total: 0,
    loading: false,
	clusterList:[]
}

// reducer
export function k8sCluster(state=initState, action){
	switch(action.type){
		case LOAD_DATA:
			return {...state, clusterList: action.payload.result, total: action.payload.total}
		case START_LOADING:
			return {...state, loading: true}
		case END_LOADING:
			return {...state, loading: false}
		default:
			return state
	}
} 

export function loadData(projectlistinfo){
	return { type:LOAD_DATA, payload:projectlistinfo}
}

export function startLoading(){
	return { type:START_LOADING}
}

export function endLoading(){
	return { type:END_LOADING}
}

export function getK8sClusterList(params){
	return dispatch=>{
      dispatch(startLoading());
      console.log(params);
      getAjax('/k8s/kubeconfig/', params, function(res){
          dispatch(endLoading());
          if (res.data.code === 0){
            dispatch(loadData(res.data.data))
          }else{
            notification.error({
              description: res.data.msg,
              message: "提示" 
            })
          }
          })
	}
}
