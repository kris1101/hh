import axios from 'axios'
import { notification  } from 'antd';

const LOAD_DATA = 'LOAD_GROUPMEMEBERS_DATA'
const START_LOADING = 'START_GROUPMEMBERS_LOADING' 
const END_LOADING = 'END_GROUPMEMBERS_LOADING' 

const initState={
	redirectTo:'',
	msg:'',
    total: 0,
    loading: false,
	groupmembersList:[]
}
const axios_instance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    timeout: 2000
})

// reducer
export function daasGroupMembers(state=initState, action){
	switch(action.type){
		case LOAD_DATA:
			return {...state, groupmembersList: action.payload.data, total: action.payload.data.length}
		case START_LOADING:
			return {...state, loading: true}
		case END_LOADING:
			return {...state, loading: false}
		default:
			return state
	}
} 

export function loadData(groupmemberslistinfo){
	return { type:LOAD_DATA, payload:groupmemberslistinfo}
}

export function startLoading(){
	return { type:START_LOADING}
}

export function endLoading(){
	return { type:END_LOADING}
}

export function getGroupMembersList(group_id){
	return dispatch=>{
      dispatch(startLoading());
      // {params: params} == {params: {group: group_id}}
      axios_instance.get('/v1/api/slow/query/group/user/relationships',{params: {group: group_id}})
			.then(res=>{
                dispatch(endLoading());
                console.log(res.data)
                if (res.data.code == 0){
                  dispatch(loadData(res.data))
                }else{
                  notification.error({
                    description: res.data.message,
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
