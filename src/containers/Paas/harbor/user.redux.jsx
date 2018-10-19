import { notification  } from 'antd';
import { getAjax } from '../../../components/docker/utils/axios'

const LOAD_DATA = 'LOAD_HARBORUSER_DATA'
const START_LOADING = 'START_HARBORUSER_LOADING' 
const END_LOADING = 'END_HARBORUSER_LOADING' 

const initState={
	redirectTo:'',
	msg:'',
    total: 0,
    loading: false,
	userList:[]
}

// reducer
export function harborUser(state=initState, action){
	switch(action.type){
		case LOAD_DATA:
			return {...state, userList: action.payload.result, total: action.payload.total}
		case START_LOADING:
			return {...state, loading: true}
		case END_LOADING:
			return {...state, loading: false}
		default:
			return state
	}
} 

export function loadData(userlistinfo){
	return { type:LOAD_DATA, payload:userlistinfo}
}

export function startLoading(){
	return { type:START_LOADING}
}

export function endLoading(){
	return { type:END_LOADING}
}

export function getHarborUserList(params){
	return dispatch=>{
      dispatch(startLoading());
      console.log(params);
      getAjax('/harbor/user/', params, function(res){
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
