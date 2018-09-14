import axios from 'axios'
import { notification  } from 'antd';
import { getAjax } from '../../../components/docker/utils/axios'

const LOAD_DATA = 'LOAD_K8SCLUSTER_DATA'
const START_LOADING = 'START_K8SCLUSTER_LOADING' 
const END_LOADING = 'END_K8sCLUSTER_LOADING' 

const initState={
	redirectTo:'',
	msg:'',
    total: 0,
    loading: false,
	clusterList:[]
}

// reducer
export function k8sCluster(state=initState, action){
	switch(action.type){
		case LOAD_DATA:
			return {...state, clusterList: action.payload.result, total: action.payload.total}
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

export function getK8sClusterList(params){
	return dispatch=>{
      dispatch(startLoading());
      console.log(params);
      getAjax('/k8s/kubeconfig/', params, function(res){
          dispatch(endLoading());
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

export function getK8sPodList(params){
	return dispatch=>{
      dispatch(startLoading());
      getAjax('/k8s_pod/', params, function(res){
          dispatch(endLoading());
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

export function getprojects() {
    return [{
        title: '项目名称',
        dataIndex: 'name',
        render: (data, record, index) => {
          let path = '/paas/registryproject/details/?project_id=' + record.project_id + "&project_name=" + record.name;
          return <Link to={path}>{data}</Link>
        }
    }, {
        title: '镜像仓库数量',
        dataIndex: 'repo_count'
    },{
        title: '访问级别',
        dataIndex: 'metadata.public',
        render: (data) => {
          if (data == "true"){
            return "公开";
          }else{
            return "私有";
          }

        }
    }, {
        title: '角色',
        dataIndex: 'current_user_role_id',
        render: (data) => roleDict[data]
    }, {
        title: '创建时间',
        dataIndex: 'creation_time',
        render: (data) => formatStrDate(data)
    },{
        title: '更新时间',
        dataIndex: 'update_time',
        render: (data) => formatStrDate(data)
    },{
        title: '操作',
        render: (data, record, index) => {
            return (
              <Popconfirm title={"确定删除" + record.name + "项目?"} onConfirm={() => confirm(record.project_id, this)} okText="是" cancelText="否">
            <div>
              <Button size="small" icon="delete" disabled={record.repo_count != 0 || record.name == "library"? true : false}>删除</Button>
            </div>
              </Popconfirm>
        )}
    }];
}