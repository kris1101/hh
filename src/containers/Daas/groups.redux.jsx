import axios from 'axios'
import { notification  } from 'antd';

const LOAD_DATA = 'LOAD_GROUPS_DATA'
const START_LOADING = 'START_GROUPS_LOADING' 
const END_LOADING = 'END_GROUPS_LOADING' 

const initState={
	redirectTo:'',
	msg:'',
    total: 0,
    loading: false,
	groupsList:[]
}
const axios_instance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    // baseURL: 'http:/127.0.0.1:8000/v1/api/slow/query/groups',
    // baseURL: 'http://daas.sinochem.cloud/api/daas',
    timeout: 2000
})

// reducer
export function daasGroups(state=initState, action){
	switch(action.type){
		case LOAD_DATA:
			return {...state, groupsList: action.payload.data}
		case START_LOADING:
			return {...state, loading: true}
		case END_LOADING:
			return {...state, loading: false}
		default:
			return state
	}
} 

export function loadData(groupslistinfo){
	return { type:LOAD_DATA, payload:groupslistinfo}
}

export function startLoading(){
	return { type:START_LOADING}
}

export function endLoading(){
	return { type:END_LOADING}
}

export function getGroupsList(params){
	return dispatch=>{
      dispatch(startLoading());
      axios_instance.get('/v1/api/slow/query/groups',{params: params})
			.then(res=>{
                dispatch(endLoading());
                console.log(res.data)
                if (res.data.code == 0){
                  dispatch(loadData(res.data))
                }else{
                  notification.error({
                    description: res.data.msg,
                    message: "提示" 
                  })
                }
			})
			.catch(function(error){
                dispatch(endLoading());
				console.log(error);
			})
	}
}
