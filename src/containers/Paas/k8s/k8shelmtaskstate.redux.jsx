import { notification } from 'antd';
import { getAjax } from '../../../components/docker/utils/axios'

const LOAD_DATA = 'LOAD_HELMTASKSTATE_DATA'
const CLEAR_DATA = 'CLEAR_HELMTASKSTATE_DATA'
const START_LOADING = 'START_TASKSTATE_LOADING'
const END_LOADING = 'END_TASKSTATE_LOADING'

const initState = {
    redirectTo: '',
    msg: '',
    total: 0,
    loading: false,
    helmTaskStateList: [],
}

// reducer
export function helmTaskState(state = initState, action) {
    switch (action.type) {
        case LOAD_DATA:
            return { ...state,
                helmTaskStateList: action.payload.result,
                total: action.payload.total,
            }
        case CLEAR_DATA:
            return initState 
        case START_LOADING:
            return { ...state,
                loading: true
            }
        case END_LOADING:
            return { ...state,
                loading: false
            }
        default:
            return state
    }
}

export function loadData(helmtaskstatelistinfo) {
    return {
        type: LOAD_DATA,
        payload: helmtaskstatelistinfo
    }
}

export function clearTaskStateData() {
    return {
        type: CLEAR_DATA
    }
}

export function startLoading() {
    return {
        type: START_LOADING
    }
}

export function endLoading() {
    return {
        type: END_LOADING
    }
}

export function getHelmTaskStateList(params, header={}) {
    return dispatch => {
        dispatch(startLoading());
        console.log(params);
        getAjax('/helm/helmtaskstatuslist/', params, function(res) {
            dispatch(endLoading());
            if (res.data.code === 0) {
                dispatch(loadData(res.data.data))
            } else {
                notification.error({
                    description: res.data.msg,
                    message: "获取helm_task_state异常"
                })
            }
        }, header)
    }
}

