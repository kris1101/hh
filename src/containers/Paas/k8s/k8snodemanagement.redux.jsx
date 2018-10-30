import { notification  } from 'antd';
import { getAjax } from '../../../components/docker/utils/axios'

const LOAD_DATA = 'LOAD_K8SNODES_DATA'
const CLEAR_DATA = 'CLEAR_K8SNODES_DATA'
const CLEAR_LABEL_DATA = 'CLEAR_LABEL_DATA'
const START_LOADING = 'START_K8SNODES_LOADING' 
const END_LOADING = 'END_K8SNODES_LOADING' 
const START_LABEL_LOADING = 'START_K8SNODELABEL_LOADING' 
const END_LABEL_LOADING = 'END_K8SNODELABEl_LOADING' 
const LOAD_LABEL_DATA = 'LOAD_K8SNODELABEl_DATA'

const LOCAL_SEARCH_DATA = 'LOCAL_NODE_SEARCH_DATA'

const initState={
	redirectTo:'',
	msg:'',
    loading: false,
    nodeLabelLoading: false,
    nodeList:[],
    nodeLabelList:[],
    nodeListOrigin: []
}


// reducer
export function k8sNode(state=initState, action){
	switch(action.type){
		case LOAD_DATA:
			return {...state, nodeList: action.payload.items, nodeListOrigin: action.payload.items}
		case LOAD_LABEL_DATA:
			return {...state, nodeLabelList: genlabellist(action.payload.metadata.labels)}
		case CLEAR_DATA:
			return initState   
		case CLEAR_LABEL_DATA:
			return {...state, nodeLabelList: []}
		case START_LOADING:
			return {...state, loading: true}
		case END_LOADING:
			return {...state, loading: false}
		case START_LABEL_LOADING:
			return {...state, nodeLabelLoading: true}
		case END_LABEL_LOADING:
			return {...state, nodeLabelLoading: false}
        case LOCAL_SEARCH_DATA:
            return { ...state,
                nodeList: state.nodeListOrigin.filter(function(currentValue) {
                    return currentValue.metadata.name.toLowerCase().indexOf(action.payload.toLowerCase()) !== -1
                })
            }
		default:
			return state
	}
} 

function genlabellist(labelinfo){
  let labellist = [];
  for(let item in labelinfo){
    labellist.push({'key': item, 'value': labelinfo[item]})
  }
  return labellist;
}

export function loadData(listinfo){
	return { type:LOAD_DATA, payload:listinfo}
}

export function loadLabelData(listinfo){
	return { type:LOAD_LABEL_DATA, payload:listinfo}
}

export function clearNodeData(){
	return { type:CLEAR_DATA}
}

export function clearLabelData(){
	return { type:CLEAR_LABEL_DATA}
}

export function startLoading(){
	return { type:START_LOADING}
}

export function endLoading(){
	return { type:END_LOADING}
}

export function startLabelLoading(){
	return { type:START_LABEL_LOADING}
}

export function endLabelLoading(){
	return { type:END_LABEL_LOADING }
}

export function localDataSearch(searchkey) {
    return {
        type: LOCAL_SEARCH_DATA,
        payload: searchkey
    }
}

export function getlocalsearch(searchkey) {
    return dispatch => {
        dispatch(startLoading());
        dispatch(localDataSearch(searchkey))
        dispatch(endLoading());
    }
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

export function getLabelInfo(params={}, header={}){
	return dispatch=>{
      dispatch(startLabelLoading());
      console.log(params);
      getAjax('/k8s/node/', params, function(res){
          dispatch(endLabelLoading());
          if (res.data.code === 0){
            dispatch(loadLabelData(res.data.data))
          }else{
            notification.error({
              description: res.data.msg,
              message: "获取nodeLabel失败" 
            })
          }
          }, header)
	}
}
