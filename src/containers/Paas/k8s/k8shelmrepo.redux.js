import axios from 'axios'
import { notification  } from 'antd';
import { getAjax } from '../../../components/docker/utils/axios'

const LOAD_DATA = 'LOAD_HELMREPO_DATA'
const START_LOADING = 'START_HELMREPO_LOADING' 
const END_LOADING = 'END_HELMREPO_LOADING' 

const initState={
	redirectTo:'',
	msg:'',
    total: 0,
    loading: false,
	helmrepoList:[]
}

// reducer
export function helmRepo(state=initState, action){
	switch(action.type){
		case LOAD_DATA:
			return {...state, helmrepoList: action.payload.result, total: action.payload.total}
		case START_LOADING:
			return {...state, loading: true}
		case END_LOADING:
			return {...state, loading: false}
		default:
			return state
	}
} 

export function loadData(helmrepolistinfo){
	return { type:LOAD_DATA, payload:helmrepolistinfo}
}

export function startLoading(){
	return { type:START_LOADING}
}

export function endLoading(){
	return { type:END_LOADING}
}

export function getHelmRepoList(params){
	return dispatch=>{
      dispatch(startLoading());
      console.log(params);
      getAjax('/helm/helmrepo/', params, function(res){
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
