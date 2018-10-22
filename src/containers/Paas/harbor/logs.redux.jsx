import { notification  } from 'antd';
import { getAjax  } from '../../../components/docker/utils/axios'

const LOAD_DATA = 'LOAD_HARBORLOG_DATA'
const START_LOADING = 'START_HARBORLOG_LOADING' 
const END_LOADING = 'END_HARBORLOG_LOADING' 

const initState={
	redirectTo:'',
	msg:'',
    total: 0,
    loading: false,
	logsList:[]
}

// reducer
export function harborLogs(state=initState, action){
	switch(action.type){
		case LOAD_DATA:
			return {...state, logsList: action.payload.result, total: action.payload.total}
		case START_LOADING:
			return {...state, loading: true}
		case END_LOADING:
			return {...state, loading: false}
		default:
			return state
	}
} 

export function loadData(logslistinfo){
	return { type:LOAD_DATA, payload:logslistinfo}
}

export function startLoading(){
	return { type:START_LOADING}
}

export function endLoading(){
	return { type:END_LOADING}
}

export function getLogsList(params){
	return dispatch=>{
      dispatch(startLoading());
      getAjax('/harbor/logs/',params, function(res){
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
