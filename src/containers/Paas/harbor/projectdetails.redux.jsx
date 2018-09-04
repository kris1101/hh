import axios from 'axios'
import { notification  } from 'antd';
import { getAjax } from '../../../components/docker/utils/axios'

const LOAD_HARBORPROJECTREPOSITORIES_DATA = 'LOAD_HARBORPROJECTREPOSITORIES_DATA'
const START_HARBORPROJECTREPOSITORIES_LOADING = 'START_HARBORPROJECTREPOSITORIES_LOADING' 
const END_HARBORPROJECTREPOSITORIES_LOADING = 'END_HARBORPROJECTREPOSITORIES_LOADING' 
const CLEAR_DATA = "CLEAR_DATA"

const initState={
	repositories_msg:'',
    repositories_total: 0,
    repositories_loading: false,
	repositoriesList:[]
}

// reducer
export function harborProjectDetails(state=initState, action){
	switch(action.type){
		case LOAD_HARBORPROJECTREPOSITORIES_DATA:
			return {...state, repositoriesList: action.payload.result, repositories_total: action.payload.total}
		case START_HARBORPROJECTREPOSITORIES_LOADING:
			return {...state, repositories_loading: true}
		case END_HARBORPROJECTREPOSITORIES_LOADING:
			return {...state, repositories_loading: false}
		case CLEAR_DATA:
			return initState
		default:
			return state
	}
} 

export function loadRepositoriesData(projectRepositoriesListInfo){
	return { type:LOAD_HARBORPROJECTREPOSITORIES_DATA, payload:projectRepositoriesListInfo}
}

export function clearProjectDetailsData(){
	return { type:CLEAR_DATA }
}

export function startRepositoriesLoading(){
	return { type:START_HARBORPROJECTREPOSITORIES_LOADING}
}

export function endRepositoriesLoading(){
	return { type:END_HARBORPROJECTREPOSITORIES_LOADING}
}

export function getRepositoriesList(params){
	return dispatch=>{
      dispatch(startRepositoriesLoading());
      console.log(params);
      getAjax('/harbor/repositories/', params, function(res){
          dispatch(endRepositoriesLoading());
          if (res.data.code == 0){
            dispatch(loadRepositoriesData(res.data.data))
          }else{
            notification.error({
              description: res.data.msg,
              message: "提示" 
            })
          }
          })
	}
}
