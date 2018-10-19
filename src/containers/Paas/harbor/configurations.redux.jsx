import { notification  } from 'antd';
import { getAjax } from '../../../components/docker/utils/axios'

const LOAD_CONFIGURATIONS = 'LOAD_CONFIGURATIONS'
const LOAD_SYSTEMINFO = 'LOAD_SYSTEMINFO'

const initState={
	redirectTo:'',
	msg:'',
    project_creation_restriction: "everyone",
    self_registration: true,
    token_expiration: 30,
    read_only: false,
    registry_url: ""

}

// reducer
export function harborConfigurations(state=initState, action){
	switch(action.type){
		case LOAD_CONFIGURATIONS:
			return {...state, read_only: action.payload.read_only.value, token_expiration: action.payload.token_expiration.value, project_creation_restriction: action.payload.project_creation_restriction.value, self_registration: action.payload.self_registration.value}
		case LOAD_SYSTEMINFO:
			return {...state, registry_url: action.payload.registry_url}
		default:
			return state
	}
} 

export function loadConfigurationsData(configurationsInfo){
	return { type:LOAD_CONFIGURATIONS, payload:configurationsInfo}
}

export function loadSysteminfoData(systemInfo){
	return { type:LOAD_SYSTEMINFO, payload:systemInfo}
}

export function getHarborConfigurations(params){
	return dispatch=>{
      getAjax('/harbor/configurations/', params, function(res){
          if (res.data.code === 0){
            dispatch(loadConfigurationsData(res.data.data))
          }else{
            notification.error({
              description: res.data.msg,
              message: "提示" 
            })
          }
          })
	}
}

export function getHarborSysteminfo(params){
	return dispatch=>{
      getAjax('/harbor/systeminfo/', params, function(res){
          if (res.data.code === 0){
            dispatch(loadSysteminfoData(res.data.data))
          }else{
            notification.error({
              description: res.data.msg,
              message: "提示" 
            })
          }
          })
	}
}
