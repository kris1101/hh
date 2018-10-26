import { notification  } from 'antd';
import { getAjax } from '../../../components/docker/utils/axios'

const LOAD_DATA = 'LOAD_K8SNODES_DATA'
const CLEAR_DATA = 'CLEAR_K8SNODES_DATA'
const START_LOADING = 'START_K8SNODES_LOADING' 
const END_LOADING = 'END_K8SNODES_LOADING' 

const initState={
	redirectTo:'',
	msg:'',
    loading: false,
	nodeList:[]
}

// reducer
export function k8sNode(state=initState, action){
	switch(action.type){
		case LOAD_DATA:
			return {...state, nodeList: action.payload.items}
		case CLEAR_DATA:
			return initState   
		case START_LOADING:
			return {...state, loading: true}
		case END_LOADING:
			return {...state, loading: false}
		default:
			return state
	}
} 

export function loadData(listinfo){
	return { type:LOAD_DATA, payload:listinfo}
}

export function clearNodeData(){
	return { type:CLEAR_DATA}
}

export function startLoading(){
	return { type:START_LOADING}
}

export function endLoading(){
	return { type:END_LOADING}
}

export function getNodeList(params={}, header={}){
	return dispatch=>{
      dispatch(startLoading());
      console.log(params);
      getAjax('/k8s/nodes/', params, function(res){
          dispatch(endLoading());
          if (res.data.code === 0){
            console.log(res.data.data);
            dispatch(loadData(res.data.data))
          }else{
            notification.error({
              description: res.data.msg,
              message: "获取nodelist失败" 
            })
          }
          }, header)
	}
}
