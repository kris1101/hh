import axios from 'axios'

const LOAD_DATA = 'LOAD_DATA'
const initState={
	redirectTo:'',
	msg:'',
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
			return {...state, projectList: action.payload, test:1}
		default:
			return state
	}
} 

export function loadData(projectlist){
	return { type:LOAD_DATA, payload:projectlist}
}

export function getProjectList(params){
	return dispatch=>{
      axios_instance.get('/harbor/projects/',params: params)
			.then(res=>{
				console.log(res);
                dispatch(loadData(res.data.data))
			})
			.catch(function(error){
				console.log(error);
			})
	}
}
