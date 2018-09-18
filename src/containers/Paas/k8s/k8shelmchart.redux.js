import axios from 'axios'
import { notification  } from 'antd';
import { getAjax } from '../../../components/docker/utils/axios'

const LOAD_DATA = 'LOAD_HELMCHART_DATA'
const LOAD_REPOOPTION_DATA = 'LOAD_REPOOPTION_DATA'
const LOCAL_SEARCH_DATA = 'LOCAL_SEARCH_DATA'
const START_LOADING = 'START_HELMCHART_LOADING' 
const END_LOADING = 'END_HELMCHART_LOADING' 

const initState={
	redirectTo:'',
	msg:'',
    total: 0,
    loading: false,
	helmchartList:[],
	helmchartListorigin:[],
	helmrepooptionList:[],
}

// reducer
export function helmChart(state=initState, action){
	switch(action.type){
		case LOAD_DATA:
			return {...state, helmchartList: action.payload, helmchartListorigin: action.payload}
		case LOAD_REPOOPTION_DATA:
			return {...state, helmrepooptionList: action.payload}
		case START_LOADING:
			return {...state, loading: true}
		case END_LOADING:
			return {...state, loading: false}
		case LOCAL_SEARCH_DATA:
			return {...state, helmchartList: state.helmchartListorigin.filter(function(currentValue){return currentValue.chart_name.toLowerCase().indexOf(action.payload.toLowerCase()) != -1 })}
		default:
			return state
	}
} 

export function loadData(helmchartlistinfo){
	return { type:LOAD_DATA, payload:helmchartlistinfo}
}

export function loadRepoOptionData(helmrepooptionlistinfo){
	return { type:LOAD_REPOOPTION_DATA, payload:helmrepooptionlistinfo}
}

export function startLoading(){
	return { type:START_LOADING}
}

export function endLoading(){
	return { type:END_LOADING}
}

export function localDataSearch(searchkey){
	return { type:LOCAL_SEARCH_DATA, payload: searchkey}
}

export function getlocalsearch(searchkey){
	return dispatch=>{
      dispatch(startLoading());
      dispatch(localDataSearch(searchkey))
      dispatch(endLoading());
	}
}

export function getHelmChartList(params){
	return dispatch=>{
      dispatch(startLoading());
      console.log(params);
      getAjax('/helm/helmchart/', params, function(res){
          dispatch(endLoading());
          if (res.data.code == 0){
            dispatch(loadData(res.data.data))
          }else{
            notification.error({
              description: res.data.msg,
              message: "获取chart异常" 
            })
          }
          })
	}
}

export function getHelmRepoOptionList(){
	return dispatch=>{
      getAjax('/helm/helmrepooptionlist/', {}, function(res){
          if (res.data.code == 0){
            dispatch(loadRepoOptionData(res.data.data))
          }else{
            notification.error({
              description: res.data.msg,
              message: "获取repo选项异常" 
            })
          }
          })
	}
}
