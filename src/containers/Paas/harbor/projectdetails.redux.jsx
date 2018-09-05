import axios from 'axios'
import { notification  } from 'antd';
import { getAjax } from '../../../components/docker/utils/axios'

const LOAD_HARBORPROJECTREPOSITORIES_DATA = 'LOAD_HARBORPROJECTREPOSITORIES_DATA'
const START_HARBORPROJECTREPOSITORIES_LOADING = 'START_HARBORPROJECTREPOSITORIES_LOADING' 
const END_HARBORPROJECTREPOSITORIES_LOADING = 'END_HARBORPROJECTREPOSITORIES_LOADING' 
const CLEAR_DATA = "CLEAR_DATA"

const LOAD_PROJECTMEMBER_DATA = 'LOAD_PROJECTMEMBER_DATA'
const START_PROJECTMEMBER_LOADING = 'START_PROJECTMEMBER_LOADING' 
const END_PROJECTMEMBER_LOADING = 'END_PROJECTMEMBER_LOADING' 

const LOAD_PROJECTLOGS_DATA = 'LOAD_PROJECTLOGS_DATA'
const START_PROJECTLOGS_LOADING = 'START_PROJECTLOGS_LOADING' 
const END_PROJECTLOGS_LOADING = 'END_PROJECTLOGS_LOADING' 

const LOAD_VALIDMEMBER_DATA = 'LOAD_VALIDMEMBER_DATA'

const initState={
	repositories_msg:'',
    repositories_total: 0,
    repositories_loading: false,
    projectlogs_loading: false,
	repositoriesList:[],
	projectmember_msg:'',
    projectmember_loading: false,
	projectmemberList:[],
    validMemberData: [],
    projectLogsList:[],
    projectLogs_total:0

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
		case LOAD_PROJECTMEMBER_DATA:
			return {...state, projectmemberList: action.payload}
		case LOAD_VALIDMEMBER_DATA:
			return {...state, validMemberData: action.payload}
		case START_PROJECTMEMBER_LOADING:
			return {...state, projectmember_loading: true}
		case END_PROJECTMEMBER_LOADING:
			return {...state, projectmember_loading: false}
		case START_PROJECTLOGS_LOADING:
			return {...state, projectlogs_loading: true}
		case END_PROJECTLOGS_LOADING:
			return {...state, projectlogs_loading: false}
		case LOAD_PROJECTLOGS_DATA:
			return {...state, projectLogsList: action.payload.result, projectLogs_total: action.payload.total }
		case CLEAR_DATA:
			return initState
		default:
			return state
	}
} 

export function loadRepositoriesData(projectRepositoriesListInfo){
	return { type:LOAD_HARBORPROJECTREPOSITORIES_DATA, payload:projectRepositoriesListInfo}
}

export function loadValidMemberData(validMemberDataInfo){
	return { type:LOAD_VALIDMEMBER_DATA, payload:validMemberDataInfo}
}

export function loadProjectMemberData(projectMemberListInfo){
	return { type:LOAD_PROJECTMEMBER_DATA, payload:projectMemberListInfo}
}

export function loadProjectLogsData(projectLogsListInfo){
	return { type:LOAD_PROJECTLOGS_DATA, payload:projectLogsListInfo}
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

export function startProjectLogsLoading(){
	return { type:START_PROJECTLOGS_LOADING}
}

export function endProjectLogsLoading(){
	return { type:END_PROJECTLOGS_LOADING}
}
export function startProjectMemberLoading(){
	return { type:START_PROJECTMEMBER_LOADING}
}

export function endProjectmemberLoading(){
	return { type:END_PROJECTMEMBER_LOADING}
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

export function getProjectLogsList(params){
	return dispatch=>{
      dispatch(startProjectLogsLoading());
      console.log(params);
      getAjax('/harbor/projectlogs/', params, function(res){
          dispatch(endProjectLogsLoading());
          if (res.data.code == 0){
            dispatch(loadProjectLogsData(res.data.data))
          }else{
            notification.error({
              description: res.data.msg,
              message: "提示" 
            })
          }
          })
	}
}

export function getProjectMemberList(params){
	return dispatch=>{
      dispatch(startProjectMemberLoading());
      getAjax('/harbor/projectmember/', params, function(res){
          dispatch(endProjectmemberLoading());
          if (res.data.code == 0){
            dispatch(loadProjectMemberData(res.data.data))
          }else{
            notification.error({
              description: res.data.msg,
              message: "提示" 
            })
          }
          })
	}
}

export function getValidMemberData(params){
	return dispatch=>{
      getAjax('/harbor/projectvalidmember/', params, function(res){
          if (res.data.code == 0){
            dispatch(loadValidMemberData(res.data.data))
          }else{
            notification.error({
              description: res.data.msg,
              message: "提示" 
            })
          }
          })
	}
}
