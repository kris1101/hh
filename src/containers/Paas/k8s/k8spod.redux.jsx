import { getAjax } from '../../../components/docker/utils/axios'
import { notification } from 'antd'

const LOAD_DATA = 'LOAD_K8SPOD_DATA'


export function loadData(projectlistinfo){
	return { type:LOAD_DATA, payload:projectlistinfo}
}

export function getK8sPodList(params, header={}){
	return dispatch=>{
      getAjax('/workload/podlist/', params, function(res){
          if (res.data.code === 0){
            dispatch(loadData(res.data.data))
          }else{
            notification.error({
              description: res.data.msg,
              message: "提示"
            })
          }
          }, header)
	}
}
