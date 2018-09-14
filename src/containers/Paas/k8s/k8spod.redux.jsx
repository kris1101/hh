import axios from 'axios'
import { notification  } from 'antd';
import { getAjax } from '../../../components/docker/utils/axios'

const LOAD_DATA = 'LOAD_K8SPOD_DATA'


const initState={
	redirectTo:'',
	msg:'',
    total: 0,
    loading: false,
	clusterList:[]
}


export function loadData(projectlistinfo){
	return { type:LOAD_DATA, payload:projectlistinfo}
}

export function getK8sPodList(params){
	return dispatch=>{
      getAjax('/k8s_pod/', params, function(res){
          if (res.data.code == 0){
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
