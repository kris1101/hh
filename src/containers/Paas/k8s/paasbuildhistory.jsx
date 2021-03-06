import { notification } from 'antd';
import { getAjax } from '../../../components/docker/utils/axios'

const LOAD_DATA = 'LOAD_BUILDHISTORY_DATA'
const CLEAN_DATA = 'CLEAN_BUILDHISTORY_DATA'
const START_LOADING = 'START_BUILDHISTORY_LOADING'
const END_LOADING = 'END_BUILDHISTORY_LOADING'

const initState = {
    redirectTo: '',
    msg: '',
    total: 0,
    loading: false,
    buildHistoryList: [],
}

// reducer
export function paasBuildHistory(state = initState, action) {
    switch (action.type) {
        case LOAD_DATA:
            return { ...state,
                buildHistoryList: action.payload.result,
                total: action.payload.total,
            }
        case CLEAN_DATA:
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

export function loadData(listinfo) {
    return {
        type: LOAD_DATA,
        payload: listinfo
    }
}

export function cleanBuildHistoryData() {
    return {
        type: CLEAN_DATA
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

export function getBuildHistoryList(params={}) {
    return dispatch => {
        dispatch(startLoading());
      getAjax('/codetask/buildhistory/', params, function(res) {
            dispatch(endLoading());
            if (res.data.code === 0) {
                dispatch(loadData(res.data.data))
            } else {
                notification.error({
                    description: res.data.msg,
                    message: "获取BuildHistoryList异常"
                })
            }
        })
    }
}

