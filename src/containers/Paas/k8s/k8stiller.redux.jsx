import axios from 'axios'
import { notification  } from 'antd';
import { getAjax } from '../../../components/docker/utils/axios'

const LOAD_DATA = 'LOAD_K8STILLER_DATA'
const START_LOADING = 'START_K8STILLER_LOADING' 
const END_LOADING = 'END_K8sTILLER_LOADING' 

const initState={
	redirectTo:'',
	msg:'',
    loading: false,
	tillerConfigList:[]
}

// reducer
export function k8sTiller(state=initState, action){
	switch(action.type){
		case LOAD_DATA:
			return {...state, tillerConfigList: action.payload.data}
		case START_LOADING:
			return {...state, loading: true}
		case END_LOADING:
			return {...state, loading: false}
		default:
			return state
	}
} 

export function loadData(tillerconfiginfo){
	return { type:LOAD_DATA, payload:tillerconfiginfo}
}

export function startLoading(){
	return { type:START_LOADING}
}

export function endLoading(){
	return { type:END_LOADING}
}

export function getK8sTillerList(params){
	return dispatch=>{
      dispatch(startLoading());
      console.log(params);
      getAjax('/k8s/tillerconfig/', params, function(res){
          dispatch(endLoading());
          if (res.data.code == 0){
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

