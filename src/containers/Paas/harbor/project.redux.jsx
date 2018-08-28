import axios from 'axios'

const LOAD_DATA = 'LOAD_DATA'
const START_LOADING = 'START_LOADING' 
const END_LOADING = 'END_LOADING' 

const initState={
	redirectTo:'',
	msg:'',
    total: 0,
    loading: false,
	projectList:[]
}
const axios_instance = axios.create({
    baseURL: 'http://paas.sinochem.cloud/api/paas',
    timeout: 2000
})

// reducer
export function harborProject(state=initState, action){
	switch(action.type){
		case LOAD_DATA:
			return {...state, projectList: action.payload.result, total: action.payload.total}
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

export function getProjectList(params){
	return dispatch=>{
      dispatch(startLoading());
      axios_instance.get('/harbor/projects/',params: params)
			.then(res=>{
                dispatch(endLoading());
                dispatch(loadData(res.data.data))
			})
			.catch(function(error){
                dispatch(endLoading());
				console.log(error);
			})
	}
}
